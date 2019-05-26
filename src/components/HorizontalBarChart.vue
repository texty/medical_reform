<template>
<div>
  <svg :width='svgParameters.width' :height='svgParameters.height'>
    <g :transform="`translate(${margin.left},${margin.top})`">
      <rect 
        v-for="(d,i) in temp"
        v-bind:key="i"
        x="0"
        :y="y(d.name)"
        :height="heightBar/2"
        :width="x(d[this.selectedVariable])"
        fill="grey"
        @mouseover="hover = i"
        @mouseleave="hover = null"
        :class="{ active: hover === i }"
        
       >
        {{ d[this.selectedVariable] }}
      </rect>
      <g v-axis:x="getScales()" :transform="`translate(0,${height})`"></g>
      <g v-axis:y="getScales()" :transform="`translate(0,0)`"></g>
    </g>

<!--       <text
      v-for="d in data"
      v-bind:key="d"
      x="0"
      :y="y(d.name) + 17"
      >
      {{ d.name }}
      </text> -->
  </svg>
</div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: 'vue-bar-chart',
  props:{
    temp: Array
  },
  data() {
    return {
      hover: false,
      selectedVariable:'decl_count',
      data: 0,
/*       temporaryData: [{
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
        }], */
      margin: {
            top: 15,
            right: 25,
            bottom: 25,
            left: 50
        },
      svgParameters: {
        width: 560,
        height: 300
      }
    };
  },
  computed:{
/*     data: function() {
        this.temporaryData.forEach((d,i) => {
          this.temporaryData[i][this.selectedVariable] = +d[this.selectedVariable]
        })
        return this.temporaryData.sort((a,b) => {
            return a[this.selectedVariable] - b[this.selectedVariable];
        })
        var a = this.temp;
        return a
    }, */
    width: function() {
      return this.svgParameters.width - this.margin.left - this.margin.right
    },
    height: function() {
      return this.svgParameters.height - this.margin.top - this.margin.bottom
    },
    heightBar: function(){
      return this.height / this.temp.length;
    },
    try: function() {
      return this.y(this.temp[1].name);
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
  async mounted() {
   /*  debugger;
    this.data = await this.temp;
    console.log('Bar loaded') */
  },
  methods: {
    getScales(){
      let y = d3.scaleBand()
            .domain(this.temp.map(function(d) { return d.name; }))
            .rangeRound([this.height, 0])
            .paddingInner(0.5);
      let x = d3.scaleLinear()
          .domain([d3.max(this.temp.map(d => d[this.selectedVariable])), 0])
          .range([this.width, 0]);

      return { x, y }
    },
    y(d) {
       let y = d3.scaleBand()
            .domain(this.temp.map(function(d) { return d.name; }))
            .rangeRound([this.height, 0])
            .paddingInner(0.5);

        return y(d);
    }, 
    x(d) {
        let x = d3.scaleLinear()
          .domain([d3.max(this.temp.map(d => d[this.selectedVariable])), 0])
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