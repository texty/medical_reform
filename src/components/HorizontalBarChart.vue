<template>

<div class="holder" :width='svgParameters.width' :height='svgParameters.height' >
  <div class="selectorOblast">
    <h3>Оберіть область: </h3>
    <multiselect v-model="oblast" :options="oblast_names"></multiselect>
  </div>
  <svg :width='svgParameters.width' :height='svgParameters.height'>
    <g :transform="`translate(${margin.left},${margin.top})`">
      <rect 
        v-for="(d,i) in data"
        v-bind:key="i"
        x="0"
        :y="getScales().y(d.rajon_grouped) + 5"
        :height="heightOfbar"
        :width="getScales().x(+d[variable])"
        fill="green"
        :class="{ active: hover === i }"
       >
        {{ d[variable] }}
      </rect>
      <text
      v-for="(d,i) in data"
      v-bind:key="i"
      :x="getScales().x(+d[variable]) + 10"
      :y="getScales().y(d.rajon_grouped) + 10"
      :width="1"
      fill="grey"
      > {{ Math.round(d[variable]) + '%' }} </text>

      <text
      v-for="(d,i) in data"
      v-bind:key="i"
      :x="0"
      :y="getScales().y(d.rajon_grouped) - 1"
      :width="2"
      fill="black"
      > {{  d.rajon_grouped }} </text>

      <circle
        v-for="(d,i) in data"
        v-bind:key="i"
        :cx="getScales().x(+d[variable])"
        :cy="getScales().y(d.rajon_grouped) + 7"
        :r="6" 
        fill="blue">
           
      </circle>

      <!-- <g v-axis:x="getScales()" :transform="`translate(0,${height})`"></g> -->
      <!-- <g v-axis:y="getScales()" :transform="`translate(0,0)`"></g> -->
    </g>
  </svg>
</div>
</template>

<script>
import * as d3 from "d3";
import Multiselect from 'vue-multiselect'


export default {
  name: 'vue-bar-chart',
  props:{
    temp: Array,
    variable: String,

  },
  data() {
    return {
      oblast: 'Київська',
      hover: false,
      selectedVariable:'decl_count',
      heightOfbar: 5,
      margin: {
            top: 15,
            right: 25,
            bottom: 25,
            left: 0
        }
    };
  },
  components: {
    Multiselect
  },
  computed:{
    data: function() {
      debugger;
        var oblast = this.oblast;
        var variable = this.variable;

        var data = this.temp.filter(function(d) {
          return (d.oblast == oblast)
        });

        data = data.sort(function(a,b) {
            return a[variable] - b[variable];
        })

        return data;

    },
    oblast_names: function() {
      return [...new Set(this.temp.map(d => d.oblast))]
    },
    svgParameters: function() {
      return {
        width: 900,
        height: 35 * this.data.length
      }
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
/*     try: function() {
      debugger;
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

  },
  methods: {
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
    }
  }
}
</script>

<style lang="sass" scoped>

div.holder
  width: 75%
  margin: 0 auto


div.selectorOblast
  display: flex

div.selectorOblast h3
  margin: 0px 25px

div.multiselect
  margin: 0px 25px
  width: 30%

svg
  margin: 25px
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