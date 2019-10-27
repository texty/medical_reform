<template>
  <div>
    <div>{{hospital.division_name + " " + hospital.division_residence_addresses}}</div>

    <!--       <p >
      {{ hospital }}
    </p>
    -->
<!--         <p>
{{buffered}}
    </p> -->
   
    <svg :width="roseWidth" :height="roseHeight">
      <g>
        <circle
          :cx="project(hospital.nszu_geocoding_google_api_lng, hospital.nszu_geocoding_google_api_lat)[0]"
          :cy="project(hospital.nszu_geocoding_google_api_lng, hospital.nszu_geocoding_google_api_lat)[1]"
          r="10"
          :class="hospital.nszu_geocoding_google_api_lng + ' ' + hospital.nszu_geocoding_google_api_lat"
          fill="red"
        />

        <!--       <circle 
        :cx="20"
         :cy="20" 
         r="10"
         fill="red" />
        -->

        <!-- <circle
          :cx="project(31.941938, 50.000591 )[0]"
          :cy="project(31.941938, 50.000591)[1]"
          r="5"
        /> -->
        <circle
          v-for="(d, i) in hospital.aptekaObjects"
          v-bind:key="i"
          :cx="project(d.nszu_geocoding_google_api_lng, d.nszu_geocoding_google_api_lat)[0]"
          :cy="project(d.nszu_geocoding_google_api_lng, d.nszu_geocoding_google_api_lat)[1]"
          r="5"
          fill="none"
          stroke="black"
          :class="d.nszu_geocoding_google_api_lng + ' ' + d.nszu_geocoding_google_api_lat"

        />
  <!--       <circle :cx="60" :cy="60" r="5" />
        <circle :cx="60" :cy="60" r="5" />
        <circle :cx="60" :cy="60" r="5" /> -->

        <!-- 
            https://stackoverflow.com/questions/11808860/how-to-place-arrow-head-triangles-on-svg-lines
        how to add arrow at the end of path
        -->
      </g>
    </svg>
  </div>
</template>

<script>
import * as turf from "@turf/turf";

export default {
  props: {
    roseWidth: Number,
    roseHeight: Number,
    hospital: Object
  },
  data() {
    return {
      buffered: null
    };
  },
  computed: {
    projection() {
      var point = turf.point([
        this.hospital.nszu_geocoding_google_api_lng,
        this.hospital.nszu_geocoding_google_api_lat
      ]);
      var buffered = turf.buffer(point, 6, { units: "kilometers" });
      // debugger;
      // var bbox = turf.bboxPolygon(buffered);

      // console.log(bbox)

      this.buffered = buffered;

      var pr = d3
        .geoMercator()
        .center([
          this.hospital.nszu_geocoding_google_api_lng,
          this.hospital.nszu_geocoding_google_api_lat
        ])
        .translate([this.roseWidth / 2, this.roseHeight / 2])
        //.fitSize([this.roseWidth, this.roseHeight], buffered)
        .scale(70000);

      return pr;
    }
  },
  methods: {
    project(lat, lng) {
      let coords = this.projection([lat, lng]);

      return coords;
    },

    projectionsBostock(x, y) {
      d3.geoMercator(x, y);
    }
  },
  mounted() {
    // var point = turf.point([-90.548630, 14.616599]);
    // var buffered = turf.buffer(point, 7, {units:'kilometers'});
    // var bbox = turf.bbox(buffered);
    // console.log(turf.bboxPolygon(bbox));
  }
};
</script>

<style lang="scss">
</style>