<template>
  <div>
    <svg  :width="svgParameters.width" :height="svgParameters.height">
      <g :transform="`translate(${margin.left},${margin.top})`">
        <path class="line" :d="line" />
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
      temp: [{
                "name": "Apples",
                "value": 20,
                "date": "2019-01-01"
        },
            {
                "name": "Bananas",
                "value": 12,
                "date": "2019-02-01"

        },
            {
                "name": "Grapes",
                "value": 19,
                "date": "2019-03-01"
        },
            {
                "name": "Lemons",
                "value": 5,
                "date": "2019-04-01"
        },
            {
                "name": "Limes",
                "value": 16,
                "date": "2019-05-01"
        },
            {
                "name": "Oranges",
                "value": 26,
                "date": "2019-06-01"
        },
            {
                "name": "Pears",
                "value": 30,
                "date": "2019-07-01"
        }],
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
        return this.temp.sort((a,b) => {
            return new Date(a.date) - new Date(b.date);
        })
    },
    line: function() {
      return this.calculatePath(this.data);
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
      var x = d3.scaleTime()
        .range([0, this.width])
        .domain(d3.extent(this.data, function(d) { return new Date(d.date); }));
  
      var y = d3.scaleLinear()
        .range([this.height, 0])
        .domain([0, d3.max(this.data, function(d) { return d.value; })]);
      
      return { x, y };
    },
    calculatePath(data) {
      const scale = this.getScales();
      const path = d3.line()
        .x(function(d) { return scale.x(new Date(d.date)); })
        .y(function(d) { return scale.y(d.value); });
      
      return path(this.data);
    },
  },
};
</script>

<style lang="sass" scoped>
svg
  /* margin: 25px */
path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>