<template>
  <div>
    <div id="top">
      <div id="headerBounding" class="headers">
        <img src="img/plus.png" />
        <div class="headerText">
          <h1 style="font-weight:600">Медична реформа</h1>
          <h4>Візуалізація на основі відкритих даних</h4>
        </div>
      </div>
     </div>

      
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      payments: doctorPayments,
      selectedOblast: "Київська",
         
    }
  },  
  mounted: function() {
    this.getPos()
    this.$nextTick(function() {         
              window.addEventListener("resize", this.getPos);
    })
  },
  methods: {
    getPos: function() {
      var that = this;
         var headerBounding = document.querySelector('#headerBounding').getBoundingClientRect();
         var left = headerBounding.left
         var width = headerBounding.width 
         that.leftHeaderMargin = left + 33 + "px";
         that.leftHeaderWidth = width - 50 + "px";        
    }
} 
};


</script>

<style lang="scss">


</style>