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

@Component({
  components: {
    BooksTable,
  },
})
export default class BooksPage extends Vue {
  @State(namespace) booksState;

  @Action('loadBooks', { namespace }) loadBooks;

  columnsMap;

  sortableColumns = [];

  constructor() {
    super();

    this.createColumns();
    this.sortableColumns = ['Заголовок', 'Год публикации'];
  }

  mounted() {
    this.loadBooks();
  }

  onCreateClick() {
    this.$router.push('/book/create').then();
  }

  onBookClick(id) {
    console.log(id);
    this.$router.push(`/book/${id}`).then();
  }

  createColumns() {
    const columnsMap = new Map();

    columnsMap.set('Изображение', 'imageUrl');
    columnsMap.set('Заголовок', 'title');
    columnsMap.set('Имя автора', 'firstName');
    columnsMap.set('Фамилия автора', 'secondName');
    columnsMap.set('Количество страниц', 'pagesCount');
    columnsMap.set('Название издательства', 'publisherName');
    columnsMap.set('Год публикации', 'publicationYear');
    columnsMap.set('Дата выхода в тираж', 'releaseDate');

    this.columnsMap = columnsMap;
  }
}

</script>
