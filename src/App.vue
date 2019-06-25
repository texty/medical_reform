<template>
  <div id="app">


    <HorizontalBarChart 
      v-bind:temp="loadData" 
      v-bind:variable="selectedVariable" />

    <p>
      fhfhfh
    </p>

    <p>
      fhfhfh
    </p>
    <p>
      fhfhfh
    </p>
    <p>
      fhfhfh
    </p>
    <p>
      fhfhfh
    </p>

    <div class="procurements">
        <h4><b>Порівняння закупівель лікарень за 2017-2019 роки</b></h4>

      <div class="parallelPlot">  
      <ParallelPlot
        class='line'
        v-for="(d,i) in selectedProcurement"
        v-bind:key="i"
        :name="d.key"
        :inputData="d.values"
        :svgParameters="{width: 300,height: 120}"
      />    
      </div> 

    </div> 

        <p>
      fhfhfh
    </p>

    <p>
      fhfhfh
    </p>
    <p>
      fhfhfh
    </p>
    <p>
      fhfhfh
    </p>
    <p>
      fhfhfh
    </p>


    <div class="tableAndName">
        <h4><b>Таблиця закупівель</b></h4>
        <Table class="tableContainer" :rows="tableData" />
    </div>
    
        <p>
      fhfhfh
    </p>

    <p>
      fhfhfh
    </p>
    <p>
      fhfhfh
    </p>
    <p>
      fhfhfh
    </p>
    <p>
      fhfhfh
    </p>


    <div class="finalBars">
    <BarChart 
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'decl_count'" />
    
    <BarChart 
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'money_per_month'" />

    </div>


  </div>
</template>

<script>
import * as d3 from "d3";
import Multiselect from 'vue-multiselect'


import HorizontalBarChart from './components/HorizontalBarChart.vue'
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import ParallelPlot from './components/ParallelPlot.vue'
import Table from './components/Table.vue'



import data from './assets/rajon_stats.json'
import procurement from './assets/procurement_with_regions.json'
import payments from './assets/payments_to_hospitals.json'
import doctorPayments from './assets/payments_to_doctors.json'
import procuramentPivot from './assets/procurements_pivot_with_regions.json'
import tableData from './assets/top_100_per_category.json'






export default {
  name: 'app',
  data() {
    return {
      variables: ['doctors_to_people_ration', 'decl_count'],
      selectedVariable:'declarations_ratio',
      selectedOblast: 'Чернігівська',
      selectedProcurementTypes: [{'name': 'Ремонти', 'code': 'type:45'}, 
      {'name':'Щось там', 'code':'type:30'},
       {'name':'Будівництво', 'code':'type:44'}],
      loadData: data,
      loadProcurements: procuramentPivot,
      loadProcurementPivot: procuramentPivot,
      payments: doctorPayments,
      tableData: tableData,
      chartWidth: 0,
      currentValue: null,
      itemCount: 25,
      min: 10,
      max: 100,
    };
  },
  mounted() {
    console.log('App loaded');
    /* this.fetchData(); */
  },
  methods: {
    onSelect(value) {
      this.currentValue = value;
    },
    addTag(newTag) {
      debugger;
      const tag = {
        name: newTag,
      }

      this.allProcurement.push(tag)
      this.selectedProcurementTypes.push(tag)
    }
/*     async fetchData() {
      let procurements = await d3.csv("./procurement_with_regions.csv");

      this.loadProcurements = procurements;
    } */
  },
  computed: {
    oblast_names: function() {
      return [...new Set(this.loadData.map(d => d.oblast))]
    },
    totalProcurements: function() {
      let total = d3.nest().key(d => d.id_item_short).key(d => d.date_month).rollup(function(leaves) { 
        return leaves.map(d => d.sum).reduce((a, b) => a + b);
       }).entries(this.loadProcurements)
       .map(function(group) {
        return {
          key: group.key,
          values: group.values.map(d => {
              return {
                date_month: d.key,
                sum: d.value
              }
          }),
        }
      })
    

      return { 'key': 'Україна',
        'values': total
       }
    },
    nestedProcurement: function() {
      let nest = d3.nest()
        .key(d => d.id_item_short)
        .key(d => d.oblast)
        .rollup(function(leaves) { 
          return {
            2017: d3.sum(leaves, function(d){ return d[2017] }),
            2019: d3.sum(leaves, function(d){ return d[2019] })
           }; 
        })
        .entries(this.loadProcurementPivot.filter(d => d.oblast != null))

      return nest;
    },
    selectedProcurement: function() {
      debugger;
      let selectedOblast = this.selectedOblast
      let selectedProcurementTypes = this.selectedProcurementTypes
      let data = this.nestedProcurement.filter(function(d) {
        return d.values.length > 10
      })

      let selectedData = data.filter(function(d) {
      return ['type:48', 'type:51', 'type:44',
                        'type:35','type:38',
                        'type:70', 'type:42',
                        'type:39', 'type:30'].includes(d.key);

      /* return d.key */
      });


      /* let selectedProcurementType = selectedOblastData.values.filter(function(d) {
          return  selectedProcurementTypes.includes(d.key)
      }); */

      return selectedData
    },
    allProcurement: function() {
      return this.nestedProcurement.map((d) => {
          return {'name': d.key};
        })
    }
/*     unnestedProcurements: function() {
      var a = [];
      this.nestedProcurement.map(d => d.values).forEach(d => d.forEach(dd => a.push(dd)))
      return a;
  
    } */
  },
  components: {
    Multiselect,
    LineChart,
    HorizontalBarChart,
    BarChart,
    ParallelPlot,
    Table
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="sass">
body
  margin: 0

div.selectorOblast
  background-color: white
  padding-top: 1em
  padding-bottom: 1em

  h5
    display: flex
    align-items: center
    justify-content: center

path
  stroke-color: white


div.tableAndName  h4
    padding-left: 1rem
    /* padding-bottom: 16px */

div.tableContainer.container-fluid
  padding: 0
  margin: 0
  color: white



  .table
    color: white

div.tableNavigation .row
  color: black

  legend
    font-weight: bold
    padding-left: 1em
  
  input
    width: auto

  .page-item.active .page-link
    background-color: #009666
    border-color: #009666
  
  a
    color: black


div.plot
  background-color: #009666

  .table
    color: white

div.procurements
  div.parallelPlot
    background-color: #009666
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    padding: 2em 0
  
  h4
    padding: 0.5em 0.5em

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  /* margin-top: 60px */
</style>

<style lang="sass" scoped>
h1, .content
  margin-left: 20px

label
  display: inline-block
  width: 150px

.area-chart
  height: 300px

div.line
  display: inline-block


div.finalBars
  background-color: #009666
  display: grid
  grid-template-columns: 1fr 1fr
  color: white
  fill: white


</style>
