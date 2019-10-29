<template>
  <div v-on:click="onClick">
    <!-- <div>{{hospital.division_name + " " + hospital.division_residence_addresses}}</div> -->

    <!--       <p >
      {{ hospital }}
    </p>
    -->
    <!--         <p>
{{buffered}}
    </p>-->

    <p class="names">{{ hospital.division_name.substring(0,40) + "..."  }}</p>

    <svg viewBox="0 0 200 200" :width="roseWidth" :height="roseHeight">
      <defs>
        <marker id="head" orient="auto" viewBox="0 0 50 50" markerWidth="150" markerHeight="150"
         refX="1" refY="2">
          <!-- triangle pointing right (+x) -->
          <path d="M0,0 V4 L2,2 Z"  fill="red" />
        </marker>
          <marker id="tail" orient="auto-start-reverse" viewBox="0 0 50 50"
           markerWidth="150" markerHeight="150" refX="1" refY="2">
          <!-- triangle pointing right (-x) -->
          <path d="M0,0 V4 L2,2 Z" fill="red" />
        </marker>
      </defs>
      <g>

        <!-- Pauls cross -->

        <!-- <path d="M30 30 L170 170" marker-end="url(#head)" marker-start="url(#tail)" 
        stroke-width="1" stroke="black" />
        <path d="M170 30 L30 170" marker-end="url(#head)" marker-start="url(#tail)"
         stroke-width="1" stroke="black" /> -->

        <!-- cross -->

        <path d="M100 10 L100 190" marker-end="url(#head)" marker-start="url(#tail)" 
        stroke-width="1" stroke="black" />
        <path d="M10 100 L190 100" marker-end="url(#head)" marker-start="url(#tail)"
         stroke-width="1" stroke="black" />


        <!-- <path d="M0 0 L190 190 M200 0 L0 200 M100 0 L100 200 M0 100 L200 100" marker-end='url(#head)' stroke="black" /> -->

        <!-- <path d="M10 10 H 90 V 90 H 10 L 10 10"/> -->
        <circle
          :cx="project(hospital.nszu_geocoding_google_api_lng, hospital.nszu_geocoding_google_api_lat)[0]"
          :cy="project(hospital.nszu_geocoding_google_api_lng, hospital.nszu_geocoding_google_api_lat)[1]"
          r="15"
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
        />-->
        <circle
          v-for="(d, i) in hospital.aptekaObjects"
          v-bind:key="i"
          :cx="project(d.nszu_geocoding_google_api_lng, d.nszu_geocoding_google_api_lat)[0]"
          :cy="project(d.nszu_geocoding_google_api_lng, d.nszu_geocoding_google_api_lat)[1]"
          r="1"
          fill="black"
          stroke="black"
          :class="d.nszu_geocoding_google_api_lng + ' ' + d.nszu_geocoding_google_api_lat"
        />
        <!--       <circle :cx="60" :cy="60" r="5" />
        <circle :cx="60" :cy="60" r="5" />
        <circle :cx="60" :cy="60" r="5" />-->

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
      // var bbox = turf.bbox(buffered);

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
    onClick (event) {
      this.$emit('clicked', this.hospital)
    },
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
p.names {
  font-size: 0.7em;
  /* margin: 10px 25px; */
}
svg {
  display: block;
  margin: 0 auto;
}
</style>