<template>
  <div id="app">

    <multiselect v-model="selectedOblast" :options="oblast_names"></multiselect>
    <multiselect v-model="selectedVariable" :options="variables"></multiselect>

    <HorizontalBarChart 
      v-bind:temp="loadData" 
      v-bind:oblast="selectedOblast"
      v-bind:variable="selectedVariable" />
    <BarChart 
      v-bind:temp="loadData"
      v-bind:oblast="selectedOblast"
      v-bind:variable="selectedVariable" />
    <LineChart 
      v-bind:inputData="loadProcurements"
    />

  </div>
</template>

<script>
import * as d3 from "d3";
import Multiselect from 'vue-multiselect'


import HorizontalBarChart from './components/HorizontalBarChart.vue'
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'


import data from './assets/visualization_data.json'
/* import procurement from './assets/procurement_with_regions.json' */




export default {
  name: 'app',
  data() {
    return {
      variables: ['doctors_to_people_ration', 'decl_count'],
      selectedVariable:'decl_count',
      selectedOblast: 'Чернігівська',
      loadData: data,
      loadProcurements: 0,
      chartWidth: 0,
      currentValue: null,
      itemCount: 25,
      min: 10,
      max: 100,
    };
  },
  mounted() {
    console.log('App loaded');
    this.fetchData();
  },
  methods: {
    onSelect(value) {
      this.currentValue = value;
    },
    async fetchData() {
      let procurements = await d3.csv("./procurement_with_regions.csv");

      this.loadProcurements = procurements;
    }
  },
  computed: {
    oblast_names: function() {
      return [...new Set(this.loadData.map(d => d.oblast_name))]
    },
/*     procurements: function() {
      return this.loadProcurements
    }, */
    selectedProcurement: function() {
      let x = this.loadProcurements.filter(d => {
        return (d.name == "Фастівський район") &  (d.oblast_name == "Київська")
      });
      
      return x
    }
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
</style>
