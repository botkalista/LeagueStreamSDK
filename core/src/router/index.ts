import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:componentName',
      name: 'custom_component',
      component: () => import(`../../src/CustomComponent.vue`),
      props: true
    }
  ]
})

export default router
