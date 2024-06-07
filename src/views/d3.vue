<template>
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

const chart = ref<any>(null)

const showTooltip = (event: MouseEvent, content: string, x:Number, y:Number) => {
  const body = document.getElementsByTagName('body')[0];
  let loadingElement = document.createElement('div');
  loadingElement.classList.add('showTooltip')
  loadingElement.style.position = 'fixed';
  loadingElement.style.top = y + 'px';
  loadingElement.style.left = x + 'px';
  loadingElement.style.width = '300px';
  loadingElement.style.height = '100px';
  loadingElement.style.backgroundColor = 'red';
  loadingElement.style.zIndex = '9998';
  body.appendChild(loadingElement);
};

const hideTooltip = () => {
  const body = document.getElementsByTagName('body')[0];
  let loadingElement = document.getElementsByClassName('showTooltip')[0];
  body.removeChild(loadingElement);
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
      .attr('width', '100%')
      .attr('height', '100%');

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
      .attr('r', 60)
      .attr('fill', 'lightblue')
      .on('mouseover', function(event, d:any) {
        showTooltip(event, d.data.name, d.x, d.y);
      })
      .on('mouseout', () => {
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
      .on('mouseover', function(event, d:any) {
        showTooltip(event, d.data.name, d.x, d.y);
      })
      .on('mouseout', () => {
        hideTooltip()
      })
      .text(d => d.data.name);
  }
});

</script>

<style scoped>
.showTooltip {
  width: 200px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid #000;
}
</style>