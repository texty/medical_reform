<template  v-model="oblastModel">
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
        :fixed="true"
      >
        <template slot="top-row">
          <td role="cell" data-label="Назва лікарні" aria-colindex="1">
            <div class="inputColumnName"><input v-model="filters['hospital_name']" /></div>
          </td>
        </template>

        <template slot="top-row">
          <td role="cell" data-label="Код ЄДРПОУ" aria-colindex="1">
            <div class="inputColumnName"><input v-model="filters['hospital_edrpou']" /></div>
          </td>
        </template>

        <template slot="top-row">
          <td role="cell" data-label="Опис" aria-colindex="1">
            <div class="inputColumnName"><input v-model="filters['overal_title']" /></div>
          </td>
        </template>

        <template slot="top-row">
          <td role="cell" data-label="Область" aria-colindex="1">
            <div class="inputColumnName"><input v-model="filters['oblast_name']" /></div>
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
            /></div>
          </td>
          
        </template>

        <template slot="sum" slot-scope="row">
          {{
          formatNumber().format(row.value)
          }}
        </template>

        <template slot="overal_title" slot-scope="row">
          <div v-tooltip:right="row.value">{{ `${ row.value.substring(0,30) + "..." }` }}</div>
        </template>

        <template
          slot="hospital_name"
          slot-scope="row"
          v-tooltip:right="row.value"
          v-b-tooltip.hover
          :title="row.value"
        >
          <div v-tooltip:right="row.value">{{ `${ row.value.substring(0,30) + "..." }` }}</div>
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
        </template>
      </b-table>
    </div>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
import * as d3 from "d3";
import VueSlider from "vue-slider-component";
import tooltip from "vue-simple-tooltip";

/* import 'vue-slider-component/theme/antd.css'; */

export default {
  props: {
    rows: Array,
    cpv: Array,
    hospitals: Array,
    oblast: String 
  },
  data() {
    return {
      fields: [
        { key: "hospital_name", label: "Назва лікарні" },
        {
          key: "hospital_edrpou",
          label: "Код ЄДРПОУ"
        },
        { key: "overal_title", label: "Опис" },
        { key: "oblast_name", label: "Область" },
        {
          key: "sum",
          label: "Вартість, грн.",
          sortable: true,
          direction: "desc"
        }
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
        hospital_name: "",
        hospital_edrpou: "",
        overal_title: "",
        oblast_name: this.$attrs.oblastModel,
        sum: [0, 20000000]
      }
    };
  },
  components: {
    VueSlider
  },
  computed: {
    maxSumValue() {
      return d3.max(this.rows.map(d => d.sum));
    },
    filtered() {
      let filtered = this.names.filter(item => {
        var keys = Object.keys(this.filters);
        keys = keys.filter(e => e !== "sum");
        return keys.every(key => String(item[key]).toUpperCase().includes(this.filters[key].toUpperCase()));
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
  },
  watch: {
    oblast() {this.filters.oblast_name = this.oblast}
  },
  methods: {
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
}
</script>

<style lang="scss">
@import "~vue-slider-component/lib/theme/default.scss";
</style>

<style lang="sass">
  .mainTable
    background-color: #4555bd

  .background
    background-color: #4555bd

  div.tableNavigation
    padding-left: 1em
    padding-bottom: 0.5em

    div.row
      div.row
        width: auto

  .mainTable
    padding: auto
    /* text-align: center */

  .tableNavigation div.navigationRow
    display: flex
    justify-content: center

  div.vue-slider 
    padding-top: 15px !important
    width: 80% !important

  div.inputColumnName input
    width: 70%
    height: 2rem
    
</style>
