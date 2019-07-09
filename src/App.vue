<template>
  <div id="app">

  <Scrollama 
      :offset="0.9"
      @step-enter="({ element }) => (currStep.push(element.dataset.stepNo))"
  >

    <div class="header">
      
    </div>

    <p class="text">
      Згідно <a href="https://dif.org.ua/article/koruptsiya-u-povsyakdennomu-zhitti-ukraintsiv-za-shcho-daemo-khabari-komu-i-chomu345654">опитувань</a>, що відбувалися до початку медичної реформи (і на перших її етапах) жителі Україні називали медицину найбільш корумпованою сферою їх життя. За зовнішнім фасадом безкоштовної державної медицини ховалося багато прихованих платежів, “тіньових” витрат для пацієнтів. У цій  ситуації особливо потерпали найбільш вразливі громадяни: люди похилого віку, діти, пацієнти з хронічним хворобами. 
    </p>

    <p class="text">
      На практиці громадяни платили за ліки, обстеження, платили лікарям і медичному персоналу. У цій  ситуації особливо потерпали найбільш вразливі громадяни: люди похилого віку, діти, пацієнти з хронічним хворобами. Витрати для них були найбільшими і вони не могли розраховувати на підтримку з боку держави.
    </p>

    <p class="text">
      Три четвертини опитаних сказали, що давали гроші або інші цінності своєму лікарю. Одна з причин чому так відбувалося — неефективна система фінансування лікарень. Тому у кінці 2016 року Міністерство охорони здоров’я розпочало масштабну реформу медичної системи. У реформи були три основних цілі, змінити принцип фінансування лікарень на “гроші йдуть за пацієнтом”,  надало лікарням автономію та створило єдиного замовника медичних послуг - <a href="https://www.kmu.gov.ua/ua/diyalnist/reformi/rozvitok-lyudskogo-kapitalu/reforma-sistemi-ohoroni-zdorovya">Національну службу здоров’я</a>.  
    </p>

    <h2 class="text">
      <b>Які дані використовували?</b>
    </h2>

    <p class="text">
        Ми зробити цей проект на основі відкритих даних Національної служби здоров’я України (НСЗУ). Відкриті дані — це публічна інформація у форматах, які дозволяють її автоматичну обробку. Доступ до цих даних та їх використання вільні та безоплатні.
    </p>

    <p class="text">
        В Україні відкриті дані на державному рівні почали підтримувати у 2015 році. Тоді Кабінет Міністрів України ухвалив Постанову №835, яка визначила, якими мають бути відкриті дані, встановила 300 обов’язкових до публікації наборів даних та вказала, хто їх публікуватиме і на яких умовах. 
    </p>

    <p class="text">
      Сьогодні громадяни України отримують доступ до даних про фінансування первинної ланки медицини. Це стало можливим завдяки співпраці НСЗУ з Державним агентством з питань електронного урядування за підтримки проекту USAID/UK aid “Прозорість та підзвітність у публічному управлінні та послугах/TAPAS”.
    </p>

    <p class="text">Для цього проекту ми проаналізували такі відкриті дані:</p>
      <ul class="text">
         <li>кількість підписаних декларацій з лікарями;</li>
         <li>перелік лікарень, що підписали договір з НСЗУ;</li>
         <li>щомісячні виплати лікарням від НСЗУ за надані послуги. </li>
      </ul>


    <h2 class="text">
      <b>Як змінилася медицина після реформи?</b>
    </h2>

    <p class="text">
      Першою ланкою медичної системи є сімейні лікарі. Вони найбільше контактують з пацієнтами, діагностують хвороби, а також надають направлення до інших лікарів.  Що за платять лікарям першої ланки? За те скільки людей підписали з ними декларацію і обрали в якості сімейного лікаря. Оскільки люди звертаються до сімейних лікарів з різною регулярністю, платять саме за пацієнтів, а не за кількість прийомів чи просто за те, що лікар займає посаду.
    </p>

    <p class="text">
      В суму яку вони отримують входить також плата за деякі види ліків та аналізів. Окрім цього тарифи для лікарень розраховують так, щоб вони мали змогу найняти додаткових медсестер і медбратів, технічний персонал та працювати як неприбуткове підприємство. Ми дослідили які зміни відбулися в першій ланці медичного обслуговування після старту реформи. Обирайте область і ви зможете поревірити скільки людей підписали декларацію в кожному її районі. Районі поєднані з великими містами, що розташовані на їх території.
    </p>

    <HorizontalBarChart 
      v-bind:temp="loadData" 
      v-bind:variable="selectedVariable" 
      class="step"
      :class="{ active: 1 == currStep }"
      data-step-no="1"
      v-bind:to-draw="currStep.includes('1')"
      />

    <p class="text">
      Перш за все, ми вирішили порахувати скільки людей підписали декларації в масштабах країни. Для цього ми розрахували який відсоток від населення районів і міст України підписали декларації у лікарнях, що знаходяться на їх території.  Середній показник по країні склав 70% тих хто підписав декларації. Варто врахувати, що люди інколи звертаються до лікарів не у своєму районі, особливо якщо живуть поряд з великими містами.
    </p>

    <p class="text">
      Найменший відсоток підписаних декларацій - на Півдні країни, в середньому - 65%. Саме на Півдні знаходиться половина з районів, де декларацію підписали менше половини населення. Більшість людей звертається за допомогою до комунальних лікарень. Лише жителі обласних центрів та деяких великих міст можуть звертатися як до комунальних медичних закладів, так і до приватних клінік та лікарів-підприємців (ФОПів). За кількістю приватних клінік, що підписали договір з НСЗУ після Києва і Дніпра, на третьому місце знаходиться Суми.
    </p>

    <p class="text">
        Приватні клініки і ФОПи відрізняються від комунальних за багатьма ознаками. На одного лікаря у приватних закладах припадає в середньому 500 пацієнтів, в той час як у комунальний більше тисячі. Також приватні заклади гнучкіші, їм не треба платити за утримання непотрібних великих будівель, вони можуть швидко наймати і звільняти персонал та пристосовуватися до потреб ринку. 
    </p>

    <p class="text">
        Те, що є поряд з комунальними є приватні лікарні робить медичну систему гнучкішою до потреб пацієнтів і створює конкуренцію. Необхідність боротися за пацієнтів і за ресурси стимулює всіх учасників ринку до того, щоб розвиватися і бути ефективними.
    </p>

    <p class="text">
        Окрім, конкуренції важливим показником, що впливає на якість медичних послуг є співвідношення між кількістю населення та кількістю лікарів.  У середньому в країні воно складає близько 5 лікарів на 10 тисяч чоловік. Цей показник дещо вищий на Заході та нижчий на Півдні. Тому у більшості регіонів люди мають однаковий доступ до медичних послуг. Але площа районів дуже дуже відрізняється. У сільській місцевості людям потрібно долати більшу відстань для того, щоб потрапити до лікаря ніж у місті.
    </p>

    <p class="text">
      Важливою сферою на яку вплинула реформа стали закупівлі лікарень. Ми можемо відслідкувати лише те, що купують комунальні лікарні, бо вони зобов’язані проводити свої закупівлі через Prozorro. Водночас комунальні медичні заклади складають більшість лікарень, тому ми можемо оцінити, що відбувалося у галузі закупівель за роки реформи.
    </p>


    <div class="procurements step"
      data-step-no="2"
      :class="{ active: 2 == currStep }"
    >
        <h4><b>Порівняння закупівель лікарень за 2017-2019 роки в різних областях</b></h4>
        
        <div class="parallelPlotOblast">
          <p><i>Графіка інтерактивна, наведіть мишкою на лінію, щоб побачити назву області</i></p>
         <multiselect v-model="selectedOblast" :options="oblast_names"></multiselect>
        </div>
       
      <div class="parallelPlot"> 

