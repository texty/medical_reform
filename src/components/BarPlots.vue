<template>
<div>
<Navigation></Navigation>
  <div class="finalBars" >
    <BarChart
      v-for="(d,i) in ['decl_count', 'money_per_month']"
      v-bind:key="i"
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="d"
    />
  </div>
</div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import Navigation from "@/components/Navigation.vue";

import doctorPayments from "@/assets/payments_to_doctors.json";


export default {
  props: {

  },
  data() {
    return {
      payments: doctorPayments,
      selectedOblast: "Київська"
    }
  },
  components: {
    BarChart,
    Navigation
  }
};
</script>

<style lang="scss" scoped>
div.finalBars {
  background-color: #4555bd;
  display: grid;
  grid-template-columns: 1fr;
  color: white;
  fill: white;
}
</style>