<template>
    <div id="container" style="width: 900px; height: 100%;"></div>
</template>
  
<script setup>
import { onMounted, ref, nextTick  } from 'vue'
import { Graph, Path, Cell } from '@antv/x6'
import { Selection } from '@antv/x6-plugin-selection'
import AlgoNode from './AlgoNode.vue'
import insertCss from 'insert-css'
import { registerCustomNode, registerCustomEdge, registerCustomConnector } from './graph-registrations'

const graph = ref(null)
const nodeStatusList = ref([
  [
    {
      id: '1',
      status: 'running',
    },
    {
      id: '2',
      status: 'default',
    },
    {
      id: '3',
      status: 'default',
    },
    {
      id: '4',
      status: 'default',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'running',
    },
    {
      id: '3',
      status: 'default',
    },
    {
      id: '4',
      status: 'default',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'success',
    },
    {
      id: '3',
      status: 'running',
    },
    {
      id: '4',
      status: 'running',
    },
  ],
  [
    {
      id: '1',
      status: 'success',
    },
    {
      id: '2',
      status: 'success',
    },
    {
      id: '3',
      status: 'success',
    },
    {
      id: '4',
      status: 'failed',
    },
  ],
])
const data = [
  {
    "id": "1",
    "shape": "dag-node",
    "x": 290,
    "y": 110,
    "data": {
      "label": "读数据",
      "status": "success"
    },
    "ports": [
      {
        "id": "1-1",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "2",
    "shape": "dag-node",
    "x": 290,
    "y": 225,
    "data": {
      "label": "逻辑回归",
      "status": "success"
    },
    "ports": [
      {
        "id": "2-1",
        "group": "top"
      },
      {
        "id": "2-2",
        "group": "bottom"
      },
      {
        "id": "2-3",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "3",
    "shape": "dag-node",
    "x": 170,
    "y": 350,
    "data": {
      "label": "模型预测",
      "status": "success"
    },
    "ports": [
      {
        "id": "3-1",
        "group": "top"
      },
      {
        "id": "3-2",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "4",
    "shape": "dag-node",
    "x": 450,
    "y": 350,
    "data": {
      "label": "读取参数",
      "status": "success"
    },
    "ports": [
      {
        "id": "4-1",
        "group": "top"
      },
      {
        "id": "4-2",
        "group": "bottom"
      }
    ]
  },
  {
    "id": "5",
    "shape": "dag-edge",
    "source": {
      "cell": "1",
      "port": "1-1"
    },
    "target": {
      "cell": "2",
      "port": "2-1"
    },
    "zIndex": 0
  },
  {
    "id": "6",
    "shape": "dag-edge",
    "source": {
      "cell": "2",
      "port": "2-2"
    },
    "target": {
      "cell": "3",
      "port": "3-1"
    },
    "zIndex": 0
  },
  {
    "id": "7",
    "shape": "dag-edge",
    "source": {
      "cell": "2",
      "port": "2-3"
    },
    "target": {
      "cell": "4",
      "port": "4-1"
    },
    "zIndex": 0
  }
]
  
const init = (data) => {
    const cells = []
    data.forEach((item) => {
        if (item.shape === 'dag-node') {
            cells.push(graph.value.createNode(item))
        } else {
            cells.push(graph.value.createEdge(item))
        }
    })
    graph.value.resetCells(cells)
}
  
const showNodeStatus = async (statusList) => {
    const status = statusList.shift()
    await status?.forEach((item) => {
      const { id, status } = item
      const node = graph.value.getCellById(id)
      const data = node.getData()
      node.setData({
        ...data,
        status
      })
    })
    await nextTick();
    setTimeout(() => {
      showNodeStatus(statusList)
    }, 3000)
}
  
onMounted(() => {
    registerCustomNode()
    registerCustomEdge()
    registerCustomConnector()

    graph.value = new Graph({
      container: document.getElementById('container'),
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'mouseWheel'],
      },
      mousewheel: {
        enabled: true,
        modifiers: 'ctrl',
        factor: 1.1,
        maxScale: 1.5,
        minScale: 0.5,
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
              strokeWidth: 4,
            },
          },
        },
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'algo-connector',
        connectionPoint: 'anchor',
        anchor: 'center',
        validateMagnet({ magnet }) {
          return magnet.getAttribute('port-group') !== 'top'
        },
        createEdge() {
          return graph.value.createEdge({
            shape: 'dag-edge',
            attrs: {
              line: {
                strokeDasharray: '5 5',
              },
            },
            zIndex: -1,
          })
        },
      },
    })
  
    graph.value.use(
      new Selection({
        multiple: true,
        rubberEdge: true,
        rubberNode: true,
        modifiers: 'shift',
        rubberband: true,
      }),
    )
  
    graph.value.on('edge:connected', ({ edge }) => {
      edge.attr({
        line: {
          strokeDasharray: '',
        },
      })
    })
  
    graph.value.on('node:change:data', ({ node }) => {
      const edges = graph.value.getIncomingEdges(node)
      const { status } = node.getData()
      edges?.forEach((edge) => {
        if (status === 'running') {
          edge.attr('line/strokeDasharray', 5)
          edge.attr('line/style/animation', 'running-line 30s infinite linear')
        } else {
          edge.attr('line/strokeDasharray', '')
          edge.attr('line/style/animation', '')
        }
      })
    })
  
    init(data)
    showNodeStatus(nodeStatusList.value)
    graph.value.centerContent()
  
    insertCss(`
      .node {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: 1px solid #c2c8d5;
        border-left: 4px solid #5F95FF;
        border-radius: 4px;
        box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
        }
        .node img {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        margin-left: 8px;
        }
        .node .label {
        display: inline-block;
        flex-shrink: 0;
        width: 104px;
        margin-left: 8px;
        color: #666;
        font-size: 12px;
        }
        .node .status {
        flex-shrink: 0;
        }
        .node.success {
        border-left: 4px solid #52c41a;
        }
        .node.failed {
        border-left: 4px solid #ff4d4f;
        }
        .node.running .status img {
        animation: spin 1s linear infinite;
        }
        .x6-node-selected .node {
        border-color: #1890ff;
        border-radius: 2px;
        box-shadow: 0 0 0 4px #d4e8fe;
        }
        .x6-node-selected .node.success {
        border-color: #52c41a;
        border-radius: 2px;
        box-shadow: 0 0 0 4px #ccecc0;
        }
        .x6-node-selected .node.failed {
        border-color: #ff4d4f;
        border-radius: 2px;
        box-shadow: 0 0 0 4px #fedcdc;
        }
        .x6-edge:hover path:nth-child(2){
        stroke: #1890ff;
        stroke-width: 1px;
        }

        .x6-edge-selected path:nth-child(2){
        stroke: #1890ff;
        stroke-width: 1.5px !important;
        }

        @keyframes running-line {
        to {
            stroke-dashoffset: -1000;
        }
        }
        @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
        }
    `)
})
</script>