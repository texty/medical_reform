<template>
<div>
<Navigation></Navigation>
  <!--*Женя: додала  margin-left та ширину, аби воно рівнялось на рівні з headers-->
  <div class="finalBars" :style="{'margin-left': leftHeaderMargin, 'width': leftHeaderWidth }"> 
   
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
      selectedOblast: "Київська",
      leftHeaderMargin: this.$store.state.left, // *Женя: додала зміну
      leftHeaderWidth: this.$store.state.width // *Женя: додала зміну     
    }
  },
  components: {
    BarChart,
    Navigation
  },

  сreated: function(){
   
  },
  mounted: function() {    
    
  },
  methods: {
    
} 
};
</script>

<style lang="scss" scoped>
/* div.finalBars {
  background-color:$blue;
  display: grid;
  grid-template-columns: 1fr;
  color: white;
  fill: white;
}*/
</style> 