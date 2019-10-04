<template>
  <div class="container books mt-5 mb-5">
    <div class="row mb-3">
      <button type="button"
              class="btn btn-success"
              @click="onCreateClick()"
      >Добавить книгу</button>
    </div>
    <div class="row">
      <BooksTable :books="booksState.books"
                  :loading="booksState.booksLoading"
                  :sortableColumns="sortableColumns"
                  :columnsMap="columnsMap"
                  @onRowClick="onBookClick"
      />
    </div>
  </div>
</template>

<script>

import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import namespace from '../store/books';
import BooksTable from '../components/BooksTable.vue';
import columnsMap from '../constants/book-columns-map';

@Component({
  components: {
    BooksTable,
  },
})
export default class BooksPage extends Vue {
  @State(namespace) booksState;

  @Action('loadBooks', { namespace }) loadBooks;

  @Action('syncWithLocalStorage', { namespace }) syncBooks;

  columnsMap;

  sortableColumns = [];

  constructor() {
    super();

    this.columnsMap = columnsMap;
    this.sortableColumns = ['Заголовок', 'Год публикации'];
  }

  mounted() {
    const { booksLoaded } = this.booksState;

    if (!booksLoaded) {
      this.loadBooks();
    }
  }

  onCreateClick() {
    this.$router.push('/book/create').then();
  }

  onBookClick(id) {
    this.$router.push(`/book/${id}`).then();
  }
}

</script>
