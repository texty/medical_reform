<template>
  <div>
<div class="navigation">
        <div :style="{'margin-left': leftHeaderMargin, 'width': leftHeaderWidth }" id="navicons-container">
        <div class="links">
                <router-link
                  tag="img"
                  src="img/declarations.png"
                  :to="{ name: 'horizontal-bar', params: { smth: 'hello_shit' } }"
                >Horizontal Bar</router-link>          
              </div>
              <div class="links">
                <router-link tag="img" src="img/text.png" :to="{ name: 'text-element' }">Text</router-link>
             </div>
              <div class="links">
                <router-link
                  tag="img"
                  src="img/doctors.png"
                  :to="{ name: 'bar-plots', params: { smth: 'hello_shit' } }"
                >Bar Plots</router-link>
              </div>
              <div class="links">
                <router-link
                  tag="img"
                  src="img/table.png"
                  :to="{ name: 'doctors-table', params: { oblast: 'Київська' } }"
                >Doctors Table</router-link>
             </div>

              <div class="links">
                <router-link
                  tag="img"
                  src="img/table.png"
                  :to="{ name: 'med-table', params: { oblast: 'Київська' } }"
                >Med Table</router-link>
             </div>

              <div class="links">
                <router-link
                  tag="img"
                  src="img/zakupivki.png"
                  :to="{ name: 'procurement_plots', params: { oblast: 'Київська' } }"
                >ParallelPlot</router-link>
              </div>
            </div>



              <div class="links">
                <router-link
                  :to="{ name: 'procurement_plots', params: { oblast: 'Київська' } }"
                >На головну</router-link>
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
      leftHeaderMargin: '245px',
      leftHeaderWidth: '500px'
      
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
         console.log(left)
         console.log(width)

         that.leftHeaderMargin = left + 33 + "px";
         that.leftHeaderWidth = width - 50 + "px";

        
    }
}

};

</script>

<style lang="scss">
</style>