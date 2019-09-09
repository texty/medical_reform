<template>
  <div class="finalBars">
    <BarChart
      data-step-no="2"
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'decl_count'"
    />

    <BarChart
      data-step-no="yes"
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'money_per_month'"
    />
    <p>sdggsgsg</p>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
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
    BarChart
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