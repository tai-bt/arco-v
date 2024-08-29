import { Graph, Path } from '@antv/x6'
import AlgoNode from './AlgoNode.vue'
import { register } from '@antv/x6-vue-shape'


export const registerCustomNode = () => {
    // 注册自定义节点
    register({
        shape: 'dag-node',
        width: 180,
        height: 36,
        component: AlgoNode,
        ports: {
            groups: {
            top: {
                position: 'top',
                attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#C2C8D5',
                    strokeWidth: 1,
                    fill: '#fff',
                },
                },
            },
            bottom: {
                position: 'bottom',
                attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#C2C8D5',
                    strokeWidth: 1,
                    fill: '#fff',
                },
                },
            },
            },
        },
    })
}
export const registerCustomEdge = () => {
    // 注册自定义边
    Graph.registerEdge(
        'dag-edge',
        {
            inherit: 'edge',
            attrs: {
                line: {
                    stroke: '#C2C8D5',
                    strokeWidth: 1,
                    targetMarker: null,
                },
            },
        },
        true
    )
}
export const registerCustomConnector = () => {
    // 注册自定义连线
    Graph.registerConnector(
        'algo-connector',
        (s, e) => {
            const offset = 4
            const deltaY = Math.abs(e.y - s.y)
            const control = Math.floor((deltaY / 3) * 2)

            const v1 = { x: s.x, y: s.y + offset + control }
            const v2 = { x: e.x, y: e.y - offset - control }

            return Path.normalize(
                `M ${s.x} ${s.y}
                L ${s.x} ${s.y + offset}
                C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
                L ${e.x} ${e.y}
                `
            )
        },
        true
    )
}