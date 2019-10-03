<template>
  <ul>
    <li>1</li>
  </ul>
</template>

<script>

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BooksPage extends Vue {
  books = [];
}

</script>

<style scoped lang="scss">

</style>
