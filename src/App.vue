<template>
  <div id="app">
    <HorizontalBarChart 
      v-bind:temp="loadData" 
      v-bind:oblast="selectedOblast"
      v-bind:variable="selectedVariable" />
    <BarChart 
      v-bind:temp="loadData"
      v-bind:oblast="selectedOblast"
      v-bind:variable="selectedVariable" />
    <LineChart />

  </div>
</template>

<script>
import * as d3 from "d3";
import HorizontalBarChart from './components/HorizontalBarChart.vue'
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'


import data from './assets/visualization_data.json'




export default {
  name: 'app',
  data() {
    return {
      /* overalData: [], */
      selectedVariable:'decl_count',
      selectedOblast: 'Чернігівська',
      loadData: data,
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
      let data = await d3.csv("./visualization_data.csv");
      this.loadData = data;
    }
  },
  computed: {
    /* data: function() {
      return d3.nest().key(d => d.oblast_name).map(this.loadData)
    }, */
    oblast_names: function() {
      return [...new Set(this.loadData.map(d => d.oblast_name))]
    },
/*     setData: function() {
      this.overalData = data.get(oblast_names[4])
    } */
  },
  components: {
    LineChart,
    HorizontalBarChart,
    BarChart
  },
};
</script>

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
