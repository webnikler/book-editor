<template>
  <div class="container mt-5 mb-5">
    <div class="row mb-3">
      <button type="button"
              class="btn btn-success"
              @click="onBackClick()"
      >Назад</button>
    </div>
    <div class="row">
      <div class="card" style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BookPage extends Vue {
  onBackClick() {
    this.$router.back();
  }
}

</script>

<style scoped lang="scss">

</style>
