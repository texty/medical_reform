<template>
<div>
  <svg :width='svgParameters.width' :height='svgParameters.height'>
    <g :transform="`translate(${margin.left},${margin.top})`">
      <rect 
        v-for="(d,i) in data"
        v-bind:key="i"
        x="0"
        :y="y(d.name)"
        :height="heightBar/2"
        :width="getScales().x(+d[variable])"
        fill="grey"
        @mouseover="hover = i"
        @mouseleave="hover = null"
        :class="{ active: hover === i }"
        
       >
        {{ d[variable] }}
      </rect>
      <g v-axis:x="getScales()" :transform="`translate(0,${height})`"></g>
      <g v-axis:y="getScales()" :transform="`translate(0,0)`"></g>
    </g>
  </svg>
</div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: 'vue-bar-chart',
  props:{
    temp: Array,
    variable: String,
    oblast: String
  },
  data() {
    return {
      hover: false,
      selectedVariable:'decl_count',
      margin: {
            top: 15,
            right: 25,
            bottom: 25,
            left: 140
        },
      svgParameters: {
        width: 560,
        height: 700
      }
    };
  },
  computed:{
    data: function() {
        var oblast = this.oblast;
        var variable = this.variable;

        var data = this.temp.filter(function(d) {
          return (d.oblast_name == oblast)
        });

        data = data.sort(function(a,b) {
            return a[variable] - b[variable];
        })

        return data;


    },
    width: function() {
      return this.svgParameters.width - this.margin.left - this.margin.right
    },
    height: function() {
      return this.svgParameters.height - this.margin.top - this.margin.bottom
    },
    heightBar: function(){
      return this.height / this.data.length;
    },
    try: function() {
      return this.y(this.data[1].name);
    }
  },
    directives: {
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];

      d3.select(el).call(d3[axisMethod](methodArg));
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getScales(){
      var variable = this.variable;
      let y = d3.scaleBand()
            .domain(this.data.map(function(d) { return d.name; }))
            .rangeRound([this.height, 0])
            .paddingInner(0.5);
      let x = d3.scaleLog()
        /*   .domain([d3.max(this.data.map(d => d[this.selectedVariable])), 0]) */
          .domain(d3.extent(this.data.map(function(d) { return +d[variable] }))).nice()
          .range([1, this.width]);

      return { x, y }
    },
    y(d) {
       let y = d3.scaleBand()
            .domain(this.data.map(function(d) { return d.name; }))
            .rangeRound([this.height, 0])
            .paddingInner(0.5);

        return y(d);
    }, 
    x(d) {
        let x = d3.scaleLinear()
          .domain([d3.max(this.data.map(d => d[this.selectedVariable])), 0])
          .range([this.width, 0]);

        return x(d);
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

rect.active
  fill: green
</style>