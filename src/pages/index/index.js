//index.js
//获取应用实例
const app = getApp()
// let a = '';
// let ev = app.Event.event();
// ev.subscrilbe(function(arg){
// 	console.log(arg,'arg')
// 	a = arg
// 	wx.navigateTo({
//       url: '../storage/index',
//     })
// },'sendfirst')
Page({
	data: {
		motto: 'Hello World',
		userInfo: {
			avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/SYiaiba5faeraYBoQCWdsBX4hSjFKiawzhIpnXjejDtjmiaFqMqhIlRBqR7IVdbKE51npeF6X1cXxtDQD2bzehgqMA/132',
			nickName: 'jayzou'
		},
		lists: [
			'aslkdnoakjbsnfkajbfk',
			'qwrwfhbfdvndgndghndeghsdfh',
			'qweqwtefhfhgmjfgjdfghaefdhsdfgdfh',
		],
		showSkeleton: true
	},
	onLoad: function () {
		const that = this;
		setTimeout(() => {
			that.setData({
				showSkeleton: false
			})
		}, 3000)
		this.finsh();
	},
	finsh () {
		app.store.setState({
	      finish: true
	    })
	}
})
