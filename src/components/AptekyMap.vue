<template>
  <div>
    <v-map :minZoom="8" @update:zoom="catchZoom" :options="{preferCanvas: true}" :zoom="zoomInit" :center="location" ref="myMap" :style="`height: ${900}; width: 100%`">
      <!-- <v-protobuf url="http://127.0.0.1:8080/tiles/{z}/{x}/{y}.pbf" :options="opts"></v-protobuf> -->
       <v-geosearch :options="geosearchOptions"></v-geosearch> 
       <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer> 

             <l-circle 
        ref="BufferCircle"
        :lat-lng="[0,1]"
        :radius="7000"
        :weight="0"
        :color="'#184a77'"
        :fill="true"
        :fillColor="'#184a77'"
      >
      </l-circle>
      
      <l-circle
        @ready="mapIsReady"
        ref="hospitalsLayer"
        v-for="(d,i) in hospitals"
        v-bind:key="i+'b'"
        :lat-lng="[d.nszu_geocoding_google_api_lat, d.nszu_geocoding_google_api_lng]"
        :radius="sizeScale(d.division_decl_sum)"
        :color="'#184a77'"
        :stroke="true"
        :weight="5"
        :wight="0.00005"
        :fill="true"
        :fillColor="'#184a77'"
        :fillOpacity="0"
        @click="clickOnCircle(d)"
        :style="{'fillColor': '#184a77'}"
      >
        <l-popup class="hospitalPopUp" 
        :content="`<div><span class='hospitalPopUp'>Медичний заклад</span><span>: 
          ${d.legal_entity_edrpou}, ${d.legal_entity_name}</span>
          <p>Відділення: ${d.division_name}</p>
          <p>Пацієнтів підписали декларації: 
            <b>${Math.trunc(d.division_decl_sum)}</b></p> 
            <p>Адреса: ${d.division_residence_addresses}</p> </div>`"></l-popup>
      </l-circle> 
      

        <l-circle
        v-for="(d,i) in apteky"
        v-bind:key="i"
        :lat-lng="[d.nszu_geocoding_google_api_lat, d.nszu_geocoding_google_api_lng]"
        :radius="80"
        :stroke="true"
        :color="'#f54275'"
        :opacity="0.8"
        :weight='8'
        :fill="true"
        :fillOpacity="0.9"
        :fillColor="'#f54275'"
        :style="{'fillColor': '#77184a'}"
      > 
      <l-popup :content="`<span class='aptekyPopUp'>Назва мережі</span>
      <p>Відділення: ${d.division_name}</p></p>
      <p>Адреса: ${d.division_residence_addresses}</p>
      <p>Відпущено ліків за програмою: ${Math.round(d.count_prescription)}</p> 
      <span>Назва мережі: ${d.legal_entity_edrpou}, ${d.legal_entity_name}</span>
      <p>Виплати мережі: ${formatNumber().format(d.total_sum)} грн.</p>
      <p>Кількість аптек в мережі: ${d.number_of_divisions}</p>
      `">
      </l-popup>
      </l-circle>  -->

<!-- 
       <l-circle 
        ref="selectedApteka"
        :lat-lng="[0,1]"
        :radius="200"
        :weight="0"
        :color="'#184a77'"
        :fillOpacity="1"
        :fill="true"
        :fillColor="'green'"
      >
      </l-circle>  -->

    </v-map>

  </div>
</template>

<script>
import * as d3 from "d3";
import { LMap, LTileLayer, LCircleMarker, LPopup, LCircle } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Multiselect from "vue-multiselect";
// import Vue2Leaflet from 'vue2-leaflet'
import * as Vue2Leaflet from "vue2-leaflet"; // VALID
import MapComponent from "@/components/MapComponent.vue";
import { canvas, popup } from 'leaflet';
// import Vue2LeafletVectorGridProtobuf from "@/components/VectorGrid.vue";
import vectorStyle from "../styles";
import VGeosearch from "vue2-leaflet-geosearch";
import { bus } from "../main";


const vectorTileOptions = {
  attribution: "© ESRI",
  vectorTileLayerStyles: vectorStyle,
  interactive: true,
  getFeatureId: function(feature) {
    return feature.properties;
  }
};

export default {
  props: {
    apteky: Array,
    hospitals: Array,
    location: Array,
  },
  data() {
    return {
      selectedApt: {},
      // width: 1000,
      canvas: canvas,
      // height: 500,
      selectedElement: [1,3],
      opts: vectorTileOptions,
      options: {
        vectorTileLayerStyles: {}
      },
      search: "",
      l: [],
      result: [],
      geosearchOptions: {
        // Important part Here
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        position: 'topright',
      },
      zoom: 13,
      zoomInit:13,
      // location: [50.31322, 30.319482],
      url:
        "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    };
  },
  mounted() {
    const that = this;

    var legend = L.control({ position: "topright" });

    legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "legend");
      // div.innerHTML += "<h5>Легенда</h5>";
      
      div.innerHTML += '<i style="border: 2px solid #184a77"></i><span>Лікарні</span><br>';
      div.innerHTML += '<i style="background: #f54275"></i><span>Аптеки</span><br>';
      
      

      return div;
    };

    bus.$on('select-apteka', function(coords){
      console.log(coords[2]);

      const d = coords[2];
      that.$refs.myMap.mapObject.setView(new L.LatLng(coords[0], coords[1]), 14);
      // that.$refs.selectedApteka.mapObject.setLatLng([coords[0], coords[1]])
      // that.selectedApt = coords[2]

      // console.log(coords[1][2])

      let format = d3.format(",")

      popup()
        .setLatLng([coords[0], coords[1]])
        .setContent(`<span class='aptekyPopUp'>Назва мережі</span>
      <p>Відділення: ${d.division_name}</p></p>
      <p>Адреса: ${d.division_residence_addresses}</p>
      <p>Відпущено ліків за програмою: ${Math.round(d.count_prescription)}</p> 
      <span>Назва мережі: ${d.legal_entity_edrpou}, ${d.legal_entity_name}</span>
      <p>Виплати мережі: ${format(d.total_sum)} грн.</p>
      <p>Кількість аптек в мережі: ${d.number_of_divisions}</p>
      `)
        .openOn(that.$refs.myMap.mapObject);
    })

    // that.$refs.hospitalsLayer.on('click', () => alert('gdfgdg'))

    legend.addTo(this.$refs.myMap.mapObject);

  },
  computed: {
    // zoomLevel: function() {
    //   return this.$refs.myMap.mapObject.getZoom()
    // },
    width: function() {
      return window.innerWidth
    },
    height: function() {
      return window.innerHeight
    },
    names: function() {
      return this.result.map(d => d.input);
    },
    maxPeople: function() {
      return d3.max(this.hospitals.map(d => d.division_decl_sum));
    }
  },
  methods: {
    mapIsReady() {
      bus.$emit('map-is-ready')
    },
    catchZoom(x) {
      this.zoom = this.$refs.myMap.mapObject.getZoom();
    },
    clickOnCircle(circle){
      // this.selectedElement = [circle.nszu_geocoding_google_api_lat, circle.nszu_geocoding_google_api_lng];
      this.$refs.BufferCircle.mapObject.setLatLng([circle.nszu_geocoding_google_api_lat, circle.nszu_geocoding_google_api_lng])

      
    // var point = turf.point([-90.548630, 14.616599]);
    // var buffered = turf.buffer(point, 7, {units:'kilometers'});
    // var bbox = turf.bbox(buffered);
    // console.log(turf.bboxPolygon(bbox));
    },
    formatNumber() {
      let format = d3.format(",");
      return { format };
    },
    sizeScale(x) {
      const that = this
      var scale = d3.scaleLinear().domain([1, parseFloat(that.maxPeople)])
        .range([60, 320]);

      return scale(x)  
    },
    async searchResult(searchQuery) {
      const provider = new OpenStreetMapProvider();
      const that = this;

      const results = await provider.search({ query: searchQuery });
      console.log(results);
      that.result = results;
    }
  },
  components: {
    "v-map": MapComponent,
    LTileLayer,
    LCircle,
    LPopup,
    Multiselect,
    VGeosearch,
    Vue2Leaflet,
    // Vue2LeafletVectorGridProtobuf,
    // "v-protobuf": Vue2LeafletVectorGridProtobuf
  }
};
</script>


<style>
@import "~leaflet/dist/leaflet.css";
@import "https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css";
</style>

// <style lang="scss">
// @import "~leaflet/dist/leaflet.css";

.hospitalPopUp {
  color: #184a77;
  font-weight: 550;
}
.aptekyPopUp {
  color: #f54275;
  font-weight: 550;
}
.legend {
  background: rgba(255,255,255,0.8);
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  border-radius: 5px;
  padding: 6px 8px;

  i {
    width: 15px;
    height: 15px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
    border-radius: 50%;
  }
}

div.results.active {
    width: 200px
}

div.leaflet-popup-content p {
  margin: 0;
}
//
</style>