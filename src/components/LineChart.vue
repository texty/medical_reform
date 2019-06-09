<template>
  <div>
    
    <svg :width="svgParameters.width" :height="svgParameters.height">
      <g 
      :transform="`translate(${margin.left},${margin.top})`">
        <path 
        v-tooltip:right="procuramentTypes[d.name]"
        v-for="(d,i) in line"
        v-bind:key="i"  
        :d="d.line" 
        :stroke="colors[d.name]"
        class="line" 
        />
        <g v-axis:x="getScales()" :transform="`translate(0,${height})`"></g>
        <g v-axis:y="getScales()" :transform="`translate(0,0)`"></g>
        <text>{{ name }}}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import tooltip from 'vue-simple-tooltip';

export default {
  name: 'vue-line-chart',
  props: {
    inputData: Array,
    name,
  },
  data() {
    return {
      tooltip:'fuck',
      procuramentTypes: {
        'type:331': 'Медичне обладнання',
        'type:45': ' Будівельні роботи та поточний ремонт',
        'type:48': 'Програмне забезпечення',
        'type:30': "Офісна та комп'ютерна техніка",
        "type:44": "Конструкції та конструкційні матеріали; допоміжна будівельна продукція"
      },
      margin: {
        top: 25,
        right: 25,
        bottom: 25,
        left: 100
      },
      svgParameters: {
        width: 300,
        height: 100
      },
      colors: {
        "type:30": 'red',
        "type:331": 'green',
        "type:44": 'blue',
        "type:45": 'yellow',
        "type:48": 'black'
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
      let nested = this.inputData;
      /* let nested = d3.nest().key(d => d.id_item_short).entries(this.inputData) */

      nested.forEach(d => {

        var dates = d.values.map(d => d.date_month)
        var first = "2016-07-01"

        if (!dates.includes(first)) {
        d.values.push(
          {
          date_month: "2016-07-01",
          hospital_edrpou: d.values[0].hospital_edrpou,
          id_item_short: d.values[0].id_item_short,
          name: d.values[0].name,
          oblast_name: d.values[0].oblast_name,
          sum:0,
          }
        )}
        
      })

      nested.forEach(d => {

        var dates = d.values.map(d => d.date_month)
        var first = "2019-05-01"

        if (!dates.includes(first)) {
        d.values.push(
          {
          date_month: "2019-05-01",
          hospital_edrpou: d.values[0].hospital_edrpou,
          id_item_short: d.values[0].id_item_short,
          name: d.values[0].name,
          oblast_name: d.values[0].oblast_name,
          sum:0,
          }
        )}
        
      })

      nested.forEach(elem => {
        elem.values.sort(function(a,b){
          return new Date(b.date_month) - new Date(a.date_month);
        })
      })


      return nested;
    },
    line: function() {
      var calculatePath = this.calculatePath
      let lines = this.computed_number.map(function(d) {
        return {'name': d.key, 'line':calculatePath(d.values)}
      });
      return lines;
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
      debugger;
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];


      const axisFinal = d3[axisMethod](methodArg)

      d3.select(el).call(axisFinal.ticks(3));
    },
    directives: {tooltip}
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


