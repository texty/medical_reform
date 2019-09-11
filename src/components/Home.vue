<template>
  <div>
    <Header></Header>
    <!-- <div class="main">
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
    </div> -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  }
}


</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">

// styles only for Home.vue
body {
  margin: 0;
}

div#top {
  padding:100px 0;
  background-color: #184a77;
  color: white;
  // text-align: center; 
}


div.headers {
  width:max-content;
  margin:0 auto 0 auto;
  display: grid;
  grid-template-columns: 120px auto;
  @media(max-width:800px){
       display: block;
       margin:auto;
       width:90%;
       text-align: center;
    }

  img {
    margin-right:20px;
    width: 100px;
    height: 100px;
    @media(max-width:800px){
      width: 80px;
      height: 80px;
      margin: 30px 0;
    }   
  }

  h1 {
    font-size:3.5rem;
    @media(max-width:800px){
       font-size:3rem;
    }

  }

  h4 {
    letter-spacing: 1px;
    font-size:2rem
  }
}

div.navigation {
  display:block;
  background-color: #133c61;
  display:flex;

  #navicons-container {
    display:flex;
    justify-content:space-between;
 }

  .links {
    padding:20px 0;
    cursor:pointer;
   
  }

  img {
    width:50px;
    height: 50px;
    @media(max-width:800px){
      width: 40px;
      height: 40px;
    }   
  }
}

div.main {
  width: 70%;
  margin: 0 auto;
  text-align: center; 

}

// old styles from App.vue file
.text {
  margin: 2em 25% 1em 25%;
  line-height: 1.5;
  font-size: 1.15em;
}

ul {
  margin: 2em 25% 0 25%;
  /*     line-height: 1.5em;
    font-size: 1.15em;
 */
}
a {
  color: #4555bd;
}

h2.text {
  font-size: 2em;
}

.chart {
  margin-top: 3em;
  margin-bottom: 3em;
}

div.selectorOblast {
  background-color: white;
  padding-top: 1em;
  padding-bottom: 1em;

  h5 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

path {
  color: white;
}

div.parallelPlotOblast {
  display: flex;

  p {
    margin-left: 3.35em;
  }

  div.multiselect {
    width: auto;
    height: auto;
    margin-left: 1em;
  }
}

div.tableAndName h4 {
  text-align: center;
  padding: 1em;
}

div.tableContainer.container-fluid {
  padding: 0;
  margin: 0;
  color: white;

  .table {
    color: white;
  }
}

div.tableNavigation .row {
  color: black;
  width: 100%;

  legend {
    font-weight: bold;
    padding-left: 1em;
  }

  input {
    width: auto;
  }

  .page-item.active .page-link {
    background-color: #4555bd;
    border-color: #4555bd;
  }
}

a {
  color: black;
}

div.plot {
  background-color: #4555bd;
  text-aligh: center;

  .table {
    color: white;
  }
}

div.procurements {
  div.parallelPlot {
    background-color: #4555bd;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 2em 0;
  }

  p {
    padding: 0.5em 0em 0.5em 0.5em;
  }

  h4 {
    padding: 0.5em 2.7em;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/* margin-top: 60px */

h1,
.content {
  text-transform: uppercase;
/*   margin-left: 20px;
 */}

label {
  display: inline-block;
  width: 150px;
}

.area-chart {
  height: 300px;
}

div.line {
  display: inline-block;
}

div.finalBars {
  background-color: #4555bd;
  display: grid;
  grid-template-columns: 1fr;
  color: white;
  fill: white;
}

rect.bar:hover {
  fill: "red";
}

.resize-observer {
  display: none;
  height: 0;
}

table {
  text-align: center;
}

/* @media (min-width: 960px)
  {table tr th:nth-child(1)
    width: 30%;} */

.tableNavigation div.navigationRow {
  display: flex;
  justify-content: center;
}

.links {
  display:grid;
  grid-template-columns: auto auto;
}
</style>

