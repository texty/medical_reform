<template>
<div>
<Navigation></Navigation>
<div class="description"  :style="{ 'margin-left': titleLeft, 'margin-bottom': '50px','width': titleWidth }">
  <h4  class="subtitle">Навантаження лікарів</h4>
  <p class="text">На початку реформи НСЗУ визначила оптимальну кількість (ліміт) пацієнтів, яка має бути в одного лікаря первинної ланки: у педіатра — 900 пацієнтів, у сімейного лікаря — 1800, у терапевта — 2000. Якщо кількість пацієнтів перевищує ліміт — держава застосовує понижувальні коефіцієнти під час оплати понадлімітних декларацій. За умови, що лікар набрав оптимальну кількість пацієнтів, щомісячні виплати за них складають приблизно 60 тисяч гривень. Як саме витрачати кошти, і яким витратам віддати пріоритет, вирішує керівник закладу або лікар-підприємець самостійно. Ця сума розрахована так, щоб лікарю після всіх витрат на оренду та додатковий персонал залишилось 30-35 тис. гривень зарплати. </p>
  <p class="text">На графіках можна побачити статистику кількості пацієнтів на одного лікаря, і статистику виплат на одного лікаря. Якщо лікар працює в лікарні, гроші надходять на її рахунок, а далі вже від головного лікаря та умов колективного договору залежить, як розподіляються кошти. Якщо лікар є приватним підприємцем — він сам розпоряджається цими грошима. Основною умовою є забезпечення пацієнтів якісними медичними послугами.</p>
</div>
  
  <!--*Женя: додала  margin-left та ширину, аби воно рівнялось на рівні з headers-->
  <div class="finalBars" :style="{'margin-left': leftHeaderMargin, 'width': leftHeaderWidth }"> 
  <div>
  <div class="barChartsTiles"><h4>Кількість декларацій <br>на одного лікаря</h4></div> 
   
    <BarChart
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:dataShort="decl_count"  
      v-bind:variable="'decl_count'"
    />

    <p style="margin-left:50px; font-size:13px">Кількість декларацій у лікаря</p>

    
 </div>

 <div>

   
<div class="barChartsTiles"><h4>Виплати на одного <br> лікаря в місяць</h4></div>
    <BarChart
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:dataShort="money_per_month" 
      v-bind:variable="'money_per_month'" 
  
    />
    <p style="margin-left:50px; font-size:13px">Отримує лікарня/ФОП за пацієнтів одного лікаря, грн/міс.</p>
    </div>
  </div>
  <Footer></Footer>
</div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

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
      leftHeaderWidth: '', // *Женя: додала зміну   
      titleLeft: '',
      titleWidth: ''  
    }
  },
  components: {
    BarChart,
    Navigation,
    Footer
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
      that.titleLeft = left + 33 + "px";
      that.leftHeaderWidth = width  - 20 + "px";
      that.titleWidth =  width -50 + 'px'
    }
  }
};
</script>