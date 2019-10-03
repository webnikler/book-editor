import Vue from 'vue';
import Router from 'vue-router';
import { BookListPage, BookPage } from './pages';

Vue.use(Router);

export const routeNames = {
  home: 'home',
  books: 'books',
  book: 'book',
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: routeNames.home,
      redirect: { name: routeNames.books },
    },
    {
      path: '/books',
      name: routeNames.books,
      component: BookListPage,
    },
    {
      path: '/book/:id',
      name: routeNames.book,
      component: BookPage,
    },
  ],
});
