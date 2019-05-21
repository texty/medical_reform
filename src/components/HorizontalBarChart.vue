<template>
<div>
  <svg :width='svgParameters.width' :height='svgParameters.height'>
      <rect 
        v-for="(d,i) in data"
        v-bind:key="i"
        x="70"
        :y="y(d.name)"
        :height="heightBar"
        :width="x(d.value)"
        fill="grey"
       >
        {{ d.value }}
      </rect>
      <text
      v-for="d in data"
      v-bind:key="d"
      x="0"
      :y="y(d.name) + 17"
      >
      {{ d.name }}
      </text>
  </svg>
</div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: 'vue-bar-chart',
  data() {
    return {
      temporaryData: [{
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
      svgParameters: {
        width: 560,
        height: 210
      }
    };
  },
  computed:{
    data: function() {
        return this.temporaryData.sort((a,b) => {
            return a.value - b.value;
        })
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
  mounted() {
  },
  methods: {
    y(d) {
       let y = d3.scaleBand()
            .domain(this.data.map(function(d) { return d.name; }))
            .rangeRound([this.height, 0])
            .paddingInner(0.5);

        return y(d);
    }, 
    x(d) {
        let x = d3.scaleLinear()
          .domain([d3.max(this.data.map(d => d.value)), 0])
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
</style>