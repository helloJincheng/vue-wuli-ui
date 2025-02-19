/* eslint-disable */
import Mock from 'mockjs'

const BASE_URL = process.env.VUE_APP_API

// 带随机数据的 mock
Mock.mock(BASE_URL + '/mock', {
    data: {
        "test|3-10": [{
            "name": "@cname",
            "age|1-100": 100
        }]
    },
    "token": "@guid"
});

// 图片接口
Mock.mock(BASE_URL + '/images', {
    data: {
        "pic|4-10": [{
            "title": "@csentence",
            "src": "@image('200x200', '#50B347', '#FFF', 'mockjs')"
        }]
    }
});

// 滑动导航数据接口
Mock.mock(BASE_URL + '/scroll', {
    "data|7-12": [{
        "name": "@cname",
        "list|2-8": [{
            "title": "@region",
            "description": "@csentence",
            "value": '@id',
            "checked|1": false
        }]
    }]
});

// 表格数据接口
Mock.mock(BASE_URL + '/table', {
    "data|10": [{
        "name": "@cname",
        "status|1": [1, 2, 3],
        "age|12-24": 0,
        "time": "@date('yyyy-MM-dd')",
        "update": "@datetime('yyyy-MM-dd A HH:mm:ss')",
        "address": "@city(true)"
    }]
});