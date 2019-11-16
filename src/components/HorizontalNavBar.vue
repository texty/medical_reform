<template>
  <div>
<div class="navigation">
        <div :style="{'margin-left': leftHeaderMargin, 'width': leftHeaderWidth }" id="navicons-container">
        <div id="tab1" class="links navicon" >
                <router-link
                  title = "КІЛЬКІСТЬ ПІДПИСАНИХ ДЕКЛАРАЦІЙ"
                  tag="img"
                  src="img/white/declarations.png"
                  :to="{ name: 'horizontal-bar', params: { smth: 'hello_shit' } }"  
                >Horizontal Bar</router-link>          
              </div>
              <!-- div class="links navicon">
                <router-link 
                title = "ПРО РЕФОРМУ"
                tag="img" 
                src="img/text.png" 
                :to="{ name: 'text-element' }">Text</router-link>
             </div> -->
              <div class="links navicon" >
                <router-link
                  title = "Навантаження лікарів"
                  tag="img"
                  src="img/white/doctors+declarations.png"
                  :to="{ name: 'bar-plots', params: { smth: 'hello_shit' } }"
                >Bar Plots</router-link>
              </div>
              <div class="links navicon">
                <router-link
                  title = "ТАБЛИЦЯ ДЛЯ ВИБОРУ ЛІКАРІВ"
                  tag="img"
                  src="img/white/table_doctors.png"
                  :to="{ name: 'doctors-table', params: { oblast: 'Київська' } }"
                >Doctors Table</router-link>
             </div>

              <div class="links navicon">
                <router-link
                  title = "ТАБЛИЦЯ ЗАКУПІВЕЛЬ ЛІКАРЕНЬ"
                  tag="img"
                  src="img/white/table_hospitals.png"
                  :to="{ name: 'med-table', params: { oblast: 'Київська' } }"
                >Med Table</router-link>
             </div>

             <div class="links navicon">
                <router-link
                  title = "ТАБЛИЦЯ ЗАКУПІВЕЛЬ ЛІКАРЕНЬ"
                  tag="img"
                  src="img/white/pills.png"
                  :to="{ name: 'apteky', params: { oblast: 'Київська' } }"
                >Med Table</router-link>
             </div>
             

              <div class="links navicon" >
                <router-link
                  title = "Лікарні вкладають гроші у свій розвиток"
                  tag="img"
                  src="img/white/procurements.png"
                  :to="{ name: 'procurement_plots', params: { oblast: 'Київська' } }"
                >ParallelPlot</router-link>
              </div>
            </div>

            <div id="to-main" class="">
                <router-link
                  :to="{ name: 'home', params: { oblast: 'Київська' } }"
                >на головну</router-link>
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
      tab1:'false',
      leftHeaderMargin: '245px',
      leftHeaderWidth: '500px'
      
    }
  },
  

  mounted: function() {
    this.getPos()
    this.$nextTick(function() {         
              window.addEventListener("resize", this.getPos);
    });
    
  },

  methods: {
    getPos: function() {
      var that = this;
         var headerBounding = document.querySelector('#headerBounding').getBoundingClientRect();
         var left = headerBounding.left
         var width = headerBounding.width
         that.leftHeaderMargin = left + 33 + "px";
         that.leftHeaderWidth = width - 50 + "px";        
    },

/*     navMenuIconsOpacity: function(event) {
      var clickedElement = event.target;      
      d3.selectAll('.navicon img').style("opacity", 0.6)
      var imgChild = clickedElement.querySelector('img');
      d3.select(clickedElement).style("opacity", 1)
      console.log(event.target)
    } */
}

};

</script>

<style lang="scss">
div.navigation {
  background-color: #133c61;
  display: flex;
  margin-bottom: 50px;
  justify-content: space-between;
  @media (max-width: 1100px) {
    display: block;
  }

  #to-main {
    padding: 5 0 20px 0 !important;
    margin: auto 2vw auto 0;
    text-decoration: none;
    padding-bottom: 1px;
    
    color: white;
    font-weight: 600;
    @media (max-width: 1100px) {
      text-align: center;
      padding-bottom: 20px;
    }

    a {
      color: white;
      opacity:0.6;
      border-bottom: 1px solid white;
    }

    a:hover {
      text-decoration: none;
      opacity:1;
    }

    a.router-link-exact-active.router-link-active {
      opacity:0 !important;
    }
  }

  #navicons-container {
    display: flex;
    justify-content: space-between;
  }

  .links {
    padding: 20px 0;
    cursor: pointer;    
  }

  .navicon img {
    opacity: 0.6;
  }

  .router-link-exact-active.router-link-active {
    opacity:1;
  }

  img {
    width: 45px;
    height: auto;   
    @media (max-width: 800px) {
      width: 35px;
      height: 35px;
    }
    @media (max-width: 350px) {
      width: 25px;
      height: 25px;
    }
  }
}
</style>