<!--       <div class="parallelPlotSelect">
      <p>Виберіть область</p>
      <multiselect v-model="selectedOblast" :options="oblast_names"></multiselect>
      </div> -->
    
      <ParallelPlot
        class='line'
        v-for="(d,i) in selectedProcurement"
        v-bind:key="i"
        :name="d.key"
        :inputData="d.values"
        :svgParameters="{width: '100%',height: '100%'}"
        :selectedOblast="selectedOblast"
      />    
      </div> 

    </div> 

    <p class="text">
      Якщо порівняти перші квартали 2017 і 2019 років, більше почали купувати комп’ютерних систем, медичного обладнання, а також меблів,  пожежних систем, кондиціонерів. Це свідчить про те, що лікарні намагаються з користю використати гроші, що надійшли від реформи і вкласти їх у розвиток. Також лікарні почали частіше платити за ремонти, реконструкцію і будівництво, що теж свідчить про те, що гроші від реформи витрачаються на розвиток.
    </p>

    <p class="text">
Найбільше і найрівномірніше зросли витрати на комп’ютери та електронні системи для лікарень, оскільки це вимога реформи. Охорона здоров’я рухається в сторону цифровізації процесів, створення електронних кабінетів лікарів, електронних карток пацієнтів, електронних рецептів та системи направлень. Ви можете скористатися таблицею внизу, що самостійно перевірити, що купують лікарні. Введіть в поле пошуку назву лікарні або товару, що вас цікавить. У таблиці є 100 найбільших закупівель у кожній категорії.    </p>


    <div class="tableAndName">
        <h4><b>Таблиця закупівель</b></h4>
        <Table :cpv="codesCPV" class="tableContainer" :rows="tableData" />
    </div>
    
    <p class="text">
      Також ми вирішили дізнатися скількома пацієнтами зазвичай опікується один лікар, та скільки він за це отримує. Найбільше серед 20 тисяч лікарів першої ланки сімейних лікарів. МОЗ рекомендує одному лікарю мати 1800 пацієнтів. За це, лікар або лікарня отримає близько 100 тисяч гривень. В ці гроші входить як зарплата лікаря так і допоміжного аналізу, вартість деяких ліків і аналізів та утримання лікарні загалом. Як саме витрачати кошти і чому віддати пріоритет вирішує сама лікарня.
    </p>

    <p class="text">
      <a    href="http://moz.gov.ua/article/reform-plan/skilki-groshej-otrimajut-medzakladi-pervinki-za-obslugovuvannja-pacientiv">Базовий тариф</a> на оплату послуг первинної медичної допомоги становить 370 грн/рік за одного пацієнта. Вікові коефіцієнти можуть збільшувати цю суму: у 4 рази - для пацієнтів-дітей від 0 до 5 років, у 2 рази - для пацієнтів старше 65 років. Найменше платять за пацієнтів віком 18 - 39 років (коефіцієнт = 1).  Залежно від профілю, у лікарів можуть бути різна кількість пацієнтів. 
    </p>


    <div class="finalBars step"
      data-step-no="2"
      v-bind:to-draw="currStep.includes('2')"
    >
    <BarChart 
      data-step-no="2"
      v-bind:to-draw="currStep.includes('2')"
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'decl_count'" />
    
    <BarChart 
      data-step-no="3"
      v-bind:to-draw="currStep.includes('3')"
      v-bind:temp="payments"
      v-bind:oblast="selectedOblast"
      v-bind:variable="'money_per_month'" />

    </div>

  </Scrollama>


  </div>
