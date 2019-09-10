<template v-model="oblastModel">
<div>
  <Header></Header>
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
          <td role="cell" data-label="Ім'я лікаря" aria-colindex="1">
            <div class="inputColumnName">
              <input v-model="filters['doctor_full_name']" />
            </div>
          </td>
        </template>

        <template slot="top-row">
          <td role="cell" data-label="Лікарня" aria-colindex="1">
            <div class="inputColumnName">
              <input v-model="filters['le_transfer']" />
            </div>
          </td>
        </template>

        <!--         <template slot="top-row">
          <td>
            <input v-model="filters['doctor_speciality']" />
          </td>
        </template>

        <template slot="top-row">
          <td>
            <input v-model="filters['owner_proprety_type']" />
          </td>
        </template>-->

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
          <td role="cell" data-label="Місто" aria-colindex="1">
            <div class="inputColumnName">
              <input v-model="filters['division_settlement']" />
            </div>
          </td>
        </template>

        <template slot="top-row">
          <td role="cell" data-label="Область" aria-colindex="1">
            <div class="inputColumnName">
              <input v-model="filters['da_area']" />
            </div>
          </td>
        </template>

        <template slot="top-row">
          <td role="cell" data-label="Адреса" aria-colindex="1">
            <div class="inputColumnName">
              <input v-model="filters['division_address']" />
            </div>
          </td>
        </template>

        <template slot="le_transfer" slot-scope="row">
          <div
            v-tooltip:right="get_hospital_name.get(row.value).le_name"
          >{{ `${ get_hospital_name.get(row.value).le_name.substring(0,25) + "..." }` }}</div>
        </template>
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
</div>
</template>

<script>
import * as d3 from "d3";
import VueSlider from "vue-slider-component";
import tooltip from "vue-simple-tooltip";
import Header from "@/components/Header.vue";


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
      hospitals: hospitalNames,
      rows: doctorsNames,
      oblast: this.$route.params.oblast,
      fields: [
        {
          key: "doctor_full_name",
          label: "Ім'я лікаря"
        },
        { key: "le_transfer", label: "Лікарня" },
        {
          key: "total_decl_count",
          label: "Пацієнтів",
          sortable: true,
          direction: "desc"
        },
        { key: "division_settlement", label: "Місто" },
        { key: "da_area", label: "Область" },
        { key: "division_address", label: "Адреса лікарні" }
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
        da_area: this.$route.params.oblast,
        division_address: ""
      }
    };
  },
  components: {
    VueSlider,
    Header
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
    filtered() {
      let filtered = this.rows.filter(item => {
        var keys = Object.keys(this.filters);
        keys = keys.filter(e => e !== "total_decl_count");
        return keys.every(key =>
          String(item[key])
            .toUpperCase()
            .includes(this.filters[key].toUpperCase())
        );
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
    tooltip,
  }
};
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
