
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
    path: '/anak',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/anak/Index.vue') }
    ]
  },
  {
    path: '/detail',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/detail/Index.vue') }
    ]
  },
  {
    path: '/poktan',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/poktan/Index.vue') }
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
      { path: 'pupuk', component: () => import('pages/pupuk/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'jatah', component: () => import('pages/jatah/Index.vue') }
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
