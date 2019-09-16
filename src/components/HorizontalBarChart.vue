<template v-model="usersOblast">
<div>
  <Navigation></Navigation>
  <div class="description"  :style="{ 'margin-left': leftHeaderMargin, 'margin-bottom': '50px','width': leftHeaderWidth }">
    <h4 class="subtitle">Кількість підписаних декларацій</h4>
    <p class="text">Більшість людей підписали декларацію зі своїм сімейним лікарем. Ми розрахували відсоток людей від населення районів і міст України, які підписали декларації у лікарнях на своїй території проживання. Середній показник тих, хто підписав декларації, становить близько 70% по країні. Найменша кількість підписаних декларацій — на півдні країни, в середньому — 65%. На графіку нижче ви можете вибрати область і досліджувати статистику по регіонах самостійно.
</p>   
    <p class="text">Більшість людей звертається по допомогу до комунальних лікарень. Таких закладів найбільше, вони мають відділення навіть у невеликих селах. Але також люди підписують декларації з лікарями-ФОП і приватними лікарнями. Тож ми також проаналізували, скільки пацієнтів підписали декларації з лікарем у приватних клініках і в комунальних медзакладах.
</p> 
    <p class="text">На одного лікаря в приватних клініках припадає в середньому п’ятсот пацієнтів, тоді як у комунальних — більше тисячі. Це може мати  кілька пояснень. Перше: люди частіше звертаються в ті лікарні, в які звикли ходити до реформи. Друге: в приватних медзакладах лікарі менше залежать від грошей НСЗУ, бо паралельно надають платні послуги.
</p> 
  </div>

  <div class="horizontalPlot" :style="{ 'margin-left': leftHeaderMargin, 'width': leftHeaderWidth }">
    
    <article></article>
    <div class="selectorOblast">      
      <div class="oblast">
        <p>Оберіть область:</p>
        <multiselect
          :hide-selected="true"
          placeholder="Виберіть область"
          deselect-label
          select-label
          :allow-empty="false"
          v-model="oblast"
          :options="oblast_names"
        ></multiselect>
      </div>
    </div>

     <div class="plot" >
      <svg
        :width="svgParameters.width"
        :height="svgParameters.height"
        ref="transition"
        trigger="none"
      >
        <g :transform="`translate(${ margin.left },${margin.top})`">
          <rect
            v-for="(d,i) in staticData"
            v-bind:key="i"
            x="0"
            :y="getScales().y(d.rajon_grouped) + 5"
            :height="heightOfbar/2"
            :width="drawIfTrue(getScales().x(+d[variable]))"
            :fill="color"
            :class="{ active: hover === i }"
          />
          <!-- :fill="i == data.length-1 ? '#ff61ef'  : color" -->
          <text
            v-for="(d,i) in staticData"
            v-bind:key="i+'c'"
            :x="getScales().x(+d[variable]) + 10"
            :y="getScales().y(d.rajon_grouped) + 10"
            :width="1"
            :style="{
              'font-size': '0.9em',
              fill: color
            }"
          >{{ Math.round(d[variable]) + '%' }}</text>

          <text
            v-for="(d,i) in staticData"
            v-bind:key="i+'a'"
            :x="0"
            :y="getScales().y(d.rajon_grouped) - 0"
            :style="{
              'font-size': '0.85em',
            }"
          >{{ d.rajon_grouped }}</text>

          <circle
            v-for="(d,i) in staticData"
            v-bind:key="i+'b'"
            :cx="getScales().x(+d[variable])"
            :cy="getScales().y(d.rajon_grouped) + 7"
            :r="6"
            :fill="color"
          />
          <!-- :fill="i + 'b' == data.length-1 + 'b' ? '#ff61ef'  : color" -->

        </g>
      </svg>
    </div> 
  </div>
  <Footer></Footer>
</div>
</template>

<script>
import * as d3 from "d3";
import Multiselect from "vue-multiselect";
import { TweenLite } from "gsap";
import { selectAll } from "d3-selection";
/*import { transition } from "d3-transition";*/

import horizontalData from "@/assets/rajon_stats_new.json";

import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";



