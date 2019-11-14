<template  v-model="oblastModel" >
  <div>
    <Navigation></Navigation>
    <div
      class="description"
      :style="{ 'margin-left': leftHeaderMargin, 'margin-bottom': '50px','width': leftHeaderWidth }"
    >
      <h4 class="subtitle">Таблиця аптек-учасників програми "Доступні ліки"</h4>
      <p
        class="text"
      >Ми розробили інструмент, який дозволить кожному українцю знайти найближчу аптеку, що працює за програмою “Доступні ліки”. Програма передбачає, що пацієнт, який уклав декларацію з сімейним лікарем, може за його рецептом отримувати ліки, частково або повністю оплачені державою. Вартість ліків оплачується Національною службою здоров’я України коштом платників податків.
</p>
      <p
        class="text" >
Не в кожному населеному пункті є така аптека — наприклад, якщо йдеться про маленькі населені пункти. Інструмент дозволить користувачу знайти відповідний аптечний заклад у розташованих поблизу містах або селах. 
</p>
      <p
        class="text" >
У великих містах ситуація буває протилежною. Навколо лікарні може бути багато аптек, але далеко не кожна з них долучена до програми “Доступні ліки”. Наш інструмент дозволить користувачу швидко знайти потрібну аптеку — для цього потрібен лише доступ до інтернету.
</p>

      <p
        class="text" >
