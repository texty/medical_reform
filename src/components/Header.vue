<template>
  <div>
    <div id="top">
      <div id="headerBounding" class="headers">
        <img src="img/plus.png" />
        <div class="headerText">
          <h1 style="font-weight:600">ВІДКРИТА МЕДРЕФОРМА</h1>
          <h4>Проект на основі відкритих даних НСЗУ</h4>
        </div>
      </div>
     </div>



    <div id="logo-soc">
        <div class="logo">
<!--             <a href="http://texty.org.ua/" target="_blank"><img class='top-logo' style="width:100%" src="img/logо.jpg"/></a>
 -->        </div>

        <div id="soc">
            <a id="facebook" href="https://www.facebook.com/sharer/sharer.php?u=http://texty.org.ua/d/2019/medical_reform/" target="_blank" class="share-btn"><i class="fab fa-facebook-square"></i></a>
            <a id="twitter" href="https://twitter.com/intent/tweet?text=http://texty.org.ua/d/2019/medical_reform/" target="_blank" class="share-btn"><i class="fab fa-twitter-square"></i></a>
        </div>
    </div>
      
  </div>
</template>

<script>
import share from "@/plugins/share-behavior.js"


export default {
  components: {
  },
  data() {
    return {
      // payments: doctorPayments,
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
#logo-soc {
  width:100%;
  position:absolute;
  top:0;
  left:0;
  display:flex;
  justify-content: space-between;

}

.logo {
  margin-left: 5px;
  height:50px;
  width:200px;
  grid-column: 1/2;
  @media screen and (min-width : 1824px){
    width:180px;
  }
  @media screen and (min-width: 320px) and (max-width : 480px) {
    width:120px;
  }

  a {
    height: 100%;
    display:flex;

    img {
      margin:auto;
    }
  }
}

#soc {
  position:fixed;
  top:5px;
  right:0;
  display:flex;
  justify-content: flex-end;
  margin-right:20px;

  div#translate {
    display:flex;
  }

  a {
    margin:auto;
    text-decoration: none;
  }

  a span {
    border-bottom: 1px dashed black;
    margin-right:20px;
    font-weight:800;
    font-size:20px;
    letter-spacing: 1px;
    color:black!important;
    background-color:rgba(225,225,225,0.7);
    @media screen and (min-width : 1824px){
      font-size:14px;
    }
  }


  i {
    font-size:40px;
    color: lightgray;
    margin: 0 0 0 0.5em;
    max-height: 1em;
    transition: all 0.5s;
    @media screen and (min-width: 320px) and (max-width : 480px) {
      font-size:20px;
    }

    &:hover {
      color: #05e3f4;
    }
  }
}

</style>