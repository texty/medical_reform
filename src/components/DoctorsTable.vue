<template v-model="oblastModel">
<div>
  <Navigation></Navigation>
  <div class="description"  :style="{ 'margin-left': leftHeaderMargin, 'margin-bottom': '50px','width': leftHeaderWidth }">
    <h4 class="subtitle">Таблиця вибору лікаря</h4>
    <p class="text">Якщо ви досі ще не обрали лікаря для себе та вашої родини. Ви можете зробити це за допомогою нашого інструменту. Ви можете знайти лікарів, що працюють у вашому місті в таблиці нижче. Та підібрати собі того хто ще не підписав максимум (дві тисячі) декларацій з пацієнтами.</p>
  </div>

  <b-container fluid >
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
        class="mainTable"
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
        :fixed="false"
      >
        <template slot="top-row">
          <td role="cell" data-label="Ім'я лікаря" aria-colindex="1" :style="{'border-radius': 0}">
            <div class="inputColumnName">
              <input v-model="filters['doctor_full_name']" placeholder='шукати' :style="{'border': `1px solid #b2b2b2`}"/>
            </div>
          </td>
        </template>

        <template slot="top-row">
          <td role="cell" data-label="Лікарня" aria-colindex="1" :style="{'border-radius': 0}">
            <div class="inputColumnName">
              <input v-model="filters['le_transfer']" placeholder='шукати' :style="{'border': `1px solid #b2b2b2`}"/>
            </div>
          </td>
        </template>


        <template slot="top-row">
          <td role="cell" data-label="Пацієнтів" aria-colindex="1">
            <div class="inputColumnName">
              <vue-slider
                v-model="filters['total_decl_count']"
                :min="0"
                :max="maxSumValue"
                :enable-cross="false"
                :tooltip-formatter="formaterTooltip"
              />
            </div>
          </td>
        </template>

        <template slot="top-row">
          <td role="cell" data-label="Місто" aria-colindex="1" :style="{'border-radius': 0}">
            <div class="inputColumnName">
              <input v-model="filters['division_settlement']" placeholder='шукати' :style="{'border': `1px solid #b2b2b2`}" />
            </div>
          </td>
        </template>

        <template slot="top-row">
          <td role="cell" data-label="Область" aria-colindex="1" :style="{'border-radius': 0}">
            <div class="inputColumnName">
              <input v-model="filters['da_area']" placeholder='шукати' :style="{'border': `1px solid #b2b2b2`}" />
            </div>
          </td>
        </template>

        <template slot="top-row">
          <td role="cell" data-label="Адреса" aria-colindex="1" :style="{'border-radius': 0}">
            <div class="inputColumnName">
              <input v-model="filters['division_address']" placeholder='шукати' :style="{'border': `1px solid #b2b2b2`}" />
            </div>
          </td>
        </template>

          <template v-slot:cell(le_transfer)="data">
          <div
            v-tooltip:right="get_hospital_name.get(data.item.le_transfer).le_name + ', ' + data.item.le_transfer "
          >{{ `${ get_hospital_name.get(data.item.le_transfer).le_name.substring(0,30) + "..."  }` }}</div>
      
        </template>
<!-- 
          <template v-slot:cell(le_transfer)="data">
            {{
            formatNumber().format(data.item.sum)
            }}
          </template> -->
        
        <template v-slot:cell()="data">{{ data.value }}</template>


        
<!--         <template slot="le_transfer" slot-scope="row">
          {{
             "ggdg"
          }}
        </template> -->
        
        
        <!-- 
        <template slot="le_transfer" slot-scope="row">
          {{
            array2.find(function(element) {
              return element.le_transfer == row.value;
            })[0].le_name;
          }}
        </template>

        <template slot="overal_title" slot-scope="row">
          <div v-tooltip:right="row.value">{{ `${ row.value.substring(0,40) + "..." }` }}</div>
        </template>

        <template
          slot="hospital_name"
          slot-scope="row"
          v-tooltip:right="row.value"
          v-b-tooltip.hover
          :title="row.value"
        >
          <div v-tooltip:right="row.value">{{ `${ row.value.substring(0,40) + "..." }` }}</div>
        </template>

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
        </template>-->
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

import doctorsNames from "@/assets/doctors_for_table.json";
import hospitalNames from "@/assets/hospital_names.json";

/* import 'vue-slider-component/theme/antd.css'; */

