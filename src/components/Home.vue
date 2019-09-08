<template>
  <div>
    <div>
      <router-link :to="{ name: 'horizontal-bar', params: { smth: 'hello_shit' } }">Horizontal Bar</router-link>
    </div>
    <div>
      <router-link :to="{ name: 'app', params: { smth: 'hello_shit' } }">App</router-link>

      <div>
        <router-link :to="{ name: 'bar-plots', params: { smth: 'hello_shit' } }">Bar Plots</router-link>
      </div>

        <div>
        <router-link :to="{ name: 'doctors-table', params: { oblast: 'Київська' } }">Doctors Table</router-link>
      </div>

        <div>
        <router-link :to="{ name: 'med-table', params: { oblast: 'Київська' } }">Med Table</router-link>
      </div>
    </div>
  </div>
</template>

<script>
</script>

