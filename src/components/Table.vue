<template>
  <b-container fluid>
    <!-- User Interface controls -->

    <div class="tableNavigation">
        <b-row class="navigationRow">
        <b-col md="4" class="my-1">
          <!-- <b-form-group label-cols-sm="3" label="" class="mb-0"> -->
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Пошук"></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Очистити </b-button>
              </b-input-group-append>
            </b-input-group>
         <!--  </b-form-group> -->
        </b-col>

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
      :items="names"
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
      <template slot="sum" slot-scope="row">
        {{ 
          formatNumber().format(row.value)
        }} 
      </template>

      <template slot="id_item_short" slot-scope="row">
        {{ `${getCPV['$' + row.id_item_short][0].description}` }}
      </template>

      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
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


  export default {
    props: {
      rows: Array,
      cpv: Array
    },
    data() {
      return {
        fields: [
          { key: 'hospital_name', label: 'Назва лікарні',  },
/*           { key: 'description', label: 'Категорія', sortable: true, direction: 'desc', class: 'text-center' },
 */          { key: 'overal_title',  label: 'Опис' },
          {key: 'sum', label: 'Вартість, грн.', sortable: true, direction: 'desc',}
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [5, 10, 15],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
    getCPV: function() {
      let a = d3.nest().key(d => d.id_item_short).map(this.cpv);
      return a
    },
    names: function() {
      let getCPV = this.getCPV;
      return this.rows.map(d => {
        return {
        'hospital_name': d.hospital_name, 
        'overal_title': d.overal_title,
        'sum': d.sum,
        'description': getCPV.get(d.id_item_short)[0].description
        }
      })
    },
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.rows.length
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      formatNumber(){
        let format = d3.format(',');
        return {format}
      }
    }
  }
</script>

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
    text-align: center

  .tableNavigation div.navigationRow
    display: flex
    justify-content: center

</style>
