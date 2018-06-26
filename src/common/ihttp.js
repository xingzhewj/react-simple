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
// axios.defaults.crossDomain = true;
axios.defaults.timeout = 3000;
// http返回状态码，如果返回true（或者设置成null/undefined），promise将会接受；其他的promise将会拒绝
axios.defaults.validateStatus = status => status >= 200 && status <= 300;

const events = new EventEmitter();

const formatError = {
    missTotal: {
        code: 666,
        info: '整体字段格式错误'
    },
    missData: {
        code: 1000,
        info: '缺失data数据字段'
    },
    missStatus: {
        code: 1001,
        info: '缺失status字段'
    },
    missStatusInfo: {
        code: 1002,
        info: '缺失statusInfo字段'
    }
};

function validateResFormat(res) {
    const {data: resData} = res;
    const resKeys = Object.keys(resData);
    const json = {
        data: {},
        status: 0,
        statusInfo: ''
    };
    if (!resKeys.includes('data') && !resKeys.includes('status') && !resKeys.includes('statusInfo')) {
        json.status = 1;
        json.data = formatError.missTotal;
    }
    else if (!resKeys.includes('data')) {
        json.status = 1;
        json.data = formatError.missData;
    }
    else if (!resKeys.includes('status')) {
        json.status = 1;
        json.data = formatError.missStatus;
    }
    else if (!resKeys.includes('statusInfo')) {
        json.status = 1;
        json.data = formatError.missStatusInfo;
    }
    return Object.freeze(json);
}

axios.interceptors.response.use(response => {
    return validateResFormat(response);
}, error => {
    return Promise.reject(error);
});

function post(url, params) {
    axios.post(url, params).then(data => {
        console.log('instance-axios:', data);
    });
}

function get(url, params) {
    axios.get(url, {
        params
    }).then(data => {
        console.log('instance-axios-get:', data);
    }).catch(err => {
        console.warn(err);
    });
}

export default {
    events,
    post,
    get
};

