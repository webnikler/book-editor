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

  booksLoaded = false;

  @Action syncWithLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  @Action getBookIndex(book) {
    return this.books.findIndex(({ id }) => book.id === id);
  }

  @Action getBookById(bookId) {
    return this.books.find(({ id }) => id === Number(bookId));
  }

  @Action({ commit: 'pushBook' }) addBook(book) {
    return book;
  }

  @Action({ commit: 'putBook' }) async updateBook(book) {
    return [book, await this.getBookIndex(book)];
  }

  @Action({ commit: 'removeBookByIndex' }) removeBook(book) {
    return this.getBookIndex(book);
  }

  @Action loadBooks() {
    const localStorageBooks = JSON.parse(localStorage.getItem('books'));
    const { commit } = this.context;

    if (localStorageBooks) {
      commit('setBooks', localStorageBooks);
      commit('endBooksLoad');
      return Promise.resolve(localStorageBooks);
    }

    commit('startBooksLoad');

    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        commit('setBooks', booksMock);
        return booksMock;
      })
      .finally(() => commit('endBooksLoad'));
  }

  @Mutation setBooks(books) {
    this.books = books;
  }

  @Mutation putBook([book, index]) {
    const books = [...this.books];
    books[index] = book;

    this.books = books;
  }

  @Mutation pushBook(book) {
    this.books = [...this.books, book];
  }

  @Mutation removeBookByIndex(index) {
    const books = [...this.books];
    books.splice(index, 1);

    this.books = books;
  }

  @Mutation startBooksLoad() {
    this.booksLoading = true;
  }

  @Mutation endBooksLoad() {
    this.booksLoading = false;
    this.booksLoaded = true;
  }
}

export default name;
