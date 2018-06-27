/**
 * @file http请求脚本
 * @Author wangjie19
 * @Date 2018-06-26 12:07:24
 * @Last Modified by: wangjie19
 * @Last Modified time: 2018-06-26 17:47:37
 */

import {EventEmitter} from 'events';
import axios from 'axios';

axios.defaults.baseURL = 'http://www.walker.com/api';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.timeout = 3000;
// http返回状态码，如果返回true（或者设置成null/undefined），promise将会接受；其他的promise将会拒绝
axios.defaults.validateStatus = status => status >= 200 && status <= 300;

const events = new EventEmitter();

const formatError = {
    data: '缺失data数据字段',
    status: '缺失status字段',
    statusInfo: '缺失statusInfo字段'
};
// 数据基础格式
const json = Object.seal({
    data: {},
    status: 0,
    statusInfo: ''
});

/**
 * 响应数据进行格式校验
 * @param {Object} res 响应数据
 */
function validateResFormat(res) {
    const {data: resData} = res;
    const resKeys = Object.keys(resData);
    const baseKeys = Object.keys(json);
    let errInfos = [];
    baseKeys.forEach(key => {
        resKeys.includes(key) ? '' : errInfos.push(formatError[key]);
    });
    // 格式错误存在时重置数据
    if (errInfos.length) {
        json.status = 1;
        json.statusInfo = '服务器响应数据：' + errInfos.join(' & ');
        return Promise.reject(Object.freeze(json));
    }
    else {
        return Promise.resolve(Object.freeze(resData.data));
    }
}

/**
 * http错误处理
 * @param {Error} error 错误对象
 */
function httpErrorProcess(error) {
    json.status = 1;
    json.statusInfo = `${error.name}:${error.message}`;
    return json;
}
// 拦截响应数据
axios.interceptors.response.use(response => {
    return validateResFormat(response);
}, error => {
    return Promise.reject(httpErrorProcess(error));
});

/**
 * post请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
function post(url = '', params = {}) {
    axios.post(url, params).then(data => {
        console.log('instance-axios:', data);
    });
}
/**
 * get请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
function get(url = '', params = {}) {
    return axios.get(url, {
        params
    });
}

export default {
    post,
    get
};

