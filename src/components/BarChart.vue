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
        :height="computedScales.y(1) - computedScales.y(d.length)"
        fill="grey"
        :data="d.value"
       >
      </rect>
      <text></text>
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
  props: {
    temp: Array,
    variable: String,
    oblast: String
  },
  data() {
    return {
      tempVar: this.temp,
      margin: {
            top: 15,
            right: 25,
            bottom: 25,
            left: 40
        },
      svgParameters: {
        width: 500,
        height: 300
      }
    };
  },
  computed:{
    data: function() {
      var variable = this.variable;
      var data = this.temp.map(function(d){
          return +d[variable]
      })
        return data
    },
    width: function() {
      return this.svgParameters.width - this.margin.left - this.margin.right
    },
    height: function() {
      return this.svgParameters.height - this.margin.top - this.margin.bottom
    },
    computedScales: function() {
      let x = d3.scaleLinear()
        .domain(d3.extent(this.data.map(d => d))).nice()
        .range([0, this.width]);

      let bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(40))(this.data.map(d => d));

      let y = d3.scaleLinear()
        .domain([1, d3.max(bins, d => d.length)]).nice()
        .range([this.height - this.margin.bottom, this.margin.top])

        
        return { x, y, bins };
    }
  },
  directives: {
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];

      const axisFinal = d3[axisMethod](methodArg)

      d3.select(el).call(axisFinal.ticks(3));
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