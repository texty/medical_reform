<template>
  <div>
    <div>gdgd gd dgd</div>
    <svg :width="roseWidth" :height="roseHeight">
      <g>
        <circle cx="60" cy="60" r="5" />
        <circle :cx="project(31.941938, 50.000591 )[0]" :cy="project(31.941938, 50.000591)[1]" r="5" />
        <circle :cx="project(32, 50)[0]" :cy="project(32, 50)[1]" r="5" />
        <circle :cx="60" :cy="60" r="5" />
        <circle :cx="60" :cy="60" r="5" />
        <circle :cx="60" :cy="60" r="5" />

        <!-- 
            https://stackoverflow.com/questions/11808860/how-to-place-arrow-head-triangles-on-svg-lines
        how to add arrow at the end of path
         -->
      </g>
    </svg>
  </div>
</template>

<script>
import * as turf from '@turf/turf'

export default {
  props: {
    roseWidth: Number,
    roseHeight: Number,
    hospitals: Array
  },
  computed: {
    projection() {
    var point = turf.point([32,50]);
    var buffered = turf.buffer(point, 8, {units:'kilometers'});
    // debugger;
    // var bbox = turf.bboxPolygon(buffered);  

    // console.log(bbox)

      var pr = d3
        .geoMercator()
        // .center([50, 32])
        // .translate([150, 150])
        .fitExtent([[0, 0],
         [this.roseWidth, this.roseHeight]], buffered)
        // .scale(100000);

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