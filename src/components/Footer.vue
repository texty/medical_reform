<template>
  <div>
    <div id="footer" :style="{  }">
    <div class="logoContainer">
        <img src="img/logo/Logo_NSZU_2018.png"/>
    </div>

    <div class="logoContainer">
        <img src="img/logo/Mindigital_white.png"/>
    </div>

    <div class="logoContainer">
        <img src="img/logo/USAID.png"/>
    </div>

    <div class="logoContainer">
        <img src="img/logo/UKAID.jpg"/>
    </div>

    <div class="logoContainer">
        <img src="img/logo/ef_logo.png"/>
    </div>

    <div class="logoContainer">
        <img src="img/logo/texty_logo.png"/>
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
        leftHeaderMargin: '',
        leftHeaderWidth: '',
        color: "#184a77"                 
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

$blue: #184a77;

#footer {
    background-color: white;
    border-top: 2px solid $blue;
    border-bottom: 2px solid $blue;
    height: 150px;
    width: 100%;
    margin:80px 0;
    display:flex;
    padding: 20px 10%;
    justify-content: space-between;
    @media (max-width: 800px) {        
        padding: 10px 3%;
        height: 70px;
        margin:30px 0;
      }

    .logoContainer {
        display:flex;
        width:200px;
        height:100px;
        @media (max-width: 800px) {        
        padding: 10px 3%;
        height: 50px;
      }
    }

     img {
        margin:auto;
        max-width: 100%;
        max-height:100%;
     }
}

</style>