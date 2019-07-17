
const routes = [
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/pengguna',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/pengguna/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'petani', component: () => import('pages/petani/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'JatahPupuk', component: () => import('pages/JatahPupuk/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
