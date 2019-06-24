<template>
  <div>
    
    <svg :width="svgParameters.width" :height="svgParameters.height">

      <g :transform="`translate(${margin.left},${margin.top})`">

        <path 
        v-for="(d,i) in line"
        v-bind:key="i"  
        v-tooltip:right="d.name"
        :d="d.line" 
        :stroke="'grey'"
        class="line" 
        >
        </path>
        <g v-axis:y="getScales()" :transform="`translate(${getScales().x(2017)})`"></g>
        <g v-axis:y="getScales()" :transform="`translate(${getScales().x(2019)})`"></g>

<!--         <g v-axis:x="getScales()" :transform="`translate(0,${height})`"></g>
 -->    
        <text>{{ name }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';


export default {
  name: 'parallel-plot-chart',
  props: {
    inputData: Array,
    name: String,
    svgParameters: Object
  },
  data() {
    return {
      tooltip:'fuck',
      dimensions: ['2017', '2019'],
      procuramentTypes: {
        'type:331': 'Медичне обладнання',
        'type:45': ' Будівельні роботи та поточний ремонт',
        'type:48': 'Програмне забезпечення',
        'type:30': "Офісна та комп'ютерна техніка",
        "type:44": "Конструкції та конструкційні матеріали; допоміжна будівельна продукція"
      },
      margin: {
        top: 15,
        right: 25,
        bottom: 25,
        left: 30
      },
      colors: {
        "type:30": 'red',
        "type:331": 'green',
        "type:44": 'blue',
        "type:45": 'yellow',
        "type:48": 'black'
      },

    };
  },
  mounted() {
  },
  computed: {
    line: function() {
      var calculatePath = this.calculatePath
      let lines = this.inputData.map(function(d) {
        return {'name': d.key, 'line':calculatePath(d.value)}
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
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];


      const axisStart = d3[axisMethod](methodArg)
      
      d3.select(el).call(axisStart.ticks(3).tickFormat(d3.format(".0s")));
    },
    /* tooltip */
  },
  methods: {
    getScales() {
      var values = [];
      var dates = [];
      let dimensions = this.dimensions;

    /*   this.computed_number.forEach(d => {
          d.values.forEach(dd => { 
              values.push(+dd.sum)
              dates.push(new Date(dd.date_month))
           }) 
      }) */
        // For each dimension, I build a linear scale. I store all in a y object
        /* var y = {}; */
        let inputData = this.inputData;
        let svgParameters = this.svgParameters;
        let width = this.width;
        let height = this.height;

        /* dimensions.forEach(function(name) {

        let domain = d3.extent(inputData, function(d) { 
              return d.value[name]+0.001;
        })

        y[name] = d3.scaleLog()
            .domain(domain)
            .range([height, 0])
        }); */

        let domain_2017 = d3.extent(inputData, function(d) { 
              return d.value[2017]+0.001;
        })

        let domain_2019 = d3.extent(inputData, function(d) { 
              return d.value[2019]+0.001;
        })


        let y = d3.scaleLog()
            .domain([1, domain_2019[1]])
            .range([height, 0])


        let x = d3.scalePoint()
          .range([0, width])
          .padding(1)
          .domain(dimensions);

      
      return { x, y };
    },
    calculatePath(data) {
      const scale = this.getScales();
      const dimensions = this.dimensions;
      
      return d3.line()(dimensions.map(function(p) { return [scale.x(p), scale.y(data[p])]; }));
    },
  },
};
</script>

<style lang="sass" scoped>
path
  fill: none
  stroke: #76BF8A
  stroke-width: 0.5px
</style>


