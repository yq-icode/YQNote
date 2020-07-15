require.config({
	baseUrl: './js',
	paths:{
		jquery: '/static/libs/jquery/jquery-1.11.3.min',
		mCustomScrollbar: '/static/libs/mCustomScrollbar/jquery.mCustomScrollbar.concat.min',
		layer: '/static/libs/layer/layer',
		mock: '/static/libs/mockJs/mock',
		mockData: 'mockData',
		qd: 'qd',
		mainJs: 'main'
	},
	shim:{
		'mockData':{
			deps: ['mock']
		},
		/* ----------------------------------------------------------
		 * 问题：正常使用mCustomScrollbar自定义滚动插件是没问题的，但放到require中加载使用时报.mCustomScrollbar不是一个函数
		 * 原因： 因为mCustomScrollbars文件合并的问题，导致define被重复定义
		 * 解决方法：注释掉 mCustomScrollbar 的 deps: ['jquery']
		 * ---------------------------------------------------------- */
//		'mCustomScrollbar':{
//			deps: ['jquery']
//		},
		'qd':{
			deps: ['jquery', 'layer']
		},
		'mainJs':{
			deps: ['jquery', 'mCustomScrollbar', 'qd']
		}
	},
	waitSeconds: 10
});


