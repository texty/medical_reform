<template>

<div class="horizontalPlot" :width='svgParameters.width' :height='svgParameters.height' >


  <div class="selectorOblast">
    <h4><b>Кількість підписаних декларацій</b></h4>
    <div class="oblast">
      <h5>Оберіть область:</h5>
      <multiselect :hide-selected="true" placeholder="Виберіть область" deselect-label="" select-label="" :allow-empty="false" v-model="oblast" :options="oblast_names"></multiselect>
    </div>
  </div>



<div class="plot">
  <svg :width='svgParameters.width' :height='svgParameters.height' ref="transition" trigger="none">

    <g 
    :transform="`translate(${(svgParameters.width-width)/2 - 25},${margin.top})`">
      <rect 
        v-for="(d,i) in data"
        v-bind:key="i"
        x="0"
        :y="getScales().y(d.rajon_grouped) + 5"
        :height="heightOfbar/2"
        :width="drawIfTrue(getScales().x(+d[variable]))"
        :fill="i == data.length-1 ? '#ff61ef'  : 'white'"
        :class="{ active: hover === i }"
       >
      </rect>
      <text
      v-for="(d,i) in data"
      v-bind:key="i+'c'"
      :x="getScales().x(+d[variable]) + 10"
      :y="getScales().y(d.rajon_grouped) + 10"
      :width="1"
      fill="white"
      > {{ Math.round(d[variable]) + '%' }} </text>

      <text
      v-for="(d,i) in data"
      v-bind:key="i+'a'"
      :x="0"
      :y="getScales().y(d.rajon_grouped) - 1"
      :width="2"
      fill="white"
      > {{  d.rajon_grouped }} </text>

      <circle
        v-for="(d,i) in data"
        v-bind:key="i+'b'"
        :cx="getScales().x(+d[variable])"
        :cy="getScales().y(d.rajon_grouped) + 7"
        :r="6" 
        :fill="i + 'b' == data.length-1 + 'b' ? '#ff61ef'  : 'white'">
           
      </circle>

      <!-- <g v-axis:x="getScales()" :transform="`translate(0,${height})`"></g> -->
      <!-- <g v-axis:y="getScales()" :transform="`translate(0,0)`"></g> -->
    </g>
  </svg>
  </div>
</div>
</template>

<script>
import * as d3 from "d3";
import Multiselect from 'vue-multiselect'
import { TweenLite } from 'gsap'
import { selectAll } from "d3-selection";
import { transition } from "d3-transition";



export default {
  name: 'vue-bar-chart',
  props:{
    temp: Array,
    variable: String,
    toDraw: Boolean,

  },
  data() {
    return {
      oblast: 'Київська',
      hover: false,
      heightOfbar: 5,
      checker: false,
      tempData: JSON.parse(JSON.stringify(this.temp)),
      mountedWidth: 0,
      margin: {
            top: 15,
            right: 25,
            bottom: 25,
            left: -15
        }
    };
  },
  components: {
    Multiselect
  },
  watch: {
    toDraw: function(oldValue){
    var amount = this.tempData.length;
	
    for(var i = 0; i < amount; i++)
    {
        var element = this.tempData[i];
        TweenLite.to(element, 3, {declarations_ratio: this.temp[i]['declarations_ratio']});
    }

    /* this.AnimateLoad(); */
    }
  },
  computed:{
    data: function(){
      var oblast = this.oblast;
      var variable = this.variable;
      return this.tempData.filter(function(d) {
        return (d.oblast == oblast)
      }).sort(function(a,b) {
          return a[variable] - b[variable];
      })
    },
    drawData: function(){
      let data = this.data;
      let getScales = this.getScales()
      let variable = this.variable;

      let out = this.data.map(d => {
        return {'height': getScales.y(d.rajon_grouped), 'width': getScales.x(d[variable])}
      });

      return out
    },
    oblast_names: function() {
      return [...new Set(this.temp.map(d => d.oblast))]
    },
    svgParameters: function() {
      return {
        width: this.mountedWidth,
        height: 35 * this.data.length
      }
    },
    width: function() {
      return this.svgParameters.width/2 - this.margin.left - this.margin.right
    },
    height: function() {
      return this.svgParameters.height - this.margin.top - this.margin.bottom
    },
    heightBar: function(){
      return this.height / this.data.length;
    },
/*     try: function() {
      let getScales = this.getScales;
      let variable = this.variable;
      return this.data.map(function(d){
        return getScales().x(+d[variable]/+d['total_populatiom'])
      })
    } */
  },
    directives: {
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];

      d3.select(el).call(d3[axisMethod](methodArg));
    }
  },
  created() {

  },
  mounted() {
    const svgBcr = document.querySelector("div.horizontalPlot").getBoundingClientRect(); 
    this.mountedWidth = svgBcr.width;

    let amount = this.tempData.length;

    for(var i = 0; i < amount; i++)
    {
        var element = this.tempData[i];
        TweenLite.to(element, 0.1, {declarations_ratio: 0});
    } 

  },
  methods: {
    AnimateLoad(){
      let checker = this.checker;

      let a = selectAll("rect")
        .data(this.data)
        .transition()
       /*  .delay((d, i) => {
          return i * 150;
        }) */
        .duration(1000)
        .attr("y", d => {
          return this.getScales().y(d.rajon_grouped) + 5
        })
        .attr("width", d => {
          return this.getScales().x(+d[this.variable])
        })
        .on("end", d => {
            checker = true
        });

        console.log('yesss')

        return a
    },
    getScales(){
      var variable = this.variable;
      let y = d3.scaleBand()
            .domain(this.data.map(function(d) { return d.rajon_grouped; }))
            .rangeRound([this.height, 0])
            .paddingInner(0.5);

      let x = d3.scaleLinear()
          .domain([0, 120])
          .range([1, this.width]);

      return { x, y }
    },
    drawIfTrue(x) {
      if (true) {
        /* TweenLite.to(this.$data, 7, {heightOfbar: 70}) */
        /* d3.selectAll('rect').transition(); */
        return x
      }
      else {
        return 0
      }
    },
    /*  experiment: function () {
       return 1 + 2
    } */
  }
}
</script>

<style lang="sass" scoped>

/* div.holder
  width: 75%
  margin: 0 auto */

div.selectorOblast
  h4
    text-align: center


div.selectorOblast div
  display: flex
  justify-content: center

  




div.plot
  padding-top: 1.5em
  padding-bottom: 1.5em

div.selectorOblast 
  h4
    margin: 0.5em 25px
  h5 
    margin: 0px 25px

div.multiselect
  margin: 0px 25px
  width: auto

svg
  /* margin: 25px */
  margin-right: 0
  display: inline-block

path.domain
  display: none

tick
  line
    display: none
path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px

rect.active
  fill: green


</style>