</template>

<script>
import * as d3 from "d3";
import Multiselect from 'vue-multiselect'
import 'intersection-observer' // for cross-browser support
import Scrollama from 'vue-scrollama'


import HorizontalBarChart from './components/HorizontalBarChart.vue'
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import ParallelPlot from './components/ParallelPlot.vue'
import Table from './components/Table.vue'



import data from './assets/rajon_stats.json'
import procurement from './assets/procurement_with_regions.json'
import payments from './assets/payments_to_hospitals.json'
import doctorPayments from './assets/payments_to_doctors.json'
import procuramentPivot from './assets/procurements_pivot_with_regions.json'
import tableData from './assets/top_100_per_category.json'
import cpv from './assets/cpv.json'







export default {
  name: 'app',
  data() {
    return {
      variables: ['doctors_to_people_ration', 'decl_count'],
      selectedVariable:'declarations_ratio',
      selectedOblast: 'Чернігівська',
      selectedProcurementTypes: [{'name': 'Ремонти', 'code': 'type:45'}, 
      {'name':'Щось там', 'code':'type:30'},
       {'name':'Будівництво', 'code':'type:44'}],
      loadData: data,
      loadProcurements: procuramentPivot,
      loadProcurementPivot: procuramentPivot,
      payments: doctorPayments,
      tableData: tableData,
      codesCPV: cpv,
      chartWidth: 0,
      currentValue: null,
      itemCount: 25,
      min: 10,
      max: 100,
      currStep: [],
    };
  },
  mounted() {
    console.log('App loaded');
    /* this.fetchData(); */
  },
  methods: {
    onSelect(value) {
      this.currentValue = value;
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
      }

      this.allProcurement.push(tag)
      this.selectedProcurementTypes.push(tag)
    },
    stepEnterHandler ({element, index, direction}) {
      // handle the step-event as required here
      console.log(element, index, direction)
    }
/*     async fetchData() {
      let procurements = await d3.csv("./procurement_with_regions.csv");

      this.loadProcurements = procurements;
    } */
  },
  computed: {
    oblast_names: function() {
      return [...new Set(this.loadData.map(d => d.oblast))]
    },
    totalProcurements: function() {
      let total = d3.nest().key(d => d.id_item_short).key(d => d.date_month).rollup(function(leaves) { 
        return leaves.map(d => d.sum).reduce((a, b) => a + b);
       }).entries(this.loadProcurements)
       .map(function(group) {
        return {
          key: group.key,
          values: group.values.map(d => {
              return {
                date_month: d.key,
                sum: d.value
              }
          }),
        }
      })
    

      return { 'key': 'Україна',
        'values': total
       }
    },
    nestedProcurement: function() {
      let nest = d3.nest()
        .key(d => d.id_item_short)
        .key(d => d.oblast)
        .rollup(function(leaves) { 
          return {
            2017: d3.sum(leaves, function(d){ return d[2017] }),
            2019: d3.sum(leaves, function(d){ return d[2019] })
           }; 
        })
        .entries(this.loadProcurementPivot.filter(d => d.oblast != null))

      return nest;
    },
    selectedProcurement: function() {
      let selectedOblast = this.selectedOblast
      let selectedProcurementTypes = this.selectedProcurementTypes
      let data = this.nestedProcurement.filter(function(d) {
        return d.values.length > 10
      })

      let selectedData = data.filter(function(d) {
      return ['type:48', 'type:51', 'type:45',
                        'type:35','type:38',
                        /* 'type:70' */, 'type:42',
                        'type:39', 'type:30'].includes(d.key);

      return d.key
      });


      /* let selectedProcurementType = selectedOblastData.values.filter(function(d) {
          return  selectedProcurementTypes.includes(d.key)
      }); */

      return selectedData
    },
    allProcurement: function() {
      return this.nestedProcurement.map((d) => {
          return {'name': d.key};
        })
    }
/*     unnestedProcurements: function() {
      var a = [];
      this.nestedProcurement.map(d => d.values).forEach(d => d.forEach(dd => a.push(dd)))
      return a;
  
    } */
  },
  components: {
    Multiselect,
    LineChart,
    HorizontalBarChart,
    BarChart,
    ParallelPlot,
    Table,
    Scrollama
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="sass">

* 
  /* border: 1px solid #f00 */
/*   transition: all 3s
 */
body
  margin: 0

div.header
  min-height: 100vh
  background-image: url("./assets/med.gif")
  background-repeat: no-repeat
  background-size: cover
  background-position: center

.text
  margin: 2em 25% 1em 25%
  line-height: 1.5
  font-size: 1.15em
  a
    color: #4555bd
  ul
    margin: 2em 25% 0 25%
    line-height: 1.5
    font-size: 1.15em


div.selectorOblast
  background-color: white
  padding-top: 1em
  padding-bottom: 1em

  h5
    display: flex
    align-items: center
    justify-content: center

path
  stroke-color: white

div.parallelPlotOblast
    display: flex

    p
      margin-left: 3.35em

    div.multiselect
      width: auto
      height: auto
      margin-left: 1em



div.tableAndName  h4
    padding-left: 1rem
    /* padding-bottom: 16px */

div.tableContainer.container-fluid
  padding: 0
  margin: 0
  color: white



  .table
    color: white

div.tableNavigation .row
  color: black
  width: 100%

  legend
    font-weight: bold
    padding-left: 1em
  
  input
    width: auto

  .page-item.active .page-link
    background-color: #4555bd
    border-color: #4555bd
  
  a
    color: black


div.plot
  background-color: #4555bd

  .table
    color: white

div.procurements
  div.parallelPlot
    background-color: #4555bd
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    padding: 2em 0

  p 
    padding: 0.5em 0em 0.5em 0.5em
  
  h4
    padding: 0.5em 2.7em

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  /* margin-top: 60px */
</style>

<style lang="sass" scoped>
h1, .content
  margin-left: 20px

label
  display: inline-block
  width: 150px

.area-chart
  height: 300px

div.line
  display: inline-block


div.finalBars
  background-color: #4555bd
  display: grid
  grid-template-columns: 1fr
  color: white
  fill: white


</style>
