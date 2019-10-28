


<template v-model="usersOblast">
  <div>
    <Navigation></Navigation>
    <div
      class="description"
      :style="{ 'margin-left': leftHeaderMargin, 'margin-bottom': '50px','width': leftHeaderWidth }"
    >
      <h4 class="subtitle">Кількість підписаних декларацій</h4>
      <p
        class="text"
      >Більшість людей підписали декларацію зі своїм сімейним лікарем. Ми розрахували відсоток людей від населення районів і міст України, які підписали декларації у лікарнях на своїй території проживання. Середній показник тих, хто підписав декларації, становить близько 70% по країні. Найменша кількість підписаних декларацій — на півдні країни, в середньому — 65%. На графіку нижче ви можете вибрати область і досліджувати статистику по регіонах самостійно.</p>
      <p
        class="text"
      >Більшість людей звертається по допомогу до комунальних лікарень. Таких закладів найбільше, вони мають відділення навіть у невеликих селах. Але також люди підписують декларації з лікарями-ФОП і приватними лікарнями. Тож ми також проаналізували, скільки пацієнтів підписали декларації з лікарем у приватних клініках і в комунальних медзакладах.</p>
      <p
        class="text"
      >На одного лікаря в приватних клініках припадає в середньому п’ятсот пацієнтів, тоді як у комунальних — більше тисячі. Це може мати кілька пояснень. Перше: люди частіше звертаються в ті лікарні, в які звикли ходити до реформи. Друге: в приватних медзакладах лікарі менше залежать від грошей НСЗУ, бо паралельно надають платні послуги.</p>
    </div>

    <!-- <p> {{ filtered.division_id }} </p> -->

    <div class="rosePlot">
      <!-- :style="{ 'margin-left': leftHeaderMargin, 'width': leftHeaderWidth }" -->

      <!-- <article></article> -->

      <div class="filters">
        <div class="selectorOblast">
          <p>Виберіть:</p>
          <div class="oblast">
            <multiselect
              :hide-selected="true"
              placeholder="Виберіть область"
              deselect-label
              select-label
              :allow-empty="false"
              v-model="filters.oblast"
              :options="oblastNames"
            ></multiselect>
          </div>
        </div>
        <div class="selectorOblast">
          <div class="oblast">
            <multiselect
              :hide-selected="true"
              placeholder="Виберіть район"
              deselect-label
              select-label
              :allow-empty="false"
              v-model="filters.rajon"
              :options="rajonNames"
            ></multiselect>
          </div>
        </div>
        <div class="selectorOblast">
          <div class="oblast">
            <multiselect
              :hide-selected="true"
              placeholder="Населений пункт"
              deselect-label
              select-label
              :allow-empty="false"
              v-model="filters.city"
              :options="cityNames"
            ></multiselect>
          </div>
        </div>
        <div class="selectorOblast">
          <div class="oblast">
            <multiselect
              :hide-selected="true"
              placeholder="Назва лікарні"
              deselect-label
              select-label
              :allow-empty="false"
              v-model="filters.adress"
              :options="adressNames"
            ></multiselect>
          </div>
        </div>
        <div class="selectorOblast">
          <div class="oblast">
            <!-- <multiselect
              :hide-selected="true"
              placeholder="Адреса"
              deselect-label
              select-label
              :allow-empty="false"
              v-model="filters.hospital"
              :options="hospitalNames"
            ></multiselect> -->
            <input>
          </div>
        </div>
      </div>

      <div class="plotRose">
        <!-- <div> -->
        <!-- <p>Here</p> -->
        <!-- <Legend
          class="rose-legend"  
          :roseWidth="200"
          :roseHeight="200"
          :hospital=""
        />-->

        <Rose
          class="rose-chart"
          v-for="(d, i) in filtered"
          v-bind:key="i"
          :roseWidth="200"
          :roseHeight="200"
          :hospital="d"
        />

        <!--     <p 
    v-for="(d, i) in network.slice(0,1)"
    v-bind:key="i"
    >
      {{ d.aptekaObjects[0] }}
        </p>-->
        <!-- </div> -->
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Rose from "./Rose.vue";
import Legend from "./RoseLegend.vue";

import * as d3 from "d3";
import Multiselect from "vue-multiselect";

