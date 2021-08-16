
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home' },
      {
        path: '/home',
        component: () => import('pages/Home/Home.vue'),
        children: [
          {
            path: '/home/child',
            component: () => import('pages/Home/Child.vue'),
            children: [
              {
                path: '/home/child/grandchild',
                component: () => import('pages/Home/Grandchild.vue'),
              }
            ]
          }
        ]
      },
      {
        path: '/questions',
        component: () => import('pages/Questions/Questions.vue'),
        children: [
          {
            path: '/questions/answer',
            component: () => import('pages/Questions/Answer.vue'),
          }
        ]
      },
      {
        path: '/images',
        component: () => import('pages/Images/Images.vue'),
        children: [
          {
            path: '/images/:id',
            component: () => import('pages/Images/Image.vue'),
          }
        ]
      },
      {
        path: '/xrays',
        component: () => import('pages/Xrays/Xrays.vue'),
        children: [
          {
            path: '/xrays/:id',
            component: () => import('pages/Xrays/Xray.vue'),
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
