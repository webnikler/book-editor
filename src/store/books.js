import {
  Module,
  VuexModule,
  Action,
  Mutation,
} from 'vuex-module-decorators';
import store from '../store';
import booksMock from '../mocks/books.json';

const name = 'usersStore';

@Module({
  namespaced: true,
  dynamic: true,
  name,
  store,
})
/* eslint no-unused-vars: off */
class BooksStore extends VuexModule {
  books = [];

  booksLoading = false;

  getBookIndex(book) {
    return this.books.findIndex(({ id }) => book.id === id);
  }

  @Action getBookById(bookId) {
    return this.books.find(({ id }) => id === bookId);
  }

  @Action({ commit: 'pushBook' }) addBook(book) {
    return book;
  }

  @Action({ commit: 'putBook' }) updateBook(book) {
    return [book, this.getBookIndex(book)];
  }

  @Action({ commit: 'removeBookByIndex' }) removeBook(book) {
    return this.getBookIndex(book);
  }

  @Action loadBooks() {
    this.context.commit('startBooksLoad');

    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        this.context.commit('setBooks', booksMock);
        return booksMock;
      })
      .finally(() => this.context.commit('endBooksLoad'));
  }

  @Mutation setBooks(books) {
    this.books = books;
  }

  @Mutation putBook([book, index]) {
    this.books[index] = book;
  }

  @Mutation pushBook(book) {
    this.books.push(book);
  }

  @Mutation removeBookByIndex(index) {
    this.books.splice(index, 1);
  }

  @Mutation startBooksLoad() {
    this.booksLoading = true;
  }

  @Mutation endBooksLoad() {
    this.booksLoading = false;
  }
}

export default name;
