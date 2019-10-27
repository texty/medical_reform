<template>
  <div>
    <p>Here</p>
    <Rose 
    v-for="(d, i) in network"
    v-bind:key="i"
    :roseWidth="200" :roseHeight="200" :hospital="d" />

<!--     <p 
    v-for="(d, i) in network.slice(0,1)"
    v-bind:key="i"
    >
      {{ d.aptekaObjects[0] }}
    </p> -->
  </div>
</template>

<script>
import Rose from "./Rose.vue";
import * as d3 from "d3";
// import pmd from '@/assets/pmd_all_contracted_legal_entities.csv'
// import apteka from '@/assets/pharmacy_all_contracted_legal_entities.csv'
// import network from '@/assets/hospitals_and_pharmacies.json'

export default {
  data() {
    return {
      pmd: null,
      apteka: null,
      network: null,
      aptekyNested: null
      //   roseWidth: 100,
      //   roseHeight: 100,
    };
  },
  computed: {},
  components: {
    Rose
  },
  methods: {
    project(lat, lng) {
      var x = (lng + 180) * (this.roseWidth / 360);
      // convert from degrees to radians
      var latRad = (lat * Math.PI) / 180;
      // get y value
      var mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
      var y = this.roseHeight / 2 - (this.roseWidth * mercN) / (2 * Math.PI);

      return x, y;
    }
  },
  created() {
    let that = this;
    Promise.all([
      d3.csv("data/pmd_all_contracted_legal_entities.csv"),
      d3.csv("data/pharmacy_all_contracted_legal_entities.csv"),
      d3.json("data/hospitals_and_pharmacies.json")
    ])
      .then(function(files) {
        // files[0] will contain file1.csv
        // files[1] will contain file2.csv
        that.pmd = files[0];
        that.apteka = files[1];
        /* that.network = files[2]; */

        that.aptekyNested = d3
          .nest()
          .key(function(d) {
            return d.division_id;
          })
          .map(that.apteka);

        that.network = files[2].map(d => {
          return {
            ...d,
            ...{
              aptekaObjects: d.pharmas.map(dd => {
                return that.aptekyNested.get(dd)[0];
              })
            }
          };
        }).slice(0,10);


      })
      .catch(function(err) {
        // handle error here
      });
  }
};
</script>

<style lang="scss">
</style>