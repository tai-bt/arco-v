<template>
  <div ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import * as d3 from 'd3';

const chart = ref<any>(null)

const tooltip = reactive({
    visible: false,
    content: '',
    style: {
      position: 'absolute',
      left: '0px',
      top: '0px',
      background: '#fff',
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '4px',
      pointerEvents: 'none' as 'none',
      zIndex: 1000
    }
});

const showTooltip = (event: MouseEvent, content: string) => {
    tooltip.visible = true;
    tooltip.content = content;
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
};

const hideTooltip = () => {
    tooltip.visible = false;
};

onMounted(() => {
    const data = {
        name: "Root",
        children: [
            { name: "Child 1" },
            { name: "Child 2", children: [
                { name: "Grandchild 1" },
                { name: "Grandchild 2" }
            ]},
            { name: "Child 3" }
        ]
    };

    const width = 600;
    const height = 400;

    if (chart.value) {
        const svg = d3.select(chart.value)
          .append('svg')
          .attr('width', width)
          .attr('height', height);

        const root = d3.hierarchy(data);
        const treeLayout = d3.tree<any>().size([width - 100, height - 100]);
        treeLayout(root);

        svg.selectAll('line')
          .data(root.links())
          .enter()
          .append('line')
          .attr('x1', d => (d.source as any).x + 50)
          .attr('y1', d => (d.source as any).y + 50)
          .attr('x2', d => (d.target as any).x + 50)
          .attr('y2', d => (d.target as any).y + 50)
          .attr('stroke', 'black');

        svg.selectAll('circle')
          .data(root.descendants())
          .enter()
          .append('circle')
          .attr('cx', d => (d.x as number) + 50)
          .attr('cy', d => (d.y as number) + 50)
          .attr('r', 20)
          .attr('fill', 'lightblue')
          .on('mouseover', function(event, d) {
            console.log(12312)
            showTooltip(event, d.data.name);
          })
          .on('mouseout', () => {
            console.log(22222)
            hideTooltip()
          });

        svg.selectAll('text')
          .data(root.descendants())
          .enter()
          .append('text')
          .attr('x', d => (d.x as number) + 50)
          .attr('y', d => (d.y as number) + 50)
          .attr('dy', '.35em')
          .attr('text-anchor', 'middle')
          .text(d => d.data.name);
    }
});

</script>

<style scoped>

</style>