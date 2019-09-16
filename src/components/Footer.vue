<template>
  <div>
      <section id="created_texty">
    <div>
        <a href="https://www.facebook.com/sharer/sharer.php?u=http://texty.org.ua/d/2019/medical_reform/"
           class="share-btn"><i class="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com/intent/tweet?text=http://texty.org.ua/d/2019/medical_reform/" class="share-btn"><i
                class="fab fa-twitter"></i></a>
        <!--<h3>Створено Текстами</h3>-->
        <h3><b>Створено Текстами</b></h3>
    </div>
    <div>
       <a href="http://texty.org.ua/" target="_blank"><img src="img/logo/black_logo.gif" alt="texty.org.ua"></a>
    </div>
</section>

    <div id="footerPage" :style="{  }">
        <div class="logoContainer">
            <img src="img/logo/Mindigital_white.png"/>
        </div>

        <div class="logoContainer">
            <img src="img/logo/Logo_NSZU_2018.png"/>
        </div>
        
        <div class="logoContainer">
            <img src="img/logo/USAID.png" />
        </div>

        <div class="logoContainer">
            <img src="img/logo/UKAID.jpg" style="height:80%; width:auto;"/>
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

#footerPage {
    background-color: white;
    //border-top: 2px solid $blue;
    //border-bottom: 2px solid $blue;
    height: 150px;
    width: 100%;
    margin:80px 0 40px 0;
    display:flex;
    flex-wrap: nowrap;    
    padding: 20px 10%;
    justify-content: space-between;
    @media (max-width: 800px) {
      flex-wrap: wrap;        
        padding: 10px 3%;
        height: 70px;
        margin:30px 0;
      }

    .logoContainer {
        margin: auto;
        display:flex;
        width:200px;
        height:100px;
        @media (max-width: 800px) {        
        padding: 10px 3%;
        height: 70px;
      }
    }

     img {
        margin:auto;
        max-width: 100%;
        max-height:100%;
     }
}

/* Created by Texty*/
#created_texty {
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
  margin: 4em 15% 4em 15%;

  i {
    box-sizing: content-box;
    margin: 0.5em;
    cursor: pointer;
    width: 1em;
    height: 1em;
    border: 1px solid grey;
    color: lighten(grey, 15%);
    border-radius: 50%;
    padding: 0.5em;
    font-size: 2.5em;
    line-height: 1;
    transition: all 0.5s;

    &:hover {
      border: 1px solid $blue;
      color: $blue;
    }
  }

  img {
    max-height: 4em;
    max-width: 90%;
  }

  div {
    text-align: center;
  }

  h3 {
    text-align: center;
    font-size: 1.5rem;
  }
}


</style>