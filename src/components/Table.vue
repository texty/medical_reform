<template  v-model="oblastModel">
  <div>
    <Navigation></Navigation>
    <div
      class="description"
      :style="{ 'margin-left': leftHeaderMargin, 'margin-bottom': '50px','width': leftHeaderWidth }"
    >
      <h4 class="subtitle">Закупівлі лікарень</h4>
      <p
        class="text"
      >Також ви можете скористатися таблицею внизу, щоб самостійно перевірити, що купують лікарні. Введіть в поле пошуку назву лікарні або товару, який вас цікавить. У таблиці є 100 найбільших закупівель у кожній категорії. Категорії бувають дуже різними — наприклад, медичне обладнання, послуги з будівництва, меблі, комп’ютерна техніка та інші.</p>
      <p class="text">Інструмент розроблено на основі даних НСЗУ, а саме:</p>
      <p class="text">
        Набір даних про пацієнтів, лікарів та медичні заклади, доступний через відкритий АРІ Національної Служби Здоров’я;
        Дані про тендери медичні закладів з системи публічних закупівель Prozorro.
      </p>
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
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          empty-filtered-text="Таких даних у нас немає"
          :fixed="true"
        >
          <template slot="top-row">
            <td role="cell" data-label="Назва лікарні" aria-colindex="1" :style="{'border-radius': 0}">
              <div class="inputColumnName">
                <input v-model="filters['full_name']" :style="{'border': `1px solid #b2b2b2`}"/>
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
                <input v-model="filters['overal_title']" :style="{'border': `1px solid #b2b2b2`}" />
              </div>
            </td>
          </template>

          <template slot="top-row">
            <td role="cell" data-label="Область" aria-colindex="1" :style="{'border-radius': 0}">
              <div class="inputColumnName">
                <input v-model="filters['oblast_name']" :style="{'border': `1px solid #b2b2b2`}" />
              </div>
            </td>
          </template>

          <template slot="top-row">
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
          </template>

          <template v-slot:cell(sum)="data">
            {{
            formatNumber().format(data.item.sum)
            }}
          </template>

          <template v-slot:cell(overal_title)="data">
            <div
              v-tooltip:right="data.item.overal_title"
            >{{ data.item.overal_title.substring(0,80) + "..." }}</div>
          </template>

          <template v-slot:cell(hospital_name)="data">
            <div
              v-tooltip:right="data.item.hospital_name + ', ' + data.item.hospital_edrpou"
            >{{ data.item.hospital_name.substring(0,40) + "..." }}</div>
          </template>

          <template v-slot:cell()="data">{{ data.value }}</template>

          <!-- <template
          slot="hospital_edrpou"
          slot-scope="row"
          v-tooltip:right="row.value"
          v-b-tooltip.hover
          :title="row.value"
        >
          <div v-tooltip:right="row.value">{{ `${ row.value.substring(0,30) + "..." }` }}</div>
          </template>-->

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
    <Footer></Footer>
  </div>
</template>

<script>
import * as d3 from "d3";
import VueSlider from "vue-slider-component";
import tooltip from "vue-simple-tooltip";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

import cpv from "@/assets/cpv.json";
import hospitalNames from "@/assets/hospital_names.json";
import tableData from "@/assets/top_100_per_category.json";

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
      rows: tableData,
      cpv: cpv,
      hospitals: hospitalNames,
      fields: [
        {
          key: "hospital_name",
          label: "Назва лікарні",
          thStyle: { width: "300px", maxWidth: "300px" },
          tdClass: "leftaligned"
        },
        // {
        //   key: "hospital_edrpou",
        //   label: "Код ЄДРПОУ"
        // },
        {
          key: "overal_title",
          label: "Опис",
          thStyle: { width: "auto", maxWidth: "auto" },
          tdClass: "leftaligned"
        },
        {
          key: "oblast_name",
          label: "Область",
          thStyle: { width: "200px", maxWidth: "200px" },
          tdClass: "centered"
        },
        {
          key: "sum",
          label: "Вартість, грн.",
          sortable: true,
          direction: "desc",
          thStyle: { width: '200px', maxWidth: '200px' },
          tdClass: "centered"   
        }
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
        full_name: "",
        hospital_edrpou: "",
        overal_title: "",
        oblast_name: this.$route.params.oblast
          ? this.$route.params.oblast
          : "Київська",
        sum: [0, 20000000]
      }
    };
  },
  components: {
    VueSlider,
    Navigation,
    Footer
  },
  created() {
    /* this.filters.oblast_name = this.$route.params.oblast */
  },
  computed: {
    maxSumValue() {
      return d3.max(this.rows.map(d => d.sum));
    },
    filtered() {
      let filtered = this.rows.filter(item => {
        var keys = Object.keys(this.filters);
        keys = keys.filter(e => e !== "sum");
        return keys.every(key => {
          const s = String(item[key]).toUpperCase();
          return s !== "" ? s.includes(this.filters[key].toUpperCase()) : s;
        });
      });

      filtered = filtered
        .filter(
          e => (e.sum >= this.filters.sum[0]) & (e.sum <= this.filters.sum[1])
        )
        .sort((a, b) => Number(b.sum) - Number(a.sum));

      /* here we changed number of pages in pagination according to number of elements filtered */
      this.onFiltered(filtered);

      return filtered.length > 0
        ? filtered
        : [
            Object.keys(this.names[0]).reduce(function(obj, value) {
              obj[value] = "";
              return obj;
            }, {})
          ];
    },
    getCPV: function() {
      let a = d3
        .nest()
        .key(d => d.id_item_short)
        .map(this.cpv);
      return a;
    },
    names: function() {
      let getCPV = this.getCPV;
      return this.rows.map(d => {
        return {
          hospital_name: d.hospital_name,
          hospital_edrpou: d.hospital_edrpou,
          overal_title: d.overal_title,
          oblast_name: d.oblast_name,
          sum: d.sum,
          description: getCPV.get(d.id_item_short)[0].description
        };
      });
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.rows.length;
    this.filters.sum[1] = this.maxSumValue;

    this.rows.map(d => {
      d['full_name'] = d.hospital_name + ", " + d.hospital_edrpou      
    })

    this.getPos();
    this.$nextTick(function() {
      // *Женя: щоб перемальовувалась на ресайзі
      window.addEventListener("resize", this.getPos);
      window.addEventListener("load", this.getPos);
    });
  },
  watch: {
    oblast() {
      /*       this.filters.oblast_name = this.oblast;
       */
    }
  },
  methods: {
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
// @import "~vue-slider-component/lib/theme/default.scss";


  $blue: #184a77;  

  .mainTable {
    max-width:1400px;
    margin:auto;
    background-color: white;
   }

  .background  {
    background-color: white;
    }

  div.tableNavigation  {
    padding-left: 1em;
    padding-bottom: 0.5em;
    }

    div.row {
      div.row { 
        width: auto;
      }
    }

  .mainTable{
    padding: auto;
  }


    
  .tableNavigation div.navigationRow {
    display: flex;
    justify-content: center;
  }

  div.vue-slider {
    padding-top: 15px !important;
    width: 70% !important;
    margin:auto;
  }

  div.inputColumnName input {
    width: 100%;
    height: 2rem;
    text-align: center;   
  }

  input::placeholder {    
    padding-left:10px;
    font-style: italic;
    text-align:left;
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
