<template>
  <div>
    <Header></Header>
    <Navigation></Navigation>
    <div class="main" :style="{'margin-left': leftHeaderMargin, 'width': leftHeaderWidth, 'text-align':'left' }">
      <p class="text">Медична реформа — це важлива і водночас складна тема. Легко заплутатись у тому, звідки бере гроші лікарня, на що їх витрачає, скільки пацієнтів зазвичай обслуговує один лікар та як відрізняється прогрес медреформи по регіонах. До того ж, реформа ще не завершилась. У 2019 році закінчується перший етап — реформування первинної ланки, сімейної медицини.</p>
      <p class="text">Щоб зрозуміти, які зміни відбулися в медичній сфері за два роки реформи, ми створили серію візуалізацій на основі відкритих даних.
      З чого все починалось?</p>
      <p class="text">10 жовтня 2017 Верховна Рада ухвалила закон, який дав старт медичній реформі. Головна його мета — змінити принципи фінансування охорони здоров’я. Відтоді лікарні та лікарі-підприємці отримують гроші за реально надані послуги — операції, аналізи та за пацієнтів, що підписали з ними декларації. Гроші йдуть до лікарень напряму, розподіляє їх Національна служба здоров’я України (НСЗУ). Служба отримує гроші з державного бюджету і визначає, скільки потрібно платити за ті чи інші послуги. Вартість послуг пізніше затверджує Кабінет Міністрів.</p>
      <p class="text">Дані про реформу першого рівня медичного забезпечення стали доступними завдяки співпраці НСЗУ з Міністерством цифрової трансформації за підтримки проекту USAID/UK aid “Прозорість та підзвітність у публічному управлінні та послугах/TAPAS”. Завдяки цим даним і візуалізаціям на їхній основі ми можемо оцінити, як змінилась медицина від початку реформи.</p>
      <p class="text" style="margin-top:50px"><b>Що розповідають дані про реформу?</b></p>

      <div class="links">
        <router-link          
          tag="img"
          src="img/blue/declarations.png"
          :to="{ name: 'horizontal-bar' }"
        >Horizontal Bar</router-link>
                
        <div class="icon-description">
          <router-link tag="p"  :to="{ name: 'horizontal-bar' }"
          >Кількість підписаних декларацій</router-link>
        </div>
      </div>
      
      
<!--       <div class="links">
        <router-link          
          tag="img" 
          src="img/text_blue.png" 
          :to="{ name: 'text-element' }">Text</router-link>
        <div class="icon-description">
          <router-link tag="p" :to="{ name: 'text-element' }">Стаття з поясненнями</router-link>
        </div>
      </div> -->
      
      
      <div class="links">
        <router-link
          tag="img"
          src="img/blue/doctors+declarations.png"
          :to="{ name: 'bar-plots' }"
        >Bar Plots</router-link>
        <div class="icon-description">
          <router-link
            tag="p"
            :to="{ name: 'bar-plots' }"
          >Кількість декларацій по регіонах</router-link>
        </div>
      </div>

      <div class="links">
        <router-link
          tag="img"
          src="img/blue/doctors_tab.png"
          :to="{ name: 'doctors-table', params: { oblast: 'Київська' } }"
        >Doctors Table</router-link>
        <div class="icon-description">
          <router-link
            tag="p"
            :to="{ name: 'doctors-table', params: { oblast: 'Київська' } }"
          >Таблиця для вибору лікарів</router-link>
        </div>
      </div>

      <div class="links">
        <router-link
          tag="img"
          src="img/blue/hospitals_tab.png"
          :to="{ name: 'med-table', params: { oblast: 'Київська' } }"
        >Med Table</router-link>
        <div class="icon-description">
          <router-link tag="p" :to="{ name: 'med-table', params: { oblast: 'Київська' } }">Таблиця закупівель лікарень</router-link>
        </div>
      </div>

      <div class="links">
        <router-link
          tag="img"
          src="img/blue/procurement.png"
          :to="{ name: 'procurement_plots', params: { oblast: 'Київська' } }"
        >ParallelPlot</router-link>
        <div class="icon-description">
          <router-link
            tag="p"
            :to="{ name: 'procurement_plots', params: { oblast: 'Київська' } }"
          >Порівняння закупівель лікарень</router-link>
        </div>
      </div>
    </div>
     <Footer></Footer>
  </div>
 
</template>

<script>
//import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navigation,
    //Header,
    Footer
  },
  data() {
    return {
      leftHeaderMargin: '',
      leftHeaderWidth: '',
      color: "#184a77"      
    };
  },
  mounted: function() {
    this.getPos();
    this.$nextTick(function() {
      window.addEventListener("resize", this.getPos);
    });

    // $emit("size-event", this.leftHeaderMargin, this.leftHeaderWidth);

  },
  methods: {
    getPos: function() {
      var that = this;
      var headerBounding = document
        .querySelector("#headerBounding")
        .getBoundingClientRect();
      var left = headerBounding.left;
      var width = headerBounding.width ;
      that.leftHeaderMargin = left + 33 + "px";
      that.leftHeaderWidth = width - 50 + "px";
    },
    
  }
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
// styles only for Home.vue

.horizontalPlot {
  min-height:70vh;
}

$blue: #184a77;

body {
  margin: 0;
  line-height: 1.6;
}

