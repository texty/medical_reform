<template>
  <div>
    <Header></Header>
    <HorizontalNavBar></HorizontalNavBar>
  </div>
</template>

<script>
import HorizontalNavBar from "@/components/HorizontalNavBar.vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    HorizontalNavBar,
    Header
  }
};
</script>