export default {
  props: {
/*     rows: Array,
    hospitals: Array, */
/*     oblast: String*/  
},
  data() {
    return {
      leftHeaderMargin: '', // *Женя: додала зміну
      leftHeaderWidth: '', // *Женя: додала зміну    
      hospitals: hospitalNames,
      rows: doctorsNames,
      oblast: this.$route.params.oblast,
      fields: [
        {
          key: "doctor_full_name",
          label: "Ім'я лікаря",
          thStyle: { width: '25%', maxWidth: '200px' },  
          tdClass: "leftaligned"   
        },
        { key: "le_transfer", 
          label: "Лікарня",
          thStyle: { width: '250px', maxWidth: '250px' },  
          tdClass: "centered"    
          },
        {
          key: "total_decl_count",
          label: "Пацієнтів",
          sortable: true,
          direction: "desc",
          thStyle: { width: 'auto', maxWidth: '200px' },  
          tdClass: "centered"  
        },
        { key: "division_settlement", 
          label: "Місто",
          thStyle: { width: 'auto', maxWidth: '200px' },  
          tdClass: "centered"  
        },
        { key: "da_area", 
          label: "Область",
          thStyle: { width: 'auto', maxWidth: '200px' },  
          tdClass: "centered"  
          },
        { key: "division_address", 
          label: "Адреса лікарні",
          thStyle: { width: '20%', maxWidth: '250px' },  
          tdClass: "leftaligned"   
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      formaterTooltip: v => `${d3.format(",")(v)}, пацієнтів`,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      oblastModel: "",
      filter: null,
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      },
      filters: {
        doctor_full_name: "",
        le_transfer: "",
        total_decl_count: [0, 3000],
        division_settlement: "",
        da_area: this.$route.params.oblast ? this.$route.params.oblast : "Київська",
        division_address: ""
      }
    };
  },
  components: {
    VueSlider,
    Navigation,
    Footer
  },
  computed: {
    get_hospital_name() {
      return d3.map(this.hospitals, function(d) {
        return d.le_transfer;
      });
    },
    maxSumValue() {
      return d3.max(this.rows.map(d => d.total_decl_count));
    },
    // dataUpdated() {
    //   const that = this;

    //   that.rows.forEach((d,i) => {
    //     that.rows[i]['full_name'] = that.get_hospital_name.get(that.rows[i]['le_transfer'])
    //   })

    //   return 
    // },
    filtered() {
      const that = this;
      let filtered = that.rows.filter(item => {
        var keys = Object.keys(that.filters);
        keys = keys.filter(e => e !== "total_decl_count");
        return keys.every(function(key) {
          const s = String(item[key]).toUpperCase()
          return (s !== "")
            ? s.includes(that.filters[key].toUpperCase())
            : s;
        });
      });

      filtered = filtered
        .filter(
          e =>
            (e.total_decl_count >= this.filters.total_decl_count[0]) &
            (e.total_decl_count <= this.filters.total_decl_count[1])
        )
        .sort(
          (a, b) => Number(b.total_decl_count) - Number(a.total_decl_count)
        );

      this.onFiltered(filtered);

      return filtered.length > 0
        ? filtered
        : [
            Object.keys(this.rows[0]).reduce(function(obj, value) {
              obj[value] = "";
              return obj;
            }, {})
          ];
    },
    /* 
    names: function() {
      return this.rows.map(d => {
        return {
          hospital_name: d.hospital_name,
          hospital_edrpou: d.hospital_edrpou,
          overal_title: d.overal_title,
          oblast_name: d.oblast_name,
          sum: d.sum,
          description: (d.id_item_short)[0].description
        };
      });
    }, */
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  watch: {
    oblast() {
      /* this.filters.da_area = this.oblast */
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.rows.length;
    this.filters.total_decl_count[1] = this.maxSumValue;

    this.getPos()
    this.$nextTick(function() {  // *Женя: щоб перемальовувалась на ресайзі     
        window.addEventListener("resize", this.getPos);
        window.addEventListener("load", this.getPos);
    })
  },
  methods: {
    getPos: function() { //*Женя: додала фунцію
         var that = this;
         var headerBounding = document.querySelector('#headerBounding').getBoundingClientRect();
         var left = headerBounding.left
         var width = headerBounding.width 
         that.leftHeaderMargin = left + 33 + "px";
         that.leftHeaderWidth = width -33 + 'px';     
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
    tooltip,
  }
};
</script>

<style lang="scss">
@import "~vue-slider-component/lib/theme/default.scss";
</style>

<style lang="sass"> 
</style>
