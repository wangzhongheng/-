import Vue from 'vue';
import VueRouter from 'vue-router';
//import axios from 'axios';
var fly = require("flyio")
//var fly = new Fly;


//const index = r => require.ensure([], () => r(require('view/Index/index/index')), 'index');
const index  = () => import('view/Index/index')
const startTest = () => import('view/startTest/index');

Vue.use(VueRouter);
Vue.config.debug = false;//开启错误提示

//router 配置
const routes = [
    {
        'path': '/',
        'name': '/',
        'component': index,
        'meta': {
            'title': "首页",
            'navIndex': 1,
            'AuthStatus': true,
        },
    },
    {
        'path': '/startTest',
        'name': '/startTest',
        'component': startTest,
        'meta': {
            'title': "测试",
            'navIndex': 1,
            'AuthStatus': true,
        },
    },
]


const router = new VueRouter({
    routes, // （缩写）相当于 routes: routes
    scrollBehavior(to, from, savedPosition) {

        if (to.name != 'goods' || to.name != '/') {
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        }

    }
})


//标题设置   页面登录拦截
router.beforeEach((to, from, next) => {

    let keywords = '';
    let description = '-53675951';
    document.querySelector('meta[name="keywords"]').setAttribute('content', keywords);
    document.querySelector('meta[name="description"]').setAttribute('content', description);

    if (to.meta.title) {//如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }

    next()

})
//http请求拦截
// http request 拦截器
/*axios.interceptors.request.use(
config => {
    if (store.state.BASE_INFO) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `token ${store.state.BASE_INFO}`;
    }
    return config;
},
err => {
    return Promise.reject(err);
});*/

// http response 拦截器
fly.interceptors.response.use(
    response => {
        let data = response.data;
        data = JSON.parse(data);
        if (data) {
            switch (data.code) {
                case 4000:

                    break;
                case 3000:
                    //Toast(response.data.msg);
                    break;
                case 2000:

                    break;
                case 5001:
                case 5002:
                    break;

            }
        }
        return data;
    },
    error => {
        if (error.response) {

            switch (error.response.status) {
                case 401:

                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
            }
        }
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });

// fly.interceptors.request.use((request) => {
//     if (store.state.token) {
//         request.headers["Token"] = store.state.token;
//     }
    // return request
// });


Vue.prototype.$http = fly;


module.exports = router;


