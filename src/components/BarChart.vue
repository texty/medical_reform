<template>
  <div id="barchartContainer"> <!-- *Женя: доадала id, аби за ним рахувати ширину svg *не працює -->
    <svg :width="svgWidth" :height="svgHeigh">
      <g :transform="`translate(${ margin.left },${margin.top})`">
        <rect
          :class="'bar'"
          @mouseover.native="hover = true"
          @mouseleave.native="hover = false"
          v-for="(d,i) in computedScales.bins"
          v-bind:key="i"
          v-tooltip:right="variable == 'decl_count' 
          ? formatNumber().format(d.length) + ' лікарів підписали ' + formatNumber().format(d.x1) + ' декларації' 
          : formatNumber().format(d.length )+ ' лікарів отримують ' + formatNumber().format(d.x1) + ' гривень в місяць'"
          :x="computedScales.x(d.x0)"
          :width="Math.max(0, computedScales.x(d.x1) - computedScales.x(d.x0) - 1)"
          :y="computedScales.y(d.length)"
          :height="computedScales.y(1) - computedScales.y(d.length)"
          :data="d.value"
        />
        <text>{{ `${names[variable]}` }}</text>
        <g v-axis:x="computedScales" :transform="`translate(0,${height - margin.bottom})`" />
        <g v-axis:y="computedScales" :transform="`translate(0,0)`" />

        <text
          class="yearLabel"
          :fill="color"
          :transform="`translate(5, ${height + 5})`"
        >{{ labels[variable] }}</text>
        <text
          class="yearLabel"
          :fill="color"
          :transform="`translate(5, ${25})`"
        >{{ 'Кількість лікарів' }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import wrapper from "vue-svg-textwrap";
import tooltip from "vue-simple-tooltip";


export default {
  name: "vue-hist-chart",
  props: {
    temp: Array,
    variable: String,
    oblast: String,
    toDraw: Boolean
  },
  data() {
    return {
      color: '##184a77',
      svgWidth: '',
      toDrawT: true,
      hover: false,
      svgHeigh: 500,
      tempData: JSON.parse(JSON.stringify(this.temp)),
      names: {
        decl_count: "Кількість декларацій на одного лікаря",
        money_per_month: "Виплати одному лікарю в місяць"
      },
      labels: {
        decl_count: "Кількість пацієнтів на одного лікаря",
        money_per_month: "Виплати кожному лікарю, грн. в місяць"
      },
      tempVar: this.temp,
      margin: {
        top: 50,
        right: 10,
        bottom: 50,
        left: 50
      },
      svgParameters: {
        width: 0,
        height: 300
      }
    };
  },
  watch: {
    /*     toDraw: function(oldValue){
    var amount = this.tempData.length;
	
    for(var i = 0; i < amount; i++)
    {
        var element = this.tempData[i];
        TweenLite.to(element, 3, {money_per_month: this.temp[i]['money_per_month'],
         decl_count: this.temp[i]['decl_count']});
    }

    } */
  },
  computed: {
    data: function() {
      const that = this
      var data = this.tempData.map(function(d) {
        return +d[that.variable];
      });
      return data;
    },
    width: function() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height: function() {
      return this.svgHeigh - this.margin.top - this.margin.bottom;
    },
    computedScales: function() {
      let x = d3
        .scaleLinear()
        .domain(d3.extent(this.data))
        .nice()
        .range([0, this.svgWidth - this.margin.left - this.margin.right]);

      let bins = d3
        .histogram()
        .domain(x.domain())
        .thresholds(x.ticks(40))(this.data);

      let y = d3
        .scaleLinear()
        .domain([100, d3.max(bins, d => d.length)])
        .nice()
        .range([this.height - this.margin.bottom, this.margin.top]);

      return { x, y, bins };
    }
  },
  directives: {
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];

      const axisFinal = d3[axisMethod](methodArg);

      d3.select(el).call(axisFinal.ticks(4));
    },
    tooltip
  },
  mounted() {
    /* let amount = this.tempData.length;

    for(var i = 0; i < amount; i++)
    {
        var element = this.tempData[i];
        TweenLite.to(element, 0.1, {money_per_month: 0, decl_count: 0});
    }  */
  this.getSvgWidth();

  /* *Женя: додала, щоб визначав брав ширину потрібного контейнера на завантаження сторінки і на ресайз, тепер, коли перезавантажуєш, 
  ок з шириною, а коли по кліку відкривається, то ділить ширину. Шукай, звідки воно тягну ту ширину, бо я не змогла знайти */
  this.$nextTick(function() {   
              window.addEventListener("load", this.getSvgWidth);      
              window.addEventListener("resize", this.getSvgWidth);
    })  
  },
  methods: {
    getSvgWidth: function() { // *Женя: перенесла до methods і запакувала у функцію, бо в mounted воно не рахувало
      // *Женя: намагалась спіймати тут ширину div, який э child для .finalBars, воно ловить, але чомусь ділить цю ширину навіл, не знайшла, де це відбувається
      var svgBcr = document.querySelector("#barchartContainer").getBoundingClientRect();
      console.log(svgBcr)
      this.svgWidth = svgBcr.width ;
     
    },
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },
    formatNumber() {
      let format = d3.format(",");
      return { format };
    }
  },
};
</script>

<style lang="sass" scoped>

$blue: #184a77;


svg
  display: block  
  margin-right: 0
  width: auto

path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px

rect.bar
  fill: $blue

rect.bar:hover
  fill: #ff61ef


text.yearLabel
  font-size: 9px
</style>