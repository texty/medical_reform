<template>
  <div> 
    <svg :width="svgWidth" :height="svgHeigh">
      <g :transform="`translate(${ margin.left },${margin.top})`">
        <rect
          :class="'bar'"
          @mouseover.native="hover = true"
          @mouseleave.native="hover = false"
          v-for="(d,i) in dataShort"
          v-bind:key="i"        
          v-tooltip:right="variable == 'decl_count' 
          ? formatNumber().format(d.len) + ' лікарів мають від ' + formatNumber().format(d.x0)  + ' до ' + formatNumber().format(d.x1) + ' декларацій' 
          : formatNumber().format(d.len )+ ' лікарів приносять лікарні дохід  від ' + formatNumber().format(d.x0)  + ' до ' + formatNumber().format(d.x1) +' грн'"
          :x="computedScales.x(d.x0)"
          :width="Math.max(0, computedScales.x(d.x1) - computedScales.x(d.x0) - 1)"
          :y="computedScales.y(d.len)"
          :height="computedScales.y(1) - computedScales.y(d.len)"
          :data="d.value"
        />
        
        <g v-axis:x="computedScales" :transform="`translate(0,${height - margin.bottom})`" />
        <g v-axis:y="computedScales" :transform="`translate(0,0)`" />

<!--         <text
          class="yearLabel"
          :fill="color"
          :transform="`translate(5, ${height + 5})`"
        >{{ labels[variable] }}</text>
        <text
          class="yearLabel"
          :fill="color"
          :transform="`translate(-40, ${15})`"
        >{{ 'К-ть' }}</text>
        <text
          class="yearLabel"
          :fill="color"
          :transform="`translate(-40, ${30})`"
        >{{ 'лікарів' }}</text> -->
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
    toDraw: Boolean,
    dataShort: Array
  },
  data() {
    return {
      color: '##184a77',
      svgWidth: '',
      toDrawT: true,
      hover: false,
      svgHeigh: 450,
      tempData: JSON.parse(JSON.stringify(this.temp)),
      names: {
        decl_count: "Кількість декларацій на лікаря",
        money_per_month: "Виплати на лікаря в місяць"
      },
      labels: {
        decl_count: "Кількість пацієнтів на одного лікаря",
        money_per_month: "Отримує лікарня/ФОП за пацієнтів одного лікаря, грн/міс."
      },
      tempVar: this.temp,
      margin: {
        top: 50,
        right: 10,
        bottom: 15,
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
        .domain([this.dataShort[0].x0, this.dataShort[this.dataShort.length - 1].x0])
        .nice()
        .range([0, this.svgWidth - this.margin.left - this.margin.right]);

/*       let bins = d3
        .histogram()
        .domain(x.domain())
        .thresholds(x.ticks(40))(this.data); */

      let y = d3
        .scaleLinear()
        .domain([100, d3.max(this.dataShort, d => d.len)])
        .nice()
        .range([this.height - this.margin.bottom, this.margin.top]);

      return { x, y, /* bins */ };
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
    if(window.innerWidth > 800){
      this.getSvgWidthDesk();
      this.$nextTick(function() {   
              window.addEventListener("load", this.getSvgWidthDesk);      
              window.addEventListener("resize", this.getSvgWidthDesk);
    })  

    } else {
      this.getSvgWidthMob();
      this.$nextTick(function() {   
              window.addEventListener("load", this.getSvgWidthMob);      
              window.addEventListener("resize", this.getSvgWidthMob);
    })  

    }
  

  /* *Женя: додала, щоб визначав брав ширину потрібного контейнера на завантаження сторінки і на ресайз, тепер, коли перезавантажуєш, 
  ок з шириною, а коли по кліку відкривається, то ділить ширину. Шукай, звідки воно тягну ту ширину, бо я не змогла знайти */

  },
  methods: {
    getSvgWidthDesk: function() { // *Женя: перенесла до methods і запакувала у функцію, бо в mounted воно не рахувало
      var headerBounding = document.querySelector("#headerBounding").getBoundingClientRect();
      //var svgBcr = document.querySelector("#barchartContainer").getBoundingClientRect();      
      this.svgWidth = (headerBounding.width / 2) ;     
    },
    getSvgWidthMob: function() { // *Женя: перенесла до methods і запакувала у функцію, бо в mounted воно не рахувало
      var headerBounding = document.querySelector("#headerBounding").getBoundingClientRect();
      //var svgBcr = document.querySelector("#barchartContainer").getBoundingClientRect();      
      this.svgWidth = headerBounding.width ;     
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
  font-size: 13px
</style>