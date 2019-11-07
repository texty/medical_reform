<template>
  <div>
    <v-map :zoom="zoom" :center="l" ref="myMap" style="height: 850px; width: auto">
      <!-- <v-protobuf url="https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf" :options="opts"></v-protobuf> -->
      <v-geosearch :options="geosearchOptions"></v-geosearch>
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-circle-marker
        v-for="(d,i) in apteky"
        v-bind:key="i"
        :lat-lng="[d.nszu_geocoding_google_api_lat, d.nszu_geocoding_google_api_lng]"
        :radius="1"
        :color="'red'"
        :fill="true"
        :fillColor="'red'"
        :style="{'fillColor': 'red'}"
      ></l-circle-marker>
      <l-circle-marker
        v-for="(d,i) in hospitals"
        v-bind:key="i+'b'"
        :lat-lng="[d.nszu_geocoding_google_api_lat, d.nszu_geocoding_google_api_lng]"
        :radius="3"
        :color="'blue'"
        :fill="true"
        :fillColor="'red'"
        :style="{'fillColor': 'red'}"
      >
        <l-popup :content="`<p>Лікарня: ${d.division_name}</p><p>Пацієнтів: <b>${Math.trunc(d.division_decl_sum)}</b></p>`"></l-popup>
      </l-circle-marker>
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
import { LMap, LTileLayer, LCircleMarker, LPopup } from "vue2-leaflet";
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
      opts: vectorTileOptions,
      options: {
        vectorTileLayerStyles: {}
      },
      search: "",
      l: location,
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
    bus.$on('zoom-map', function(data) {
      this.l = data;
      // alert(data)
      alert(this.$refs.myMap.mapObject.getCenter())
    })
  },
  computed: {
    names: function() {
      return this.result.map(d => d.input);
    }
  },
  methods: {
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
    LCircleMarker,
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
div.results.active {
    width: 200px
}

div.leaflet-popup-content p {
  margin: 0;
}
//
</style>