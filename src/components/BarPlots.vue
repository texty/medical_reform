<template>
  <div>
    <BarChart
      data-step-no="2"
      v-bind:to-draw="currStep.includes('2')"
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'decl_count'"
    />

    <BarChart
      data-step-no="yes"
      v-bind:to-draw="currStep.includes('yes')"
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'money_per_month'"
    />
  </div>
</template>

<script>
import BarChart from "BarChart.vue";

export default {
  props: {
      oblast: String, 
      data: Array
  },
  components: {
    BarChart
  }
};
</script>

<style lang="scss" scoped>
</style>