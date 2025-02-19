/**
 * 顶部导航 navList
 * @returns {*}
 */
export const navList = [
    {
        icon: 'md-cube',
        name: '组件类',
        path: '/',
        childrens: []
    },
    {
        icon: 'md-build',
        name: 'api',
        path: '/api',
        childrens: []
    },
    {
        icon: 'ios-podium',
        name: '可视化',
        path: '/echarts',
        childrens: []
    },
    {
        icon: 'logo-github',
        name: 'language',
        path: '/',
        childrens: [
            {
                title: '语言',
                list: [
                    {
                        key: '中文',
                        value: 'zh-cn'
                    },
                    {
                        key: '繁体',
                        value: 'zh-tw'
                    },
                    {
                        key: 'English',
                        value: 'en'
                    }
                ]
            },
            {
                title: '源码',
                list: [
                    {
                        key: '地址',
                        value: 'https://github.com/Aaron52077/vue-wuli-ui.git'
                    }
                ]
            }
        ]
    }
]

/**
 * 侧边导航 menuList
 * @returns {*}
 */
export const menuList = [
    {
        name: '组件栏',
        children: [
            {name: '图标', path: '/icons', icon: 'md-heart-outline'},
            {name: '头像', path: '/avatar', icon: 'md-person'},
            {name: '加载中', path: '/loading', icon: 'ios-loading'},
            {name: '无记录', path: '/noneTip', icon: 'md-paw'},
            {name: '时间控件', path: '/timePicker', icon: 'md-time'},
            {name: '树状下拉选择器', path: '/treeSelect', icon: 'ios-arrow-down'},
            {name: '拖拽列表', path: '/dragList', icon: 'md-infinite'},
            {name: '拖拽抽屉', path: '/dragDrawer', icon: 'md-list'},
            {name: '骨架屏', path: '/skeleton', icon: 'md-flash'},
            {name: '虚拟列表', path: '/vlist', icon: 'ios-list'},
            {name: '文件预览', path: '/docPreview', icon: 'md-book'},
            {name: '视频预览', path: '/videoPreview', icon: 'md-videocam'},
            {name: '地图检索', path: '/map', icon: 'md-compass'}
        ]
    },
    {
        name: 'API',
        children: [
            {name: '工具合集', path: '/api', icon: 'md-filing'},
            {name: '富文本', path: '/api/editor', icon: 'ios-share'},
            {name: '图片裁剪', path: '/api/cropper', icon: 'md-clipboard'}
        ]
    },
    {
        name: '可视化 BI',
        children: [
            {name: '图表', path: '/echarts/exp', icon: 'md-podium'},
            {name: '柱状图', path: '/echarts/bar', icon: 'md-stats'},
            {name: '线性图', path: '/echarts/line', icon: 'md-pulse'},
            {name: '雷达图', path: '/echarts/radar', icon: 'md-wifi'},
            {name: '饼图', path: '/echarts/pie', icon: 'md-pie'},
            {name: '漏斗图', path: '/echarts/funnel', icon: 'md-funnel'},
            {name: '仪表盘', path: '/echarts/gauge', icon: 'md-speedometer'},
            {name: '地理坐标系', path: '/echarts/map', icon: 'md-map'},
            {name: '面积图', path: '/echarts/treemap', icon: 'md-square'},
            {name: '灯箱图', path: '/echarts/boxplot', icon: 'md-bulb'},
            {name: '气泡图', path: '/echarts/scatter', icon: 'md-radio-button-off'}
        ]
    }
]