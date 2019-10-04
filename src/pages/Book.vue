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
          <h5 class="card-title">
            <span v-if="mode === 'view'">{{ book.title }}</span>
            <input v-else type="text" v-model="book.title" />
          </h5>
        </div>
        <ul class="list-group list-group-flush">
          <li v-for="[title, key] in columnsMap"
              class="list-group-item"
              :key="key"
          >
            <span>
              <b class="mr-3">{{ title }}:</b>
              <span v-if="mode === 'view'">{{ book[key] }}</span>
              <input v-else type="text" v-model="book[key]" />
            </span>
          </li>
        </ul>
        <div class="card-body">
          <button type="button"
                  class="btn btn-success mr-2"
                  v-if="mode === 'view'"
                  @click="onEditClick"
          >
            Изменить
          </button>
          <button type="button"
                  class="btn btn-success mr-2"
                  v-if="mode !== 'view'"
                  @click="onSaveClick"
          >
            Сохранить
          </button>
          <button type="button"
                  class="btn btn-danger"
                  @click="onDeleteClick"
                  v-if="mode === 'view'"
          >
            Удалить
          </button>
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

  @Action('addBook', { namespace }) addBook;

  @Action('updateBook', { namespace }) updateBook;

  @Action('syncWithLocalStorage', { namespace }) syncBooks;

  @Watch('booksState.books') onBooksChange() {
    this.syncBooks();
  }

  book = null;

  columnsMap;

  async mounted() {
    const { booksLoaded } = this.booksState;

    this.setColumnsMap();

    if (!booksLoaded) {
      await this.loadBooks();
    }

    await this.fetchBook();
  }

  setColumnsMap() {
    this.columnsMap = [...columnsMap]
    /* eslint no-unused-vars: off */
      .filter(([title, key]) => !['imageUrl', 'title'].includes(key));
  }

  async onBackClick() {
    await this.$router.back();
    await this.fetchBook();
  }

  async fetchBook() {
    const { id } = this.$route.params;
    this.book = { ...await this.getBook(id) };

    return this.book;
  }

  onEditClick() {
    const { id } = this.book;
    return this.$router.push(`/book/${id}/edit`);
  }

  async onDeleteClick() {
    await this.removeBook(this.book);
    await this.$router.push('/books');
  }

  async onSaveClick() {
    const newId = +new Date();

    if (this.mode === 'create') {
      await this.addBook({ ...this.book, id: newId });
    } else {
      await this.updateBook(this.book);
    }

    await this.$router.push(`/book/${this.book.id || newId}`);
    await this.fetchBook();
  }

  get mode() {
    return this.$route.meta.mode;
  }
}

</script>

<style scoped lang="scss">

</style>
