import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login.vue')
const Index = () => import('@/views/index.vue')
// import Index from '@/views/index.vue'
const Search = () => import('@/views/search.vue')
// import Search from '@/views/search.vue'
const Admin = () => import('@/views/admin.vue')
// import Admin from '@/views/admin.vue'
const AdminBasic = () => import('@/components/admin/basic.vue')
// import AdminBasic from '@/components/admin/basic.vue'
const AdminHome = () => import('@/components/admin/home.vue')
// import AdminHome from '@/components/admin/home.vue'
const AdminBanner = () => import('@/components/admin/banner.vue')
// import AdminBanner from '@/components/admin/banner.vue'
const AdminBannerset = () => import('@/components/admin/bannerset.vue')
// import AdminBannerset from '@/components/admin/bannerset.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    { path: '/login', name:'login', component: Login},
  	{ path: '/', name:'index', component: Index },
  	{ path: '/search/:keyword?/:bids?/:ppath?', name:'search', component: Search },
  	{
  		path: '/admin',
  		name:'admin',
  		component: Admin,
  		redirect: '/admin/basic',
  		children: [
  				{ path: '/admin/basic', name: 'basic', component: AdminBasic },
					{ path: '/admin/home', name: 'home', component: AdminHome },
					{ path: '/admin/banner', name: 'banner', component: AdminBanner },
					{ path: '/admin/bannerset/:id', name: 'bannerset', component: AdminBannerset }
  			]
  	}
  ]
})
// router.beforeEach((to, form, next) => {
    // document.title = '首页'
// })
export default router
