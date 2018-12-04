export function rewriteRequest(){
	try {
      	const originRequest = wx.request;
		Object.defineProperty(wx, 'request', {
		  	configurable:true,
		  	enumerable: true,
		  	writable: true,
			value: function(){
				let options = arguments[0] || {};
				//对于发送错误信息的接口不收集，防止死循环
				var regexp = new RegExp("https://xxxx/error","g");
				if (regexp.test(options.url)) {
				    //这里要执行原来的方法
					return originRequest.call(this, options)
				}
				//这里拦截请求成功或失败接口，拿到请求后的数据
				["success", "fail"].forEach((methodName) => {
					let defineMethod = options[methodName];
					options[methodName] = function(){
						try{	      //在重新定义函数中执行原先的函数，不影响正常逻辑
						    defineMethod && defineMethod.apply(this, arguments);
						    //开始信息收集
							let statusCode, result, msg;
							//请求失败
							if (methodName == 'fail') {
								statusCode = 0;
								result = 'fail';
								msg = ( arguments[0] && arguments[0].errMsg ) || ""
							}
							//请求成功，
							//收集规则为:
							// 1、 statusCode非2xx,3xx
							// 2、 statusCode是2xx,3xx，但接口返回result不为ok
							if (methodName == 'success') {
								let data = arguments[0] || {};
								statusCode = data.statusCode || "";
								if (data.statusCode && Number(data.statusCode) >= 200 && Number(data.statusCode) < 400 ) {
									let resData = data.data ? (typeof data.data == 'object' ? data.data : JSON.parse(data.data)) : {};
									//请求成功，不收集
									if (resData.result == 'ok') {
										return;
									}
									result = resData.result || "";
									msg = resData.msg || "";
								}else{
									result = "";
									msg = data.data || "";
								}
							}
							//过滤掉header中的敏感信息
							if (options.header) {
								options.header.userid && (delete options.header.userid)
							}
							//过滤掉data中的敏感信息
							if (options.data) {
								options.data.userid && (delete options.data.userid)
							}

					        var collectInfo = {
								"url": options.url || '',	//请求地址
								"method": options.method || "GET",	//请求方法
								"request_header": JSON.stringify(options.header || {}), //请求头部信息
								"request_data": JSON.stringify(options.data || {}), //请求参数
								"resp_code": statusCode + '',	//请求状态码
								"resp_result": result, //请求返回结果
								"resp_msg": msg, //请求返回描述信息
					        }
					        //提交参数与上一次不同，或者参数相同，隔了1s
					        if (JSON.stringify(collectInfo) != lastParams.paramStr || (new Date().getTime() - lastParams.timestamp > 1000)) {
					        	//上传错误信息
					        	Post.post_error(_miniapp, 'http', collectInfo)
					        	lastParams.paramStr = JSON.stringify(collectInfo);
					        	lastParams.timestamp = new Date().getTime()
					        }

						}catch(e){
							//console.log(e);
						}
					};
				})
			  	return originRequest.call(this, options)
			}
		})
	} catch (e) {
		// Do something when catch error
	}
}
