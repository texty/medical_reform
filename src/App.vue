<template>
  <div id="app">
    <HorizontalBarChart />
    <LineChart />
    <BarChart />
  </div>
</template>

<script>
import HorizontalBarChart from './components/HorizontalBarChart.vue'
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'




export default {
  name: 'app',
  data() {
    return {
      data: [],
      chartWidth: 0,
      currentValue: null,
      itemCount: 25,
      min: 10,
      max: 100,
    };
  },
  methods: {
    onSelect(value) {
      this.currentValue = value;
    },
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
