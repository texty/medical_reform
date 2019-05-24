<template>
  <div>
    <svg  :width="svgParameters.width" :height="svgParameters.height">
      <g :transform="`translate(${margin.left},${margin.top})`">
        <path 
        v-for="(d,i) in line"
        v-bind:key="i"
        :d="d" 
        :stroke="color"
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
  data() {
    return {
      color: '#76BF8A',
      temp: [
        [{
                "name": "Apples",
                "value": 20,
                "date": "2019-01-01"
        },
            {
                "name": "Apples",
                "value": 20,
                "date": "2019-02-01"

        },
            {
                "name": "Apples",
                "value": 19,
                "date": "2019-03-01"
        },
            {
                "name": "Apples",
                "value": 51,
                "date": "2019-04-01"
        },
            {
                "name": "Apples",
                "value": 16,
                "date": "2019-05-01"
        },
            {
                "name": "Apples",
                "value": 26,
                "date": "2019-06-01"
        },
            {
                "name": "Apples",
                "value": 30,
                "date": "2019-07-01"
        }], 
        [{
                "name": "Bananas",
                "value": 20,
                "date": "2019-01-01"
        },
            {
                "name": "Bananas",
                "value": 12,
                "date": "2019-02-01"

        },
            {
                "name": "Bananas",
                "value": 19,
                "date": "2019-03-01"
        },
            {
                "name": "Bananas",
                "value": 5,
                "date": "2019-04-01"
        },
            {
                "name": "Bananas",
                "value": 88,
                "date": "2019-05-01"
        },
            {
                "name": "Bananas",
                "value": 26,
                "date": "2019-06-01"
        },
            {
                "name": "Bananas",
                "value": 30,
                "date": "2019-07-01"
        }],
        
        ],
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
        /* let a = this.temp.sort((a,b) => {
            return new Date(a.date) - new Date(b.date);
        }); */

        return this.temp;
    },
    line: function() {
      var calculatePath = this.calculatePath
      return this.data.map(d => calculatePath(d));
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
      this.data.forEach(d => {
          d.forEach(dd => {
              values.push(dd.value)
              dates.push(new Date(dd.date))
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
        .x(function(d) { return scale.x(new Date(d.date)); })
        .y(function(d) { return scale.y(d.value); });
      
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