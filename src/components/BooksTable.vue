<template>
  <div class="table-responsive books-table">
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
      <tr v-for="book of sortedBooks"
          @click="onRowClick(book)"
          :key="book.id"
      >
        <td v-for="key in columnsMap.values()"
            :key="`${book.id}${key}`"
        >{{ book[key] }}</td>
      </tr>
      </tbody>
    </table>
    <div class="row" v-if="loading">
      <div class="books-table__loader">
        <div class="spinner-border" role="status">
          <span class="sr-only">Загрузка</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  Component,
  Vue,
  Prop,
  Emit,
} from 'vue-property-decorator';
import getSortedBooks from '../utlis/sorted-books';

@Component
export default class BooksTable extends Vue {
  @Prop({ default: () => new Map() }) columnsMap;

  @Prop({ default: () => [] }) sortableColumns;

  @Prop({ default: () => [] }) books;

  @Prop({ default: false }) loading;

  @Emit('onRowClick') onRowClick({ id }) {
    return id;
  }

  sortColumn = null;

  sortDirection = null;

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
    }

    return title;
  }

  get sortedBooks() {
    return getSortedBooks(this.books, this.sortColumn, this.sortDirection);
  }
}

</script>

<style scoped lang="scss">
  .books-table {
    position: relative;
    font-size: 14px;

    & table th {
      white-space: nowrap;
      padding-left: 10px;
      padding-right: 10px;
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

    .clickable {
      cursor: pointer;

      &:hover {
        color: rgba(255, 255, 255, .5);
      }
    }
  }
</style>
