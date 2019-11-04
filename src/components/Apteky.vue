


<template v-model="usersOblast">
  <div class="roseElements">
    <Navigation></Navigation>

    <!-- <p> {{ oblast.map(d => d.division_area) }} </p> -->
    <div
      class="description"
      :style="{ 'margin-left': leftHeaderMargin, 'margin-bottom': '50px','width': leftHeaderWidth }"
    >
      <h4 class="subtitle">Кількість підписаних декларацій</h4>
      <p
        class="text"
      >
      В Україні стартувала програма повернення вартості ліків (реімбурсації). Це означає, що громадяни можуть отримувати деякі ліки в аптеці безоплатно. Замість них аптеці платитиме Національна Служба Здоров’я, що фінансується за рахунок податків. Ліки за цією програмою можна отримати тільки за рецептом сімейного лікаря з яким людина підписала декларацію. </p>
      <p
        class="text"
      >
        Зараз в Україні близько 6 тисяч відділень лікарень та кабінетів сімейних лікарів, що включилися до реформи. В програмі реімбурсації бере участь також 7 тисяч аптек по всій країні. Однак, доступність аптек різна. У великих містах працюють десятки різних мереж, а в деяких мережах немає жодної.</p>
      <p
        class="text"
      >
        На цій візуалізації ми показали скільки аптек є в радіусі 7 кілометрів від кожного лікарняного пункту з пацієнтами. А також інформацію про те, що це за аптеки, де вони знаходяться та скільки компенсації отримали за ті ліки, які вони надали за рецептом лікаря. Ця візуалізація допоможе пацієнту знайти аптеку, що працює за програмою реімбурсації </p>
          <p
        class="text"
      >
      Також, вона дозволить зробити прозорими рекомендації лікарів. Медичні послуги все, ще сфера з високими корупційними ризиками. Лікарі можуть рекомендувати купувати певні ліки або звертатися в певні аптеки не лише піклуючись не тому, що вони будуть найкраще підходити пацієнтам. А тому, що вони отримують від цього вигоду у вигляді неформальних платежів від представників аптечних мереж і виробників ліків. Прозорість рішень лікарів дозволить подолати цю проблему. </p>

    </div>

    <!-- <p> {{ filtered.division_id }} </p> -->

    <div class="rosePlot">
      <!-- :style="{ 'margin-left': leftHeaderMargin, 'width': leftHeaderWidth }" -->

      <!-- <article></article> -->

      <div class="filters">
        <h5>Фільтри:</h5>
        <input placeholder="область" v-model="filters.oblast" />
        <input placeholder="район" v-model="filters.rajon" />
        <input placeholder="місто" v-model="filters.city" />
        <input placeholder="лікарня" v-model="filters.hospital" />
        <input placeholder="адреса" v-model="filters.adress" />

        <p class="comment"> <i>{{`За пошуком знайдено ${filtered.length} лікарень. На графіку зображено перші 10.`  }}</i> </p>

        <div class="details" v-if="selectedHospital">
          <div class="hospitalDetails">
            <!-- <p>{{ selectedHospital.legal_entity_name }}</p> -->
            <p> <b>Назва лікарні: </b> {{selectedHospital.division_name }}</p>
            <p><b>Адреса: </b>{{selectedHospital.division_residence_addresses }}</p>
            <p><b>Кількість пацієнтів: </b>{{selectedHospital.division_decl_sum }}</p>
            <p><b>Кількість аптек довкола: </b>{{ selectedHospital.pharmas.length }}</p>
          </div>


          <div class="aptekyDetails">
            <div :class="selectedApteka == d.division_id ? 'aptekyList selected' : 'aptekyList'" v-for="(d, i) in selectedHospital.aptekaObjects" v-bind:key="i" 
            @mouseover="mouseOver(d)" >
              <p>{{ (i + 1) + ". " + d.division_name }}</p>
              <p>{{ "Відстань: in progress" }}</p>
              <p>{{ "Повернуто коштів: in progress" }}</p>
            </div>
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

        <!-- <p          v-for="(d, i) in filtered.slice(0, 10)"
          v-bind:key="i"> {{
            d.division_name
          }}</p> -->

        <Rose
          v-on:clicked="pathDataFromRose"
          class="rose-chart"
          v-for="(d, i) in filtered.slice(0, 10)"
          v-bind:key="i"
          
          :selected="selectedApteka"
          :selectedHospital="selectedHospitalID"
          :roseWidth="200"
          :roseHeight="200"
          :hospital="d"
        />

        <!--           <paginate
          v-model="page"
          :page-count="20"
          :page-range="3"
          :margin-pages="2"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'">
        </paginate>-->

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
import Paginate from "vuejs-paginate";
import tooltip from "vue-simple-tooltip";


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
      page: null,
      selectedHospital: null,
      selectedHospitalID: null,
      selectedApteka: null,
      filters: {
        oblast: "Київська",
        city: "",
        adress: "",
        rajon: "",
        hospital: ""
      }
      /* cityNames: [],
      adressNames: [],
      rajonNames: [],
      oblastNames: [],
      hospitalNames: [] */
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

        return filtered; /* .length > 0
           ? filtered
           : [
               Object.keys(that.names[0]).reduce(function(obj, value) {
                 obj[value] = "";
                 return obj;
               }, {})
             ]; */
      }
    } /* 
    oblast() {
      return this.filterOut(this.network, this.filters.oblast, "division_area")
    },
    oblastNames() {
      if (!this.network) {
        return []
      }
      else {
        return [...new Set(this.network.map(d => d.division_area))]
      }
    },
   rajon() {
      return this.filterOut(this.oblast, this.filters.rajon, "division_region")
    },
    rajonNames() {
      if (!this.oblast) {
        return []
      }
      else {
        return [...new Set(this.oblast.map(d => d.division_region))]
      }
    }, 
    city() {
      const that = this
      if (!that.rajon) {
        return [];
      } else {
      const that = this
      return that.rajon.filter(item => {
        return item.division_settlement == that.filters.city
      })
      }
    },
    hospital() {
      const that = this
      if (!that.city) {
        return [];
      } else {
      const that = this
      return that.city.filter(item => {
        return item.legal_entity_name == that.filters.hospital
      })
      }
    },
    adress() {
      const that = this
      if (!that.hospital) {
        return [];
      } else {
      const that = this
      return that.hospital.filter(item => {
        return item.division_residence_addresses == that.filters.adress
      })
      }
    }, */
  },
  components: {
    Multiselect,
    Navigation,
    Footer,
    Rose,
    Legend,
    Paginate,
    tooltip
  },
  watch: {},
  directives: {},
  methods: {
    mouseOver(value) {
      this.selectedApteka = value.division_id
    },
    pathDataFromRose(value) {
      this.selectedHospital = value;
      this.selectedHospitalID = value.division_name
    },
    filterOut(previous, model, nameOfVariabe) {
      const that = this;
      if (!previous) {
        return [];
      } else {
        return previous.filter(item => {
          const s = (item[nameOfVariabe]
            ? item[nameOfVariabe]
            : ""
          ).toUpperCase();
          return s !== "" ? s.includes(model.toUpperCase()) : s;
        });
      }
    },
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

    that.network = files[1].map(d => {
      return {
        ...d,
        ...{
          aptekaObjects: d.pharmas.map(dd => {
            return that.aptekyNested.get(dd)[0];
          })
        }
      };
    }); //.slice(0, 100);

    // that.oblastNames = [
    //   ...new Set(
    //     that.network.map(d => {
    //       return d.division_area;
    //     })
    //   )
    // ];
    // that.cityNames = [
    //   ...new Set(
    //     that.network.map(d => {
    //       return d.division_settlement;
    //     })
    //   )
    // ];
    // that.rajonNames = [
    //   ...new Set(
    //     that.network.map(d => {
    //       return d.division_region;
    //     })
    //   )
    // ];
    // that.adressNames = [
    //   ...new Set(
    //     that.network.map(d => {
    //       return d.division_residence_addresses;
    //     })
    //   )
    // ];
    // that.hospitalNames = [
    //   ...new Set(
    //     that.network.map(d => {
    //       return d.legal_entity_name;
    //     })
    //   )
    // ];
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

p.comment {
  margin: 10px 25px;
  font-size: 0.8em;
  width: 60%;
}

.rose-chart {
  width: 250px;
  height: 250px;
  cursor: pointer;
}
div.plotRose {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
}

div.rosePlot {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
}

div.roseElements input {
  border: 1px solid rgb(178, 178, 178);
  margin: 10px 25px;
  width: auto;
  width: 70%;
  height: 2rem;
  text-align: left;
  padding-left: 20px;
}



div.filters h5 {
  margin: 10px 25px;
}

div.details {
    width: 80%;

  div.hospitalDetails {
    border-top: 0.8px solid grey;
    margin: 10px 25px;
    font-size: 0.8em;
    
    p {
      margin: 0.2em;
    }

}



div.aptekyDetails {
  border-top: 0.8px solid grey;
  margin: 10px 25px;
  padding-top: 10px;
  font-size: 0.8em;
  height: 215px;
  overflow:hidden; 
  overflow-y:scroll;

  p {
    margin: 0.2em;
  }

  div.aptekyList {
    margin-bottom: 1em; 
    cursor: pointer;
  }

  div.aptekyList.selected {
    background-color: #184a77;
     color:white;
    }
}
}

</style>



<style lang="sass" scoped>

rose-chart
  width: 200px
  cursor: pointer;

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