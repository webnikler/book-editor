<template>
  <div id="app">
      <router-link to="/">List</router-link> |
      <router-link to="/book/1">Book</router-link>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import '~bootstrap';
</style>
