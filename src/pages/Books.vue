<template>
  <div class="container">
    <div class="row">
      <div class="table-responsive">
        <table class="table table-bordered table-hover table-sm">
          <thead class="thead-dark">
            <tr>
              <th v-for="(title, i) of columnsMap.values()" :key="i">{{ title }}</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="book of booksState.books" :key="book.id">
            <td v-for="key in columnsMap.keys()" :key="`${book.id}${key}`">{{ book[key] }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
</template>

<script>

import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { name as namespace } from '../store/books';

@Component
export default class BooksPage extends Vue {
  @State(namespace) booksState;

  @Action('loadBooks', { namespace }) loadBooks;

  columnsMap = new Map();

  constructor() {
    super();

    this.columnsMap.set('imageUrl', 'Изображение');
    this.columnsMap.set('title', 'Заголовок');
    this.columnsMap.set('firstName', 'Имя автора');
    this.columnsMap.set('secondName', 'Фамилия автора');
    this.columnsMap.set('pagesCount', 'Количество страниц');
    this.columnsMap.set('publisherName', 'Название издательства');
    this.columnsMap.set('publicationYear', 'Год публикации');
    this.columnsMap.set('releaseDate', 'Дата выхода в тираж');
  }

  mounted() {
    this.loadBooks();
  }
}

</script>

<style scoped lang="scss">
  .table * {
    font-size: 14px;
  }
</style>