import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "vue-bar-chart",
  props: {},
  data() {
    return {
      pmd: null,
      apteka: null,
      network: null,
      aptekyNested: null,
      filters: {
        oblast: "Київська",
        city: "",
        adress: "",
        rajon: "",
        hospital: ""
      },
      cityNames: [],
      adressNames: [],
      rajonNames: [],
      oblastNames: [],
      hospitalNames: []
    };
  },
  computed: {
    filtered() {
      if (!this.network) {
        return [];
      } else {
        let filtered = this.network.filter(item => {
          const that = this;

          var namesOfVar = {
            oblast: "division_area",
            city: "division_settlement",
            adress: "division_residence_addresses",
            rajon: "division_region",
            hospital: "legal_entity_name"
          };

          // debugger;

          var keys = Object.keys(that.filters);
          // keys = keys.filter(e => e !== "sum");
          return keys.every(key => {
            const s = String(item[namesOfVar[key]]).toUpperCase();
            return s !== "" ? s.includes(that.filters[key].toUpperCase()) : s;
          });
        });


        return filtered.length > 0
          ? filtered
          : [
              Object.keys(that.names[0]).reduce(function(obj, value) {
                obj[value] = "";
                return obj;
              }, {})
            ];
      }
    }
  },
  components: {
    Multiselect,
    Navigation,
    Footer,
    Rose,
    Legend
  },
  watch: {},
  directives: {},
  // created() {},
  // mounted() {
  //   this.getPos();
  //   this.$nextTick(function() {
  //     window.addEventListener("resize", this.getPos);
  //     window.addEventListener("load", this.getPos);
  //   });
  // },
  methods: {
    project(lat, lng) {
      var x = (lng + 180) * (this.roseWidth / 360);
      // convert from degrees to radians
      var latRad = (lat * Math.PI) / 180;
      // get y value
      var mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
      var y = this.roseHeight / 2 - (this.roseWidth * mercN) / (2 * Math.PI);

      return x, y;
    },
    getPos: function() {
      var that = this;
      var headerBounding = document
        .querySelector("#headerBounding")
        .getBoundingClientRect();
      var left = headerBounding.left;
      var width = headerBounding.width;
      that.leftHeaderMargin = left + 33 + "px";
      that.leftHeaderWidth = width - 50 + "px";
    }
  },
  async mounted() {
    this.getPos();
    this.$nextTick(function() {
      window.addEventListener("resize", this.getPos);
      window.addEventListener("load", this.getPos);
    });

    const files = await Promise.all([
      // d3.csv("data/pmd_all_contracted_legal_entities.csv"),
      d3.csv("data/pharmacy_all_contracted_legal_entities.csv"),
      d3.json("data/hospitals_and_pharmacies.json")
    ]);

    const that = this;

    that.apteka = files[0];
    /* that.network = files[2]; */

    that.aptekyNested = d3
      .nest()
      .key(function(d) {
        return d.division_id;
      })
      .map(that.apteka);

    that.network = files[1]
      .map(d => {
        return {
          ...d,
          ...{
            aptekaObjects: d.pharmas.map(dd => {
              return that.aptekyNested.get(dd)[0];
            })
          }
        };
      })
      // .slice(0, 10);

    that.oblastNames = [
      ...new Set(
        that.network.map(d => {
          return d.division_area;
        })
      )
    ];
    that.cityNames = [
      ...new Set(
        that.network.map(d => {
          return d.division_settlement;
        })
      )
    ];
    that.rajonNames = [
      ...new Set(
        that.network.map(d => {
          return d.division_region;
        })
      )
    ];
    that.adressNames = [
      ...new Set(
        that.network.map(d => {
          return d.division_residence_addresses;
        })
      )
    ];
    that.hospitalNames = [
      ...new Set(
        that.network.map(d => {
          return d.legal_entity_name;
        })
      )
    ];
  },
  created() {
    // this.getPos();
    // this.$nextTick(function() {
    //   window.addEventListener("resize", this.getPos);
    //   window.addEventListener("load", this.getPos);
    // });

    let that = this;
  }
};
</script>

<style lang="scss">
.rose-chart {
  width: 250px;
  height: 250px;
}
div.plotRose {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
}

div.rosePlot {
  display: grid;
  grid-template-columns: 40vh auto;
}
</style>



<style lang="sass" scoped>

rose-chart
  width: 200px

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