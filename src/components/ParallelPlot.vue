<template>
  <div>
    <svg :width="svgHeigh" :height="svgHeigh">

      <g :transform="`translate(${margin.left},${margin.top})`">

        <path 
        v-for="(d,i) in line"
        v-bind:key="i"  
        v-tooltip:right="d.name"
        :d="d.line" 
        :stroke="d.growth"
        class="line" 
        >
        </path>
        <g v-axis:y="getScales()" :transform="`translate(${getScales().x(2017)})`"></g>
        <g v-axis:z="getScales()" :transform="`translate(${getScales().x(2019)})`"></g>

<!--         <g v-axis:x="getScales()" :transform="`translate(0,${height})`"></g>
 -->    
        <text :fill="'white'" x="15%" y="-5%" >{{ procuramentTypes[name] }}</text>

        <text class="yearLabel" :fill="'white'" :transform="`translate(${getScales().x(2019)}, ${height + 20})`">{{ '2019' }} </text>
        <text class="yearLabel" :fill="'white'" :transform="`translate(${getScales().x(2017) - 25}, ${height + 20})`">{{ '2017' }} </text>


      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import wrapper from 'vue-svg-textwrap';


export default {
  name: 'parallel-plot-chart',
  props: {
    inputData: Array,
    name: String,
    svgParameters: Object,
    
  },
  data() {
    return {
      svgWidth: 0,
      svgHeigh: 200,
      tooltip:'fuck',
      dimensions: ['2017', '2019'],
      procuramentTypes: {
        'type:48': 'Програмне забезпечення', 
        'type:51': 'Встановлення обладнання',
        'type:44': 'Будівельні матеріали',
        'type:35': 'Протипожежне обладнання',
        'type:38': 'Лабораторне обладнання',
        'type:70': "Оренда нерухомості",
        'type:42': "Промислова техніка",
        'type:39': "Меблі та офісне приладдя",
        'type:30': "Комп'ютнерна техніка",
        'type:331': 'Медичне обладнання',
        'type:45': 'Будівельні роботи і ремонт',
        'type:48': 'Програмне забезпечення',
        'type:30': "Офісна та комп'ютерна техніка",
        "type:44": "Конструкції та конструкційні матеріали; допоміжна будівельна продукція"
      },
      margin: {
        top: 30,
        right: 30,
        bottom: 0,
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
    const svgBcr = document.querySelector("div.parallelPlot svg").getBoundingClientRect(); 
    /* this.svgHeigh = svgBcr.height; */
    this.svgWidth = svgBcr.width;
  },
  computed: {
    line: function() {

      var calculatePath = this.calculatePath
      let lines = this.inputData.map(function(d) {


        return {
          'name': d.key, 
          'line':calculatePath(d.value),
          'growth': (100 - (d.value[2017]/d.value[2019]  * 100)) > 25 
            ? 'white' 
            : 'black'
         }
      });
      return lines;
    },
    width: function() {
      return this.svgWidth - this.margin.left - this.margin.right
    },
    height: function() {
      return this.svgHeigh - this.margin.top - this.margin.bottom
    },
  },
  directives: {
    axis(el, binding, i) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft", z: 'axisRight' }[axis];
      const methodArg = binding.value[axis];


      let numberOfTicks = axis == 'z' ? 0 : 3;


      const axisStart = d3[axisMethod](methodArg)
      
      d3.select(el).attr("class", "axisWhite").call(axisStart.ticks(numberOfTicks).tickFormat(d3.format("d")));
      
    },
    /* tooltip */
    wrapper
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
            .domain([1, d3.max(domain_2017.concat(domain_2019))])
            .range([height, 0])


        let z = y = d3.scaleLog()
            .domain([1, d3.max(domain_2017.concat(domain_2019))])
            .range([height, 0])


        let x = d3.scalePoint()
          .range([0, width])
          .padding(1)
          .domain(dimensions);

      
      return { x, y, z };
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

svg 
  display: block
  width: 100%
  height: 18em

path
  fill: none
  stroke-width: 0.5px
  color: white


div.line
  padding-bottom: 1em

.axisWhite
  color: white

text.yearLabel
  font-size: 10px 


/* path.line
  stroke: white */

</style>


