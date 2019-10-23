<template>
  <div>
    <p>Here</p>
    <Rose :roseWidth="200" :roseHeight="200" :hospitals="pmd" />
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
    //   roseWidth: 100,
    //   roseHeight: 100,
    };
  },
  components: {
    Rose
  },
  methods:{
      project(lat, lng) {

        var x = (lng + 180) * (this.roseWidth / 360);
        // convert from degrees to radians
        var latRad = lat * Math.PI / 180;
        // get y value
        var mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
        var y = (this.roseHeight / 2) - (this.roseWidth * mercN / (2 * Math.PI));

        return x,y

      }
  },
  created() {
    let that = this;
    Promise.all([d3.csv("data/pmd_all_contracted_legal_entities.csv"), 
    d3.csv("data/pharmacy_all_contracted_legal_entities.csv"),
    d3.json("data/hospitals_and_pharmacies.json")])
      .then(function(files) {
        // files[0] will contain file1.csv
        // files[1] will contain file2.csv
        that.pmd = files[0]
        that.apteka = files[1]
        that.network = files[2]
      })
      .catch(function(err) {
        // handle error here
      });




  }
};
</script>

<style lang="scss">
</style>