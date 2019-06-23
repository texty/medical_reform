<template>
  <div id="app">

   <!--  <multiselect v-model="selectedOblast" :options="oblast_names"></multiselect> -->

    <HorizontalBarChart 
      v-bind:temp="loadData" 
      v-bind:variable="selectedVariable" />

    <multiselect v-model="selectedOblast" :options="oblast_names"></multiselect>


    <ParallelPlot
      class='line'
      v-for="(d,i) in selectedProcurement"
      v-bind:key="i"
      :name="d.key"
      :inputData="d.values"
      :svgParameters="{width: 450,height: 150}"
    />
    
<!-- 
    <LineChart 
      class='line'
      v-bind:inputData="totalProcurements.values"
      v-bind:name="totalProcurements.key"
      :svgParameters="{width: 650,height: 350}"
    /> -->

 
<!--     <LineChart 
      class='line'
      v-for="(d,i) in selectedProcurement.values"
      v-bind:key="i"
      v-bind:inputData="d.values"
      v-bind:name="d.key"
      :svgParameters="{width: 300,height: 100}"
    /> -->

    <BarChart 
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'decl_count'" />
          <BarChart 
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'money_per_month'" />


  </div>
</template>

<script>
import * as d3 from "d3";
import Multiselect from 'vue-multiselect'


import HorizontalBarChart from './components/HorizontalBarChart.vue'
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import ParallelPlot from './components/ParallelPlot.vue'


import data from './assets/rajon_stats.json'
import procurement from './assets/procurement_with_regions.json'
import payments from './assets/payments_to_hospitals.json'
import doctorPayments from './assets/payments_to_doctors.json'
import procuramentPivot from './assets/procurements_pivot_with_regions.json'






export default {
  name: 'app',
  data() {
    return {
      variables: ['doctors_to_people_ration', 'decl_count'],
      selectedVariable:'declarations_ratio',
      selectedOblast: 'Чернігівська',
      selectedProcurementTypes: ['type:45', 'type:30', 'type:44', 'type:48', 'type:331'],
      loadData: data,
      loadProcurements: procuramentPivot,
      loadProcurementPivot: procuramentPivot,
      payments: doctorPayments,
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
        .key(d => d.oblast_name)
        .key(d => d.id_item_short)
 /*        .key(d => d.hospital_name) */
        .entries(this.loadProcurements)

      return nest;
    },
    selectedProcurement: function() {
      let selectedOblast = this.selectedOblast
      let selectedProcurementTypes = this.selectedProcurementTypes
      let selectedOblastData = this.nestedProcurement.filter(function(d) {
          return d.key == selectedOblast
      })[0];


      let selectedProcurementType = selectedOblastData.values.filter(function(d) {
          return  selectedProcurementTypes.includes(d.key)
      });

      return selectedProcurementType
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
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="sass">
body
  margin: 0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  margin-top: 60px
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
</style>
