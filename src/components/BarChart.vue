<template>
<div>
  <svg :width='svgParameters.width' :height='svgParameters.height'>
    <g :transform="`translate(${margin.left},${margin.top})`">
      <rect 
        v-for="(d,i) in computedScales.bins"
        v-bind:key="i"
        :x="computedScales.x(d.x0)"
        :width="Math.max(0, computedScales.x(d.x1) - computedScales.x(d.x0) - 1)"
        :y="computedScales.y(d.length)"
        :height="computedScales.y(0) - computedScales.y(d.length)"
        fill="grey"
        :data="d.value"
       >
      </rect>
      <g v-axis:x="computedScales" :transform="`translate(0,${height - margin.bottom})`"></g>
      <g v-axis:y="computedScales" :transform="`translate(0,0)`"></g>

    </g>
  </svg>
</div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: 'vue-hist-chart',
  data() {
    return {
      margin: {
            top: 15,
            right: 25,
            bottom: 25,
            left: 20
        },
      svgParameters: {
        width: 500,
        height: 300
      }
    };
  },
  computed:{
    data: function() {
        return Array(400).fill(0).map((d) => {
            return {
                name:"Fruit",
                value: this.getRandomArbitrary(0,1000)
            }
        })

    },
    width: function() {
      return this.svgParameters.width - this.margin.left - this.margin.right
    },
    height: function() {
      return this.svgParameters.height - this.margin.top - this.margin.bottom
    },
    computedScales: function() {
      let x = d3.scaleLinear()
        .domain(d3.extent(this.data.map(d => d.value))).nice()
       /*  .domain([d3.max(this.data.map(d => d.value)), 0]).nice() */
        .range([0, this.width]);

      let bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(50))
        (this.data.map(d => d.value));

      let y = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)]).nice()
        .range([this.height - this.margin.bottom, this.margin.top])

        
        return { x, y, bins };
    }
  },
  directives: {
    axis(el, binding) {
      debugger;
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];

      d3.select(el).call(d3[axisMethod](methodArg));
    }
  },
  mounted() {
  },
  methods: {
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
  }
}
</script>

<style lang="sass" scoped>
svg
  margin: 25px
path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>