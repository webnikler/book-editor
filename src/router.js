import Vue from 'vue';
import Router from 'vue-router';
import { BookListPage, BookPage } from './pages';

Vue.use(Router);

export const routeNames = {
  home: 'home',
  books: 'books',
  book: 'book',
  create: 'create',
  edit: 'edit',
};

export const bookPageModes = {
  edit: 'edit',
  view: 'view',
  create: 'create',
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
      meta: {
        mode: bookPageModes.view,
      },
      component: BookPage,
    },
    {
      path: '/book/:id/edit',
      name: routeNames.edit,
      meta: {
        mode: bookPageModes.edit,
      },
      component: BookPage,
    },
    {
      path: '/book/create',
      name: routeNames.create,
      meta: {
        mode: bookPageModes.create,
      },
      component: BookPage,
    }
  ],
});
