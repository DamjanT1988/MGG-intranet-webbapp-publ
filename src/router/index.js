import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
// importera vue-fil
import ProductAddView from '../views/ProductAddView.vue';
import ProductManagementView from '../views/ProductManagementView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: HomeView
    }, 
    {
      path: '/productadd',
      name: 'lägg till',
      component: ProductAddView
    },
    {
      path: '/productmanagement',
      name: 'hantera',
      component: ProductManagementView
    }
  ]
})

export default router

