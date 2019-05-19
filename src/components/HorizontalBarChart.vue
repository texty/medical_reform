<template>
<div>
  <svg width='960' height='500'>
      <rect 
        v-for="d in data"
        x="0"
        :y="y(d.value)"
        :height="5"
        :width="d.value"
       >
        {{ d.value }}
      </rect>
  </svg>
</div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'vue-bar-chart',
  data() {
    return {
      data: [{
                "name": "Apples",
                "value": 20,
        },
            {
                "name": "Bananas",
                "value": 12,
        },
            {
                "name": "Grapes",
                "value": 19,
        },
            {
                "name": "Lemons",
                "value": 5,
        },
            {
                "name": "Limes",
                "value": 16,
        },
            {
                "name": "Oranges",
                "value": 26,
        },
            {
                "name": "Pears",
                "value": 30,
        }],
      margin: {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        },
    };
  },
  computed:{
    width: function() {
      return 960 - this.margin.left - this.margin.right
    },
    height: function() {
      return 500 - this.margin.top - this.margin.bottom
    },
    try: function() {
      return this.y(this.data[1].value);
    }
  },
  mounted() {
/*     this.calculatePath();
 */  },
  methods: {
    y(d){
      let y = d3.scaleOrdinal()
                .range([this.height, 0])
                .domain([0, d3.max(this.data, function (d) {
                  return d.value;
                })
              ]);
      return y(d);
    }, 
    getScales() {
      const x = d3.scaleTime().range([0, 430]);
      const y = d3.scaleLinear().range([210, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, d => d)]);
      return { x, y };
    },
    calculatePath() {
      const scale = this.getScales();
/*       const path = d3.line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d));
      this.line = path(this.data);
    }, */
  }
  }
}
</script>

<style lang="sass" scoped>
svg
  margin: 25px;
path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>