<template>
  <div>
    <v-map :zoom="zoom" :center="location" ref="myMap" :style="`height: ${900}; width: 100%`">
      <!-- <v-protobuf url="https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf" :options="opts"></v-protobuf> -->
      <v-geosearch :options="geosearchOptions"></v-geosearch>
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <!-- :style="`height: ${height}; width: ${width}`" -->
      <l-circle
        v-for="(d,i) in apteky"
        v-bind:key="i"
        :lat-lng="[d.nszu_geocoding_google_api_lat, d.nszu_geocoding_google_api_lng]"
        :radius="10"
        :color="'#77184a'"
        :fill="true"
        :fillColor="'#77184a'"
        :style="{'fillColor': '#77184a'}"
      >
      <l-popup :content="`<p>Назва мережі: ${d.legal_entity_name}</p><p>Відділення: ${d.division_name}</p></p><p>Адреса: ${d.division_residence_addresses.split(', ').slice(2).join(', ')}</p>`"></l-popup>
      </l-circle>
      <l-circle
        v-for="(d,i) in hospitals"
        v-bind:key="i+'b'"
        :lat-lng="[d.nszu_geocoding_google_api_lat, d.nszu_geocoding_google_api_lng]"
        :radius="sizeScale(d.division_decl_sum)"
        :color="'#184a77'"
        :stroke="true"
        :wight="0.00005"
        :fill="true"
        :fillColor="'#184a77'"
        :fillOpacity="0"
        :style="{'fillColor': '#184a77'}"
      >
        <l-popup :content="`<p>Лікарня: ${d.division_name}</p><p>Пацієнтів: <b>${Math.trunc(d.division_decl_sum)}</b></p>`"></l-popup>
      </l-circle>
    </v-map>

    <!-- <p>{{hospitals[0]}}</p> -->

    <!-- <multiselect
      :hide-selected="true"
      placeholder="Шукати"
      deselect-label
      select-label
      :allow-empty="false"
      @search-change="searchResult"
      v-model="search"
      :options="names"
    ></multiselect>
    <p>{{ result }}</p> -->
  </div>
</template>

<script>
import * as d3 from "d3";
import { LMap, LTileLayer, LCircleMarker, LPopup, LCircle } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Multiselect from "vue-multiselect";
// import Vue2Leaflet from 'vue2-leaflet'
import * as Vue2Leaflet from "vue2-leaflet"; // VALID
import Vue2LeafletVectorGridProtobuf from "@/components/VectorGrid.vue";
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
      // width: 1000,
      // height: 500,
      opts: vectorTileOptions,
      options: {
        vectorTileLayerStyles: {}
      },
      search: "",
      l: [50.31322, 30.319482],
      result: [],
      geosearchOptions: {
        // Important part Here
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        position: 'topright',
      },
      zoom: 13,
      // location: [50.31322, 30.319482],
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    };
  },
  mounted() {
    // this.width = window.innerWidth
    // this.height = window.innerHeight
    // bus.$on('zoom-map', function(data) {

    // })

    var legend = L.control({ position: "topright" });

    legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += '<i style="background: #184a77"></i><span>Лікарні</span><br>';
      div.innerHTML += '<i style="background: #77184a"></i><span>Аптеки</span><br>';
      
      

      return div;
    };

    legend.addTo(this.$refs.myMap.mapObject);
  },
  computed: {
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
    sizeScale(x) {
      const that = this
      var scale = d3.scaleLinear().domain([1, that.maxPeople])
        .range([20, 150]);

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
    "v-map": LMap,
    LTileLayer,
    LCircle,
    LPopup,
    Multiselect,
    VGeosearch,
    Vue2Leaflet,
    Vue2LeafletVectorGridProtobuf,
    "v-protobuf": Vue2LeafletVectorGridProtobuf
  }
};
</script>


<style>
@import "~leaflet/dist/leaflet.css";
@import "https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css";
</style>

// <style lang="scss">
// @import "~leaflet/dist/leaflet.css";

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