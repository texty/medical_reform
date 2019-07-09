<template>
<div>
  <svg :width='svgWidth' :height='svgHeigh'>
    <g :transform="`translate(${(svgWidth-width)/2},${margin.top})`">
      <rect 
        v-for="(d,i) in computedScales.bins"
        v-bind:key="i"
        :x="computedScales.x(d.x0)"
        :width="Math.max(0, computedScales.x(d.x1) - computedScales.x(d.x0) - 1)"
        :y="computedScales.y(d.length)"
        :height="computedScales.y(1) - computedScales.y(d.length)"
        fill="white"
        :data="d.value"
       >
      </rect>
      <text> {{ `${names[variable]}` }}</text>
      <g v-axis:x="computedScales" :transform="`translate(0,${height - margin.bottom})`"></g>
      <g v-axis:y="computedScales" :transform="`translate(0,0)`"></g>

      <text class="yearLabel"  :fill="'white'" :transform="`translate(5, ${height + 5})`"> {{ labels[variable] }} </text>
      <text class="yearLabel" :fill="'white'" :transform="`translate(5, ${25})`">{{ 'Кількість лікарів' }} </text>


    </g>
  </svg>
</div>
</template>

<script>
import * as d3 from "d3";
import wrapper from 'vue-svg-textwrap';

export default {
  name: 'vue-hist-chart',
  props: {
    temp: Array,
    variable: String,
    oblast: String,
    toDraw: Boolean
  },
  data() {
    return {
      svgWidth: 0,
      toDrawT:true,
      svgHeigh: 400,
      tempData: JSON.parse(JSON.stringify(this.temp)),
      names: {
              decl_count: "Кількість декларацій на одного лікаря",
              money_per_month: 'Виплати одному лікарю на місяць' 
             },
      labels: {
              decl_count: "Кількість пацієнтів на одного лікаря",
              money_per_month: 'Виплати кожному лікарю, грн. в місяць' 
      },
      tempVar: this.temp,
      margin: {
            top: 50,
            right: 250,
            bottom: 50,
            left: 250
        },
      svgParameters: {
        width: 450,
        height: 300
      }
    };
  },
  watch: {
    toDrawT: function(oldValue){
    var amount = this.tempData.length;
	
    for(var i = 0; i < amount; i++)
    {
        var element = this.tempData[i];
        TweenLite.to(element, 3, {money_per_month: this.temp[i]['money_per_month'],
         decl_count: this.temp[i]['decl_count']});
    }

    /* this.AnimateLoad(); */
    }
  },
  computed:{
    data: function() {
      var variable = this.variable;
      var data = this.tempData.map(function(d){
          return +d[variable]
      })
        return data
    },
    width: function() {
      return this.svgWidth - this.margin.left - this.margin.right
    },
    height: function() {
      return this.svgHeigh - this.margin.top - this.margin.bottom
    },
    computedScales: function() {
      let x = d3.scaleLinear()
        .domain(d3.extent(this.data.map(d => d))).nice()
        .range([0, this.width]);

      let bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(40))(this.data.map(d => d));

      let y = d3.scaleLinear()
        .domain([1, d3.max(bins, d => d.length)]).nice()
        .range([this.height - this.margin.bottom, this.margin.top])

        
        return { x, y, bins };
    }
  },
  directives: {
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];

      const axisFinal = d3[axisMethod](methodArg)

      d3.select(el).call(axisFinal.ticks(4));
    },
    wrapper
  },
  mounted() {
    let amount = this.tempData.length;

    for(var i = 0; i < amount; i++)
    {
        var element = this.tempData[i];
        TweenLite.to(element, 0.1, {money_per_month: 0, decl_count: 0});
    } 

    const svgBcr = document.querySelector("div.finalBars").getBoundingClientRect(); 
    this.svgWidth = svgBcr.width;
  },
  methods: {
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
  }
}
</script>

<style lang="sass" scoped>
svg
  display: block
  /* margin: 25px */
  margin-right: 0
  width: 100%
path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px


text.yearLabel
  font-size: 9px
</style>