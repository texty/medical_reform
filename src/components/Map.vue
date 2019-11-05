<template>
<div>

<l-map :zoom="zoom" :center="center" ref="myMap" style="height: 850px; width: auto">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-circle-marker 
                    v-for="(d,i) in apteky"
                    v-bind:key="i"
                    :lat-lng="[d.nszu_geocoding_google_api_lat, d.nszu_geocoding_google_api_lng]"
                    :radius="3"
                    :color="'red'"
                    :fill="true"
                    :fillColor="'red'"
                    :style="{'fillColor': 'red'}"
                ></l-circle-marker>
                <l-circle-marker 
                    v-for="(d,i) in hospitals"
                    v-bind:key="i+'b'"
                    :lat-lng="[d.nszu_geocoding_google_api_lat, d.nszu_geocoding_google_api_lng]"
                    :radius="1"
                    :color="'blue'"
                    :fill="true"
                    :fillColor="'red'"
                    :style="{'fillColor': 'red'}"
                >
                <l-popup :content="d.division_name"></l-popup>
                </l-circle-marker>
  </l-map>
</div>
</template>

<script>
import {LMap, LTileLayer, LCircleMarker, LPopup} from 'vue2-leaflet'

export default {
    props: {
        apteky: Array,
        hospitals: Array
    },
    data() {
        return {
            zoom: 13,
            center: [50.313220, 30.319482],
            url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png',
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        }
    },
    components: {
        LMap,
        LTileLayer,
        LCircleMarker,
        LPopup,
    }
    
}
</script>

<style lang="scss">
@import "~leaflet/dist/leaflet.css";

</style>