export default {
  name: "vue-bar-chart",
  props: {
    temp: Array,
    variable: String,
    toDraw: Boolean,
    oblastProp: String
  },
  data() {
    return {
      leftHeaderMargin: '', // *Женя: додала зміну
      leftHeaderWidth: '', // *Женя: додала зміну     
      color: '#184a77',
      oblast: "",
      hover: false,
      heightOfbar: 5,
      checker: false,
      tempData: horizontalData,
      staticData: [{ rajon_grouped: "", declarations_ratio: 0 }],
      mountedWidth: 0,
      margin: {
        top: 20,
        right: 70,
        bottom: 25,
        left: 0
      }
    };
  },
  components: {
    Multiselect,
    Navigation, 
    Footer
  },
  watch: {
    toDraw: function (oldValue) {
      //var amount = this.tempData.length;

      // this.oblast = this.$attrs.usersOblast == 'Київ' ? "Київська" :  this.$attrs.usersOblast

      // this.oblast = this.oblastProp
      // TweenLite.to(this.staticData, 3, this.data);

      /* for (var i = 0; i < amount; i++) {
        var element = this.tempData[i];
        TweenLite.to(element, 3, {
          declarations_ratio: this.temp[i]["declarations_ratio"]
        });
      } */
    },
    oblastProp: function(newProp, oldProp) {
      this.oblast = newProp
    },
    oblast: function(newValue, oldValue) {
      function everythingToZero(data) {
        for (var i = 0; i < data.length; i++) {
          var element = data[i];
          TweenLite.to(element, 3, { declarations_ratio: 0 });
        }
        //console.log("everythingToZero +");
      }

      function renewData(newData) {
        let temp = [];
        for (var i = 0; i < newData.length; i++) {
          temp.push({ rajon_grouped: "", declarations_ratio: 0 });
        }
        return temp;
      }

      function everythingToNewValue(dataToChang, newData) {
        for (var i = 0; i < dataToChang.length; i++) {
          var element = dataToChang[i];
          TweenLite.to(element, 3, {
            declarations_ratio: newData[i]["declarations_ratio"],
            rajon_grouped: newData[i]["rajon_grouped"]
          });
        }

        //console.log("everythingToNewValue +");
      }

      everythingToZero(this.staticData);
      this.staticData = renewData(this.data);
      everythingToNewValue(this.staticData, this.data);
    }
  },
  computed: {
    data: function() {
      var oblast = this.oblast;
      var variable = this.variable;
      return this.tempData
        .filter(function(d) {
          return d.oblast == oblast;
        })
        .sort(function(a, b) {
          return a[variable] - b[variable];
        });
    },
    drawData: function() {
      let data = this.data;
      let getScales = this.getScales();
      let variable = this.variable;

      let out = this.data.map(d => {
        return {
          height: getScales.y(d.rajon_grouped),
          width: getScales.x(d[variable])
        };
      });

      return out;
    },
    oblast_names: function() {
      return [...new Set(this.tempData.map(d => d.oblast))];
    },
    svgParameters: function() {
      return {
           width: this.mountedWidth - 60,
           height: 35 * this.data.length
      };
    },
    width: function() {
      return (
        this.svgParameters.width  - this.margin.left - this.margin.right
      );
    },
    height: function() {
      return this.svgParameters.height - this.margin.top - this.margin.bottom;
    },
    heightBar: function() {
      return this.height / this.data.length;
    }
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
  created() {},
  mounted() {
    this.getPos();
    this.$nextTick(function() {
      window.addEventListener("resize", this.getPos);
      window.addEventListener("load", this.getPos);
    });
    /* this.oblast = "Львівська"; */
    /* this.staticData = this.data */

    /* 
    function renewData(newData) {
        let temp = [];
        for (var i = 0; i < newData.length; i++) {
          temp.push({ rajon_grouped: "", declarations_ratio: 0 });
        }
        return temp;
      } */

    /* this.staticData = renewData(this.data) */

    const svgBcr = document
      .querySelector("div#headerBounding")
      .getBoundingClientRect();
    this.mountedWidth = svgBcr.width;

    this.oblast = this.oblastProp
    TweenLite.to(this.staticData, 3, this.data);

    /*   TweenLite.to(this.staticData, 1, {'declarations_ratio': 0})
    TweenLite.killTweensOf(this.staticData) */

    /* let amount = this.tempData.length;

  /*   for (var i = 0; i < amount; i++) {
      var element = this.tempData[i];
      TweenLite.to(element, 0.1, { declarations_ratio: 0 });
    } */
  },
  methods: {
     getPos: function() {
      var that = this;
      var headerBounding = document.querySelector("#headerBounding").getBoundingClientRect();
      var left = headerBounding.left;
      var width = headerBounding.width ;
      that.leftHeaderMargin = left + 33  + "px";
      that.leftHeaderWidth = width - 50 + "px";
    },
    AnimateLoad() {
      let checker = this.checker;

      let a = selectAll("rect")
        .data(this.data)
        .transition()
        /*  .delay((d, i) => {
          return i * 150;
        }) */
        .duration(1000)
        .attr("y", d => {
          return this.getScales().y(d.rajon_grouped) + 5;
        })
        .attr("width", d => {
          return this.getScales().x(+d[this.variable]);
        })
        .on("end", d => {
          checker = true;
        });

      //console.log("yesss");

      return a;
    },
    getScales() {
      var variable = this.variable;
      let y = d3
        .scaleBand()
        .domain(
          this.data.map(function(d) {
            return d.rajon_grouped;
          })
        )
        .rangeRound([this.height, 0])
        .paddingInner(0.5);

      let x = d3
        .scaleLinear()
        .domain([0, 120])
        .range([1, this.width]);

      return { x, y };
    },
    drawIfTrue(x) {
      if (true) {
        /* TweenLite.to(this.$data, 7, {heightOfbar: 70}) */
        /* d3.selectAll('rect').transition(); */
        return x;
      } else {
        return 0;
      }
    }
    /*  experiment: function () {
       return 1 + 2
    } */
  }
};
</script>

<style lang="sass" scoped>

/* div.holder
  width: 75%
  margin: 0 auto */

div.selectorOblast div
  display: flex

div.plot
  padding-top: 1.5em
  padding-bottom: 1.5em

div.multiselect
  margin: 0px 25px
  width: auto

svg
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