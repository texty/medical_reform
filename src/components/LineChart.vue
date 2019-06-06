<template>
  <div>
    
    <svg  :width="svgParameters.width" :height="svgParameters.height">
      <g 
      v-for="(d,i) in line"
      v-bind:key="i"
      :transform="`translate(${margin.left},${margin.top})`">
        <!-- <text>{{ d.name }}</text> -->
        <path 
        :d="d.line" 
        :stroke="'#76BF8A'"
        class="line" 
        />
        <g v-axis:x="getScales()" :transform="`translate(0,${height})`"></g>
        <g v-axis:y="getScales()" :transform="`translate(0,0)`"></g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'vue-line-chart',
  props: {
    inputData: Array,
  },
  data() {
    return {
      color: {

      },
      margin: {
        top: 25,
        right: 25,
        bottom: 25,
        left: 25
      },
      svgParameters: {
        width: 560,
        height: 300
      }
    };
  },
  mounted() {
  },
  computed: {
    data: function() {
        return this.inputData;
    },
    computed_number: function(){
      let nested = d3.nest().key(d => d.id_item_short).entries(this.inputData)
      return nested;
    },
    line: function() {
      var calculatePath = this.calculatePath
      return this.computed_number.map(function(d) {
        return {'name': d.key, 'line':calculatePath(d.values)}
      });
    },
    width: function() {
      return this.svgParameters.width - this.margin.left - this.margin.right
    },
    height: function() {
      return this.svgParameters.height - this.margin.top - this.margin.bottom
    },
  },
  directives: {
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];

      d3.select(el).call(d3[axisMethod](methodArg));
    }
  },
  methods: {
    getScales() {
      var values = [];
      var dates = [];
      this.computed_number.forEach(d => {
          d.values.forEach(dd => { 
              values.push(+dd.sum)
              dates.push(new Date(dd.date_month))
           }) 
      })

      var x = d3.scaleTime()
        .range([0, this.width])
        .domain(d3.extent(dates));
  
      var y = d3.scaleLinear()
        .range([this.height, 0])
        .domain([0, d3.max(values)]);
      
      return { x, y };
    },
    calculatePath(data) {
      const scale = this.getScales();
      const path = d3.line()
        .x(function(d) { return scale.x(new Date(d.date_month)); })
        .y(function(d) { return scale.y(d.sum); })
        .curve(d3.curveMonotoneX);
      
      return path(data);
    },
  },
};
</script>

<style lang="sass" scoped>
svg
  /* margin: 25px */
path
  fill: none
  /* stroke: #76BF8A */
  stroke-width: 3px
</style>