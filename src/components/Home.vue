<template>
  <div>
    <Header></Header>
    <div
      class="main"
      :style="{'margin-left': leftHeaderMargin, 'width': 'auto', 'margin-right':'10%' }"
    >
      <div class="links">
        <router-link
          tag="img"
          src="img/declarations-blue.png"
          :to="{ name: 'horizontal-bar', params: { smth: 'hello_shit' } }"
        >Horizontal Bar</router-link>
        <div class="icon-description">
          <router-link
            tag="p"
            :to="{ name: 'horizontal-bar', params: { smth: 'hello_shit' } }"
          >Кількість підписаних декларацій</router-link>
        </div>
      </div>
      <div class="links">
        <router-link tag="img" src="img/text_blue.png" :to="{ name: 'text-element' }">Text</router-link>
        <div class="icon-description">
          <router-link tag="p" :to="{ name: 'text-element' }">Текст</router-link>
        </div>
      </div>
      <div class="links">
        <router-link
          tag="img"
          src="img/doctors-blue.png"
          :to="{ name: 'bar-plots', params: { smth: 'hello_shit' } }"
        >Bar Plots</router-link>
        <div class="icon-description">
          <router-link
            tag="p"
            :to="{ name: 'bar-plots', params: { smth: 'hello_shit' } }"
          >Кількість декларацій по регіонах</router-link>
        </div>
      </div>

      <div class="links">
        <router-link
          tag="img"
          src="img/table-blue.png"
          :to="{ name: 'doctors-table', params: { oblast: 'Київська' } }"
        >Doctors Table</router-link>
        <div class="icon-description">
          <router-link
            tag="p"
            :to="{ name: 'doctors-table', params: { oblast: 'Київська' } }"
          >Таблиця 1</router-link>
        </div>
      </div>

      <div class="links">
        <router-link
          tag="img"
          src="img/table-blue.png"
          :to="{ name: 'med-table', params: { oblast: 'Київська' } }"
        >Med Table</router-link>
        <div class="icon-description">
          <router-link tag="p" :to="{ name: 'med-table', params: { oblast: 'Київська' } }">Таблиця 2</router-link>
        </div>
      </div>

      <div class="links">
        <router-link
          tag="img"
          src="img/zakupivli-blue.png"
          :to="{ name: 'procurement_plots', params: { oblast: 'Київська' } }"
        >ParallelPlot</router-link>
        <div class="icon-description">
          <router-link
            tag="p"
            :to="{ name: 'procurement_plots', params: { oblast: 'Київська' } }"
          >Порівняння закупівель лікарень за 2017-2019 роки в різних областях, грн</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header
  },
  data() {
    return {
      leftHeaderMargin: this.$store.state.left,
      leftHeaderWidth: this.$store.state.width,
      color: "#184a77",
      leftHeaderMargin: "245px",
      leftHeaderWidth: "500px"
    };
  },
  mounted: function() {
    this.getPos();
    this.$nextTick(function() {
      window.addEventListener("resize", this.getPos);
    });

    $emit("size-event", this.leftHeaderMargin, this.leftHeaderWidth);

  },
  methods: {
    getPos: function() {
      var that = this;
      var headerBounding = document
        .querySelector("#headerBounding")
        .getBoundingClientRect();
      var left = headerBounding.left;
      var width = headerBounding.width / 1.5;

      console.log('here', width, left)

      this.$store.dispatch('setValueWidth', width)
      this.$store.dispatch('setValueLeft', left)


      that.$store.state.left = left + 33 + "px";
      that.$store.state.left = width - 50 + "px";
    }
  }
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
// styles only for Home.vue

$blue: #184a77;

body {
  margin: 0;
  line-height: 1.6;
}

/* Шапка із загом і підзагом */
div#top {
  padding: 80px 0;
  background-color: $blue;
  color: white;
  @media (max-width: 350px) {
    padding: 30px 0;
  }
}