h4.subtitle {
  color:$blue;
  text-align: left;
  margin: 0 0 20px 0;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Шапка із загом і підзагом */
div#top {
  padding: 30px 0;
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
    margin: auto 5%;
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

/* Меню-навігації для головної сторінки */
div.main {
  min-height:70vh;
  width: 70%;
  margin: 50px auto;
  text-align: center;
  //color: #184a77;

  .links {
    width: 100%;
    cursor: pointer;
    margin: 30px 0;
    display: grid;
    grid-template-columns: 120px auto;
    @media (max-width: 400px) {
      grid-template-columns: 120px;
    }

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
  text-align: left;
  position: relative;
  line-height: 1.5;
  font-size: 1.15em;
}

ul {
  margin-bottom: 50px !important;
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



//Horizontal bar plot
div.selectorOblast {
  background-color: white;
  padding-bottom: 1em;

  h4 {
    color:$blue;
    text-align: left;
    margin: 0 0 20px 0;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {    
    padding: 0.5em 0;
    margin-left: 0;
    font-size:18px;
    @media (max-width: 800px) {
      width: 90%;
      margin: 30px 0;
      padding: 0;
    }
  }

  div.multiselect {
    border: 1px solid $blue;
    //color: $blue;
    width: max-content;
    min-width:250px;
    height: max-content;
    margin-left: 1em;
    margin-right: 50px;
    @media (max-width: 800px) {
      width: 90%;
      margin: 30px 0;
      min-width:100px;
    }

    .multiselect__tags {
      border: 0;
      min-width:250px;
      @media (max-width: 800px) {  
        width:80%;      
        min-width:100px;
      }
    }
  }
  path {
    color: $blue;
  }
}

//Таблиця
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

  .page-link {
    border-radius: 0;
    color: $blue;
  }

  .page-item.active .page-link {
    background-color: $blue;
    border-color: $blue;
    color: white;
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

//закупівлі

  div.parallelPlotOblast {
    display:flex;
    @media (max-width: 800px) {
        display:block;
      }

    p {
      font-size: 18px;
    }

    .multiselect {
      border: 1px solid $blue;    
      width: max-content;
      min-width:250px;
      height: max-content;
      margin-left: 1em;
      margin-right: 50px;
      @media (max-width: 800px) {
        width: 90%;
        margin: 10px 20px 10px 0;
        min-width:100px;
      }
    }
  }


div.procurements {

  // margin-left: 5%;
  @media (max-width: 800px) {
      margin-left: 3%;
    }

  h4 {
    margin: 0 0 20px 0;
    letter-spacing: 1px;
    text-transform: uppercase;
    @media (max-width: 800px) {
      width: 90%;
      margin: 0;
      padding: 0;
      
    }
  }


  div.parallelPlot {
    margin: 0;
    //margin: auto;
    background-color: white;
    color: $blue;
    fill: $blue;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, max-content));   
    padding: 2em 0;
    
    //Для мобілки по 1 шт. в ряд
    @media (max-width: 800px) {
      grid-template-columns: repeat(auto-fit, minmax(350px, max-content));
      
    }

    @media (max-width: 500px) {      
      grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
      
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


}

//загальні?
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

// table.procurements {
//   @media (min-width:768px){ 
//   /* стовбчик 1 */  
//   th:nth-child(1){
//     width: 200px;
//     max-width: 200px;
//     text-align:center !important;
//     padding: 0;
//   }

//   td:nth-child(1) {  
//     width: 200px;
//     max-width: 200px;
//     text-align:center !important;
//     padding: 0;
//   }


//   /* стовбчик 2 */  
//   th:nth-child(2)  { 
//     width: auto;
//     text-align:center !important;
//     padding: 0;
//   }

//   td:nth-child(2) {    
//     width: auto;
//     text-align:left !important;
//     padding: 0;
//   }

//   /* стовбчик 3 */
//   th:nth-child(3) {
//     max-width: 150px;
//     width: 20%;    
//     text-align:center !important;
//     padding: 0;
//   }

//   td:nth-child(3) {
//     max-width: 150px;
//     width: 20%;    
//     text-align:center !important;
//     padding: 0;

//     input {
//       width:100%;
//       text-align: center;
//       color: $blue;
//     }
//   }
 
//   /* стовбчик 4 */
//   th:nth-child(4) {
//     width: 150px;
//     text-align:left !important;
//     padding: 0;
//   }

//   td:nth-child(4) {
//     width: 150px;
//     text-align:left !important;
//     padding: 0;   
//   }  
//  }
// }

.area-chart {
  height: 300px;
}

div.line {
  display: inline-block;
}


//vertical bar chart
div.finalBars {
  min-height:70vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  color: $blue;
  fill: $blue;
  @media (max-width: 800px) {
    display: block;
  }

  .barChartsTiles {
    height:50px;
    margin-left:50px;

    h4 {
      font-weight: bold;
      margin: 0 0 20px 0;
      font-size:20px;
      //letter-spacing: 1px;
      //text-transform: uppercase;
      @media (max-width: 800px) {
        width: 90%;
        margin: auto;
        padding: 0;      
      }
    }
  }

  .barchartContainer {
    grid-column: span 1;
    width: 100%;
  }
}


//інше
rect.bar:hover {
  fill: #05e3f4;
}

.resize-observer {
  display: none;
  height: 0;
}

table {
  text-align: center;
}

.tableNavigation div.navigationRow {
  display: flex;
  justify-content: center;
}

// таблиця
.multiselect__option--highlight {
  background: #7d7d7d !important;
}

@media(min-width:768px){
    tr {
      height:70px;
    }
}
.centered {
  text-align: center;
  
}

.leftaligned {
  text-align: left;
  min-height:70px;
}




</style>

