<template>
<div>
  <Navigation></Navigation>
  <div class="description"  :style="{ 'margin-left': leftHeaderMargin, 'margin-bottom': '50px','width': leftHeaderWidth }">
    <h4 class="subtitle">Лікарні вкладають гроші у свій розвиток</h4>
    <p class="text">Ми перевірили, що купували медичні заклади до реформи та після неї — й побачили, що лікарні почали купувати більше комп’ютерних систем, медичного обладнання, а також меблів, протипожежних систем і кондиціонерів. Найбільше зросли витрати на комп’ютерні системи. Національна Служба Здоров’я України та Міністерство Охорони Здоров’я вимагають від лікарень перевести в електронну форму всю адміністративну роботу. А отже, їм потрібно купувати обладнання і програми. Завдяки реформі паперові картки й талони відійдуть у минуле. І ми можемо побачити, що цей процес вже почався. На графіці ми порівнюємо дані зразу перед початком реформи у 2017, з аналогічним періодом у 2019 році.
</p>   

<div class="parallelPlotOblast" :style="{ 'width': leftHeaderWidth }">
      <p>
        Графіка інтерактивна, ви можете обирати область зі списку
      </p>
      <multiselect
        :hide-selected="true"
        deselect-label
        placeholder="Виберіть область"
        select-label
        :allow-empty="false"
        v-model="selectetOblast"
        :options="oblastNames"
      ></multiselect>
    </div>
  </div>
  
  <div class="procurements step chart" :style="{  }">
   <!--  <h4 :style="{ 'color': color, 'max-width': '90%' }">
      <b>Порівняння закупівель лікарень за 2017-2019 роки, грн</b>
    </h4> -->

    

    <div class="parallelPlot" id="parallelPlotContainer" :style="{ 'margin-left': paralelPlotMargin }">
      <ParallelPlot
        class="line"
        v-for="(d,i) in selectedProcurement"
        v-bind:key="i"
        :name="d.key"
        :inputData="d.values"
        :svgParameters="{width: '100%',height: '100%'}"
        :selectedOblast="selectetOblast"
      />
    </div>
  </div>
  <Footer></Footer>
</div>
</template>

<script>
import ParallelPlot from "@/components/ParallelPlot.vue";
import Multiselect from "vue-multiselect";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";


import procuramentPivot from "@/assets/procurements_pivot_with_regions_update.json";

export default {
  props: {
    incomingOblast: String
  },
  data() {
    return {
      color: '#184a77',
      leftHeaderMargin: '', // *Женя: додала зміну
      leftHeaderWidth: '', // *Женя: додала зміну  
      paralelPlotMargin: '',   
      loadProcurementPivot: procuramentPivot,
      selectetOblast: "",
      oblastNames: [
        "Київська",
        "Чернівецька",
        "Донецька",
        "Тернопільська",
        "Волинська",
        "Харківська",
        "Вінницька",
        "Сумська",
        "Івано-Франківська",
        "Чернігівська",
        "Луганська",
        "Полтавська",
        "Миколаївська",
        "Житомирська",
        "Хмельницька",
        "Черкаська",
        "Херсонська",
        "Львівська",
        "Запорізька",
        "Закарпатська",
        "Дніпропетровська",
        "Рівненська",
        "Кіровоградська",
        "Одеська"
      ]
    };
  },
  computed: {
    nestedProcurement: function() {
      let nest = d3
        .nest()
        .key(d => d.item_id_short)
        .key(d => d.division_area)
        .rollup(function(leaves) {
          return {
            2017: d3.sum(leaves, function(d) {
              return d[2017];
            }),
            2019: d3.sum(leaves, function(d) {
              return d[2019];
            })
          };
        })
        .entries(this.loadProcurementPivot.filter(d => d.division_area != null));

      return nest;
    },
    selectedProcurement: function() {
      let selectedOblast = this.selectedOblast;
      let data = this.nestedProcurement.filter(function(d) {
        return d.values.length > 10;
      });
      // return data

      let selectedData = data.filter(function(d) {
        return [
          "type:48",
          "type:51",
          "type:45",
          "type:35",
          "type:38",
          ,
          /* 'type:70' */ "type:42",
          "type:39",
          "type:30"
        ].includes(d.key);

        return d.key;
      });

      /* let selectedProcurementType = selectedOblastData.values.filter(function(d) {
          return  selectedProcurementTypes.includes(d.key)
      }); */

      return selectedData;
    }
  },
  mounted() {
    d3.json('"@/assets/procurements_pivot_with_regions.json"')
    .then(function(data, error) {
      console.log(data)
    })

    this.getPos()
    this.calculateMargin()
    this.$nextTick(function() {  // *Женя: щоб перемальовувалась на ресайзі     
        window.addEventListener("resize", this.getPos);
        window.addEventListener("load", this.getPos);
        window.addEventListener("resize", this.calculateMargin);
        window.addEventListener("load", this.calculateMargin);
    })

      this.selectetOblast = this.incomingOblast
      this.calculateMargin()
  },
  watch: {
    incomingOblast: function(newProp, oldProp) {
      this.selectetOblast = newProp
    },
  },
  components: {
    ParallelPlot,
    Multiselect,
    Navigation,
    Footer
  }, 
  methods: {
    getPos: function() { //*Женя: додала фунцію
         var that = this;
         var headerBounding = document.querySelector('#headerBounding').getBoundingClientRect();
         var left = headerBounding.left
         var width = headerBounding.width 
         that.leftHeaderMargin = left  + 33 + "px";
         that.leftHeaderWidth = width - 33 + 'px';     
    }, 
    calculateMargin: function() {
      var that = this;
      var paralelplotChild = document.querySelector('.line').getBoundingClientRect();
      var onewidth = paralelplotChild.width + 10
      var divAmounts = Math.floor(window.innerWidth / onewidth)       
      console.log(divAmounts)
      console.log(onewidth)
      var theMargin = (window.innerWidth - (onewidth * divAmounts)) / 2
      console.log(theMargin + "px")
      that.paralelPlotMargin =  theMargin + "px"
    }
  }
};
</script>