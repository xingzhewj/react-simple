/**
 * @file 路由配置
 * @Author wangjie19
 * @Date 2018-06-21 17:39:45
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-06-21 18:17:17
 */

// import Home from './pages/home/main';

const Home = require.ensure([], require => require('./pages/home/main'), 'home');

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    }
];

export default routes;