div.headers {
  //min-width:50%;
  width: max-content;
  margin: 0 auto 0 auto;
  display: grid;
  grid-template-columns: 120px auto;
  @media (max-width: 800px) {
    display: block;
    margin: auto;
    width: 90%;
    text-align: center;
  }

  img {
    margin-right: 20px;
    width: 100px;
    height: 100px;
    @media (max-width: 800px) {
      width: 80px;
      height: 80px;
      margin: 30px 0;
    }
  }

  h1 {
    letter-spacing: 2px;
    font-size: 3.6rem;
    @media (max-width: 800px) {
      font-size: 3rem;
    }
  }

  h4 {
    letter-spacing: 1px;
    font-size: 2.3rem;
  }
}

/* Меню-навігації для усіх сторінок окрім головної */
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
    border-bottom: 1px solid white;
    color: white;
    font-weight: 600;
    @media (max-width: 1100px) {
      text-align: center;
      padding-bottom: 20px;
    }

    a {
      color: white;
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

  img {
    width: 45px;
    height: 45px;
    opacity: 0.9;
    @media (max-width: 800px) {
      width: 40px;
      height: 40px;
    }
    @media (max-width: 350px) {
      width: 25px;
      height: 25px;
    }
  }
}

/* Меню-навігації для головної сторінки */
div.main {
  width: 70%;
  margin: 50px auto;
  text-align: center;
  color: #184a77;

  .links {
    width: 100%;
    cursor: pointer;
    margin: 30px 0;
    display: grid;
    grid-template-columns: 120px auto;

    img {
      width: 60px;
      height: 60px;
    }

    .icon-description {
      display: flex;
      width: max-content;

      p {
        margin: auto 0;
        text-align: left;
        text-transform: uppercase;
        font-weight: 700;
      }
    }
  }
}

//ІНШЕ
// old styles from App.vue file
.text {
  //margin: 2em 25% 1em 25%;
  position: relative;
  line-height: 1.5;
  font-size: 1.15em;
}

ul {
  margin-bottom: 50px !important;
  /*margin: 2em 25% 0 25%;
    line-height: 1.5em;
    font-size: 1.15em; */
}

a.linkToAnotherPage {
  color: $blue;
  font-size: 1.15em;
  font-weight: bold;
}

h2.text {
  font-size: 2em;
  margin-top: 50px;
  font-weight: bold;
}

h3.text {
  margin-top: 30px;
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
  color: $blue;
}

div.parallelPlotOblast {
  display: flex;
  @media (max-width: 800px) {
    display: block;
  }

  p {
    margin-left: 0;
  }

  div.multiselect {
    width: auto;
    height: auto;
    margin-left: 1em;
    @media (max-width: 800px) {
      width: 90%;
      margin: 30px 0;
    }
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
    background-color: $blue;
    border-color: $blue;
  }
}

a {
  color: black;
}

div.plot {
  text-align: center;

  .table {
    color: $blue;
  }
}

div.procurements {
  div.parallelPlot {
    margin-left: -60px;
    background-color: white;
    color: $blue;
    fill: $blue;
    display: grid;
    grid-template-columns: repeat(auto-fill, 400px);
    padding: 2em 0;
    //Для мобілки по 1 шт. в ряд
    @media (max-width: 800px) {
      grid-template-columns: repeat(auto-fill, 300px);
      margin-left: 0;
    }

    @media (max-width: 500px) {
      grid-template-columns: repeat(auto-fill, 300px);
      margin-left: -20px;
    }
  }

  p {
    padding: 0.5em 0;
    @media (max-width: 800px) {
      width: 90%;
      margin: 30px 0;
      padding: 0;
    }
  }

  h4 {
    padding: 0.5em 0;
    @media (max-width: 800px) {
      width: 90%;
      margin: auto;
      padding: 0;
    }
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
 */
}

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
  //background-color: #4555bd;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: $blue;
  fill: $blue;
  @media (max-width: 800px) {
    display: block;
  }

  .barchartContainer {
    grid-column: span 1;
    width: 100%;
  }
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

// таблиця
</style>

