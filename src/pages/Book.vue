<template>
  <div class="container mt-5 mb-5">
    <div class="row mb-3">
      <button type="button"
              class="btn btn-primary"
              @click="onBackClick()"
      >Назад</button>
    </div>
    <div class="row" v-if="book">
      <div class="card" style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title">{{ book.title }}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li v-for="[title, key] in columnsMap"
              class="list-group-item"
              :key="key"
          >
            <span v-if="mode === 'view'">{{ title }}: {{ book[key] }}</span>
            <span v-else>{{ title }}: <input type="text" v-model="book[key]" /></span>
          </li>
        </ul>
        <div class="card-body">
          <button type="button"
                  class="btn btn-success mr-2"
                  @click="onEditClick"
          >Изменить</button>
          <button type="button"
                  class="btn btn-danger"
                  @click="onDeleteClick"
          >Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import namespace from '../store/books';
import columnsMap from '../constants/book-columns-map';

@Component
export default class BookPage extends Vue {
  @State(namespace) booksState;

  @Action('getBookById', { namespace }) getBook;

  @Action('loadBooks', { namespace }) loadBooks;

  @Action('removeBook', { namespace }) removeBook;

  @Action('syncWithLocalStorage', { namespace }) syncBooks;

  @Watch('booksState.books') onBooksChange() {
    this.syncBooks();
  }

  book = null;

  columnsMap;

  async mounted() {
    const { id } = this.$route.params;
    const { booksLoaded } = this.booksState;

    if (!booksLoaded) {
      await this.loadBooks();
    }

    this.book = await this.getBook(id);
    this.columnsMap = [...columnsMap]
      /* eslint no-unused-vars: off */
      .filter(([title, key]) => !['imageUrl', 'title'].includes(key));
  }

  onBackClick() {
    this.$router.back();
  }

  async onEditClick() {
    const { id } = this.book;
    await this.$router.push(`/book/${id}/edit`);
  }

  async onDeleteClick() {
    await this.removeBook(this.book);
    await this.$router.push('/books');
  }

  get mode() {
    return this.$route.meta.mode;
  }
}

</script>

<style scoped lang="scss">

</style>