В таблиці нижче вам потрібно почати вводити назву населеного пункту чи регіону, який вас цікавить. Інші фільтри — назви аптек, а також вулиці, на яких вони розташовані. Таблиця автоматично оновлюється і підкаже вам найбільш відповідні варіанти. Також ви можете скористатись інтерактивною картою нижче, якщо хочете отримати детальнішу інформацію про аптеки.
</p>

      <!-- <p class="text">Інструмент розроблено на основі даних НСЗУ та системи публічних закупівель Prozorro, а саме:</p> -->
      <!-- <p class="text">
        Набори даних Національної Служби Здоров’я, які опубліковані на Єдиному державному веб-порталі відкритих даних; Дані про тендери медичних закладів із системи публічних закупівель Prozorro.
      </p>-->

      <!-- <p> {{ apteky[0] }} </p>   -->
    </div>
    <b-container fluid>
      <!-- User Interface controls -->

      <div class="tableNavigation">
        <b-row class="navigationRow">
          <!-- <b-col md="4" class="my-1">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Пошук"></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Очистити </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>-->

          <b-row>
            <b-col md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-row>
      </div>
      <!-- Main table element -->
      <div class="background">
        <b-table
          class="mainTable procurements"
          show-empty
          stacked="md"
          :items="filtered"
          :fields="fields"
          :busy="isBusy"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          empty-filtered-text="Таких даних у нас немає"
          empty-text="На жаль, ми нічого не знайшли. Спробуйте змінити ваш запит"
          :fixed="true"
        >

      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle spinner"></b-spinner>
        </div>
      </template>

          <template slot="top-row">
            <td
              role="cell"
              data-label="Назва лікарні"
              aria-colindex="1"
              :style="{'border-radius': 0}"
            >
              <div class="inputColumnName">
                <input
                  v-model="filters['division_name']"
                  placeholder="шукати"
                  :style="{'border': `1px solid #b2b2b2`}"
                />
              </div>
            </td>
          </template>
          <!-- 
        <template slot="top-row">
          <td role="cell" data-label="Код ЄДРПОУ" aria-colindex="1">
            <div class="inputColumnName">
              <input v-model="filters['hospital_edrpou']" />
            </div>
          </td>
          </template>-->

          <template slot="top-row">
            <td role="cell" data-label="Опис" aria-colindex="1" :style="{'border-radius': 0}">
              <div class="inputColumnName">
                <input
                  v-model="filters['division_residence_addresses']"
                  placeholder="шукати"
                  :style="{'border': `1px solid #b2b2b2`}"
                />
              </div>
            </td>
          </template>

          <template slot="top-row">
            <td role="cell" data-label="Область" aria-colindex="1" :style="{'border-radius': 0}">
              <div class="inputColumnName">
                <input
                  v-model="filters['division_settlement']"
                  placeholder="шукати"
                  :style="{'border': `1px solid #b2b2b2`}"
                />
              </div>
            </td>
          </template>

          <template slot="top-row">
            <td role="cell" data-label="Область" aria-colindex="1" :style="{'border-radius': 0}">
              <div class="inputColumnName">
                <input
                  v-model="filters['division_area']"
                  placeholder="шукати"
                  :style="{'border': `1px solid #b2b2b2`}"
                />
              </div>
            </td>
          </template>

          <!-- Slider if I'll need to show money -->
          <!-- <template slot="top-row">
            <td role="cell" data-label="	Вартість, грн." aria-colindex="1">
              <div class="inputColumnName">
                <vue-slider
                  v-model="filters['sum']"
                  :min="0"
                  :max="maxSumValue"
                  :enable-cross="false"
                  :tooltip-formatter="formaterTooltip"
                />
              </div>
            </td>
          </template>-->

          <template v-slot:cell(division_name)="data">
            <div
            v-tooltip:top="`<p>Назва мережі: 
              ${data.item.legal_entity_name}</p><p>Грошей компенсовано мережі: 
                ${formatNumber().format(data.item.total_sum)} грн.</p>`"
            > 
            <p class="divisionName">{{ `${data.item.division_name}` }} </p>
            </div>
          </template>


          <template v-slot:cell(division_residence_addresses)="data">
            <div class="textInTable" @click="clickOnAddress(data.item)">
              {{ data.item.division_residence_addresses.split(', ').slice(2).join(', ') }}
            </div>   
            <button 
            @click="centerMapOnSelected(data.item.nszu_geocoding_google_api_lat,
             data.item.nszu_geocoding_google_api_lng)" 
             class="tableButton"
             name="button">КАРТА
             </button>        
          </template>

          <template v-slot:cell(division_settlement)="data">
            <div class="textInTable">
              {{
              capitalizeFirstLetter(data.item.division_settlement.toLowerCase())
            }}
            </div>
          </template>

          <template v-slot:cell(division_area)="data">
            <div class="textInTable">
              {{
                capitalizeFirstLetter(data.item.division_area.toLowerCase())
              }}
            </div>
          </template>

          <!-- <template v-slot:cell(division_region)="data">
            <button 
            @click="centerMapOnSelected(data.item.nszu_geocoding_google_api_lat,
             data.item.nszu_geocoding_google_api_lng)" 
             
             name="button">На карті</button>
          </template> -->

          <template v-slot:cell()="data">{{ data.value }}</template>

          <template slot="actions" slot-scope="row">
            <b-button
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >Info modal</b-button>
            <b-button
              size="sm"
              @click="row.toggleDetails"
            >{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
          </template>

          <template slot="row-details" slot-scope="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
          </template>
        </b-table>
      </div>

      <!-- Info modal -->
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
    </b-container>

    <div
      class="description"
      :style="{ 'margin-left': leftHeaderMargin, 'margin-bottom': '50px','width': leftHeaderWidth }"
    >
      <h4 class="subtitle">Інтерактивна карта лікарень та аптек</h4>
      <p
        class="text"
      >
        Інтерактивна карта показує розташування аптек та лікарень сімейної медицини в Україні. Ви можете скористатися пошуком, щоб швидко перейти до міста, яке вас цікавить, або відкривати детальну інформацію про об’єкти на карті за допомогою мишки. Сині точки на карті — це лікарні. Розмір точок залежить від кількості пацієнтів кожної лікарні. Червоні точки — аптеки. Натискайте на точки, щоб побачити детальну інформацію.
      </p>

            <p
        class="text"
      >
      Ми очікуємо, що карта буде особливо корисна аналітикам. Оскільки вона дозволить визначити в яких районах не достатнє покриття аптеками. А бізнесу дозволить, побачити перспективні напрямки для розширення своєї мережі. 
        </p>

    </div>

    <Map class="mapContainer"
    ref="mapObject"
    id="map"
    :style="`height: 900px; width: 95%`"
    :apteky="apteky" :hospitals="network" :location="currentLocation"></Map>



    <Footer></Footer>
  </div>
</template>

<script>
import * as d3 from "d3";
import VueSlider from "vue-slider-component";
import tooltip from "vue-simple-tooltip";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
//import Map from "@/components/Map.vue"
import { bus } from "../main";
var VueScrollTo = require('vue-scrollto');

// import cpv from "@/assets/cpv.json";
// import hospitalNames from "@/assets/hospital_names.json";
// import tableData from "@/assets/top_100_per_category_update.json";

/* import 'vue-slider-component/theme/antd.css'; */

export default {
  name: "med-table",
  props: {
    /*     rows: Array,
    cpv: Array,
    hospitals: Array,
    oblast: String */
  },
  data() {
    return {
      leftHeaderMargin: "", // *Женя: додала зміну
      leftHeaderWidth: "", // *Женя: додала зміну
      apteky: null,
      network: null,
      isBusy: true,
      currentLocation: [50.31322, 30.319482],
      // rows: tableData,
      // cpv: cpv,
      // hospitals: hospitalNames,
      fields: [
        {
          key: "division_name",
          label: "Назва аптеки",
          thStyle: { width: "25%", maxWidth: "300px" },
          tdClass: "leftaligned"
        },
        {
          key: "division_residence_addresses",
          label: "Адреса",
          tdClass: "leftaligned"
          // thStyle: { width: "35%", maxWidth: "300px" }
        },
        {
          key: "division_settlement",
          label: "Місто",
          thStyle: { width: "15%", maxWidth: "auto" },
          tdClass: "leftaligned"
        },
        {
          key: "division_area",
          label: "Область",
          thStyle: { width: "200px", maxWidth: "200px" },
          tdClass: "centered"
        },
        // {
        //   key: "division_region",
        //   label: "",
        //   thStyle: { width: "200px", maxWidth: "200px" },
        //   tdClass: "centered"
        // }
        // {
        //   key: "sum",
        //   label: "Вартість, грн.",
        //   sortable: true,
        //   direction: "desc",
        //   thStyle: { width: '200px', maxWidth: '200px' },
        //   tdClass: "centered"
        // }
        // { key: "full_name", label: "Повна назва" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      formaterTooltip: v => `${d3.format(",")(v)}, грн`,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      oblastModel: "",
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      },
      filters: {
        division_name: "",
        division_residence_addresses: "",
        division_settlement: "",
        division_area: ""
        //sum: [0, 20000000]
      }
    };
  },
  components: {
    VueSlider,
    Navigation,
    Footer,
    Map: () => import("@/components/AptekyMap.vue")
  },
  created() {
    /* this.filters.oblast_name = this.$route.params.oblast */
  },
  computed: {
    // maxSumValue() {
    //   return d3.max(this.rows.map(d => d.sum));
    // },
    width: function() {
      return window.innerWidth
    },
    height: function() {
      return window.innerHeight
    },
    filtered() {
      if (!this.apteky) {
        this.isBusy = true;
        return [];
      }

      this.isBusy = true;

      let filtered = this.apteky.filter(item => {
        var keys = Object.keys(this.filters);
        keys = keys.filter(e => e !== "sum");
        return keys.every(key => {
          const s = String(item[key]).toUpperCase();
          return s !== "" ? s.includes(this.filters[key].toUpperCase()) : s;
        });
      });

      // filtered = filtered
      //   .filter(
      //     e => (e.sum >= this.filters.sum[0]) & (e.sum <= this.filters.sum[1])
      //   )
      //   .sort((a, b) => Number(b.sum) - Number(a.sum));

      /* here we changed number of pages in pagination according to number of elements filtered */
      this.onFiltered(filtered);

      this.isBusy = false;

      return filtered.length > 0
        ? filtered
        : []
        // [
        //     Object.keys(this.names[0]).reduce(function(obj, value) {
        //       obj[value] = "";
        //       return obj;
        //     }, {})
        //   ];
    },
    // getCPV: function() {
    //   let a = d3
    //     .nest()
    //     .key(d => d.id_item_short)
    //     .map(this.cpv);
    //   return a;
    // },
    // names: function() {
    //   let getCPV = this.getCPV;
    //   return this.rows.map(d => {
    //     return {
    //       hospital_name: d.hospital_name,
    //       hospital_edrpou: d.hospital_edrpou,
    //       overal_title: d.overal_title,
    //       oblast_name: d.oblast_name,
    //       sum: d.sum,
    //       description: getCPV.get(d.id_item_short)[0].description
    //     };
    //   });
    // },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  async created() {
    bus.$on("nav-event", () => this.getPos());

    const files = await Promise.all([
      // d3.csv("data/pmd_all_contracted_legal_entities.csv"),
      d3.csv("data/apteky_data.csv"),
      d3.csv("data/hospitals_for_map.csv")
    ]);

    this.apteky = files[0];
    this.network = files[1];
  },
  mounted() {
    // Set the initial number of items
    // this.totalRows = this.rows.length;
    // this.filters.sum[1] = this.maxSumValue;

    // this.rows.map(d => {
    //   d["full_name"] = d.hospital_name + ", " + d.hospital_edrpou;
    // });

    this.getPos();
    this.$nextTick(function() {
      // *Женя: щоб перемальовувалась на ресайзі
      window.addEventListener("resize", this.getPos);
      window.addEventListener("load", this.getPos);
    });
  },
  watch: {
    // oblast() {
    /*       this.filters.oblast_name = this.oblast;
     */
    // }
  },
  methods: {
    centerMapOnSelected(lat,lng){
      bus.$emit('select-apteka', [lat, lng])
      VueScrollTo.scrollTo('#map')
    },
    clickOnAddress(x) {
      this.currentLocation = [x.nszu_geocoding_google_api_lat, x.nszu_geocoding_google_api_lng]
    },
    formatNumber() {
      let format = d3.format(",");
      return { format };
    },
    capitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getPos: function() {
      //*Женя: додала фунцію
      var that = this;
      var headerBounding = document
        .querySelector("#headerBounding")
        .getBoundingClientRect();

      var left = headerBounding.left;
      var width = headerBounding.width;
      that.leftHeaderMargin = left + 33 + "px";
      that.leftHeaderWidth = width - 33 + "px";
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    formatNumber() {
      let format = d3.format(",");
      return { format };
    }
  },
  directives: {
    tooltip
  }
};
</script>

<style lang="scss">
@import "~vue-slider-component/lib/theme/default.scss";
// @import "~leaflet/dist/leaflet.css";

$blue: #184a77;

.tableButton {
  background-color: #184a77;
  color: white;
  border: none;
  font-size: 0.65em;
  letter-spacing: 1.1px;
  padding: 0 4px;
}

.textInTable {
  font-weight: 300;
}

.mapContainer {
  margin: auto;
}

p.divisionName{
  cursor: pointer;
  font-weight: 420;
}

.spinner {
  color: $blue;
}

table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

able.b-table[aria-busy='true'] {
  opacity: 0.6;
}

.mainTable {
  max-width: 1400px;
  margin: auto;
  background-color: white;
}

.background {
  background-color: white;
}

div.tableNavigation {
  padding-left: 1em;
  padding-bottom: 0.5em;
}

div.row {
  div.row {
    width: auto;
  }
}

.mainTable {
  padding: auto;
}

.tableNavigation div.navigationRow {
  display: flex;
  justify-content: center;
}

div.vue-slider {
  padding-top: 15px !important;
  width: 70% !important;
  margin: auto;
}

div.inputColumnName input {
  width: 100%;
  height: 2rem;
  text-align: left;
  padding-left: 20px;
}

input::placeholder {
  font-style: italic;
  text-align: left;
}
</style>

// <style lang="sass">
//   .mainTable
//     background-color: white

//   .background
//     background-color: white

//   div.tableNavigation
//     padding-left: 1em
//     padding-bottom: 0.5em

//     div.row
//       div.row
//         width: auto

//   .mainTable
//     padding: auto
   

//   .tableNavigation div.navigationRow
//     display: flex
//     justify-content: center

//   div.vue-slider 
//     padding-top: 15px !important
//     width: 80% !important

//   div.inputColumnName input
//     width: 70%
//     height: 2rem
    
// </style>
