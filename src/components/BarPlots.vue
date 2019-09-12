<template>
<div>
<Navigation></Navigation>
  <!--*Женя: додала  margin-left та ширину, аби воно рівнялось на рівні з headers-->
  <div class="finalBars" :style="{'margin-left': leftHeaderMargin, 'width': leftHeaderWidth }"> 
   
    <BarChart
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'decl_count'"  
      v-bind:dataShort="decl_count"  
    />

    <BarChart
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'money_per_month'" 
      v-bind:dataShort="money_per_month"  
   
    />
  </div>
</div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import Navigation from "@/components/Navigation.vue";

import doctorPayments from "@/assets/payments_to_doctors.json";

import money_per_month from '@/assets/money_per_month.json'
import decl_count from '@/assets/decl_count.json'


export default {
  props: {

  },
  data() {
    return {
      payments: doctorPayments,
      selectedOblast: "Київська",
      decl_count: decl_count, 
      money_per_month: money_per_month,
      leftHeaderMargin: '', // *Женя: додала зміну
      leftHeaderWidth: '' // *Женя: додала зміну     
    }
  },
  components: {
    BarChart,
    Navigation
  },

  сreated: function(){
   
  },
   mounted() {
    this.getPos();
    this.$nextTick(function() {
      window.addEventListener("resize", this.getPos);
    });
  },
  methods: {
    getPos: function() {
      var that = this;
      var headerBounding = document.querySelector("#headerBounding").getBoundingClientRect();
      var left = headerBounding.left;
      var width = headerBounding.width ;
      that.leftHeaderMargin = left + 33 - 50  + "px";
      that.leftHeaderWidth = width - 50 + "px";
    }
  }
};
</script>

<style lang="scss" scoped></style> 