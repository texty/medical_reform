<template>
  <div id="app">

    <multiselect v-model="selectedOblast" :options="oblast_names"></multiselect>
    <multiselect v-model="selectedVariable" :options="variables"></multiselect>

    <HorizontalBarChart 
      v-bind:temp="loadData" 
      v-bind:oblast="selectedOblast"
      v-bind:variable="selectedVariable" />

    <LineChart 
      class='line'
      v-bind:inputData="totalProcurements.values"
      v-bind:name="totalProcurements.key"
      :svgParameters="{width: 650,height: 350}"
    />


    <multiselect v-model="selectedOblast" :options="oblast_names"></multiselect>

 
    <LineChart 
      class='line'
      v-for="(d,i) in selectedProcurement.values"
      v-bind:key="i"
      v-bind:inputData="d.values"
      v-bind:name="d.key"
      :svgParameters="{width: 300,height: 100}"

    />
    <BarChart 
      v-bind:temp="loadData"
      v-bind:oblast="selectedOblast"
      v-bind:variable="selectedVariable" />

  </div>
</template>

<script>
import * as d3 from "d3";
import Multiselect from 'vue-multiselect'


import HorizontalBarChart from './components/HorizontalBarChart.vue'
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'


import data from './assets/visualization_data.json'
import procurement from './assets/procurement_with_regions.json'




export default {
  name: 'app',
  data() {
    return {
      variables: ['doctors_to_people_ration', 'decl_count'],
      selectedVariable:'decl_count',
      selectedOblast: 'Чернігівська',
      loadData: data,
      loadProcurements: procurement,
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
      return [...new Set(this.loadData.map(d => d.oblast_name))]
    },
    totalProcurements: function() {
      debugger; 
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
        .key(d => d.hospital_edrpou)
        .key(d => d.id_item_short)
        .entries(this.loadProcurements)

      return nest;
    },
    selectedProcurement: function() {
      let selectedOblast = this.selectedOblast
      let selected = this.nestedProcurement.filter(function(d) {
          return d.key == selectedOblast
      })

      return selected[0]
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
    BarChart
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
