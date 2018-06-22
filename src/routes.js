/**
 * @file 路由配置
 * @Author wangjie19
 * @Date 2018-06-21 17:39:45
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-06-22 16:07:47
 */

import Home from './pages/home/main';
import Login from './pages/login/main';

// const Home = require.ensure([], require => require('./pages/home/main'), 'home');

const routes = [
    {
        path: '/home',
        component: Home,
        exact: true
    },
    {
        path: '/login',
        component: Login,
        exact: true
    }
];

// routes.map((route, index) => {
//     route.component = (location, cb) => {
//         require.ensure([], require => {
//             cb(null, require('./pages/home/main').default);
//         }, 'home');
//     };
//     return route;
// });

export default routes;
