<template>
  <div class="container books">
    <div class="row mb-3">
      <button type="button"
              class="btn btn-success"
              @click="onCreateClick()"
      >Добавить книгу</button>
    </div>
    <div class="row">
      <div class="table-responsive books__table">
        <table class="table table-bordered table-hover table-sm">
          <thead class="thead-dark">
            <tr>
              <th v-for="(title, i) of columnsMap.keys()"
                  @click="onColumnTitleClick(title)"
                  :class="{ clickable: sortableColumns.includes(title) }"
                  :key="i">{{ getTitle(title) }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book of books"
                :key="book.id"
            >
              <td v-for="key in columnsMap.values()"
                  :key="`${book.id}${key}`"
              >{{ book[key] }}</td>
            </tr>
          </tbody>
        </table>
        <div class="row" v-if="booksState.booksLoading">
          <div class="books__loader">
            <div class="spinner-border" role="status">
              <span class="sr-only">Загрузка</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import getSortedBooks from '../utlis/sorted-books';
import namespace from '../store/books';

@Component
export default class BooksPage extends Vue {
  @State(namespace) booksState;

  @Action('loadBooks', { namespace }) loadBooks;

  sortColumn = null;

  sortDirection = null;

  columnsMap = new Map();

  sortableColumns = [];

  constructor() {
    super();

    this.columnsMap.set('Изображение', 'imageUrl');
    this.columnsMap.set('Заголовок', 'title');
    this.columnsMap.set('Имя автора', 'firstName');
    this.columnsMap.set('Фамилия автора', 'secondName');
    this.columnsMap.set('Количество страниц', 'pagesCount');
    this.columnsMap.set('Название издательства', 'publisherName');
    this.columnsMap.set('Год публикации', 'publicationYear');
    this.columnsMap.set('Дата выхода в тираж', 'releaseDate');

    this.sortableColumns = ['Заголовок', 'Год публикации'];
  }

  mounted() {
    this.loadBooks();
  }

  onCreateClick() {
    this.$router.push('/book/create').then();
  }

  onColumnTitleClick(columnTitle) {
    if (!this.sortableColumns.includes(columnTitle)) {
      return;
    }

    this.sortColumn = this.columnsMap.get(columnTitle);
    this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
  }

  getTitle(title) {
    const isColumnSorted = this.columnsMap.get(title) === this.sortColumn;
    const isColumnSortable = this.sortableColumns.includes(title);

    if (isColumnSorted && isColumnSortable) {
      return this.sortDirection === 'ASC' ? `${title} ↑` : `${title} ↓`;
    } else {
      return title;
    }
  }

  get books() {
    const { books } = this.booksState;
    return getSortedBooks(books, this.sortColumn, this.sortDirection)
  }
}

</script>

<style scoped lang="scss">
  .table {
    font-size: 14px;

    th {
      white-space: nowrap;
      padding-left: 10px;
      padding-right: 10px;
    }

    .clickable {
      cursor: pointer;

      &:hover {
        color: rgba(255, 255, 255, .5);
      }
    }
  }

  .books {
    margin-top: 40px;
    margin-bottom: 40px;

    &__table {
      position: relative;
    }

    &__loader {
      position: absolute;
      display: flex;
      background-color: rgba(255, 255, 255, 0.5);
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
</style>
