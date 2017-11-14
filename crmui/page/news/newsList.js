layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

	//加载页面数据
	var newsData = '';
	newsList();

	//查询
	$(".search_btn").click(function(){
		var newArray = [];
		if($(".search_input").val() != ''){
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
        	$.ajax({
				url : "/crm/index.php/Home/News/selectNews",
				type : "post",
				dataType : "json",
				data: {search: $(".search_input").val()},
				success : function(data){			
	            	if(data.code == 0){
	            		$(".news_content").html(renderDate(data.data));
						$('.news_list thead input[type="checkbox"]').prop("checked",false);
	            		form.render();
	            		layer.msg("查询成功！");
	            	}else{
	            		layer.msg("暂无数据！");
	            	}
				}
			})
        	
            layer.close(index);
		}else{
			layer.msg("请输入需要查询的内容");
		}
	})

	//添加文章
	$(".newsAdd_btn").click(function(){
		var index = layui.layer.open({
			title : "添加文章",
			type : 2,
			content : "newsAdd.html",
			success : function(layero, index){
				layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
					tips: 3
				});
			}
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function(){
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})

	//推荐文章
	$(".recommend").click(function(){
		var $checkbox = $(".news_list").find('tbody input[type="checkbox"]:not([name="show"])');
		if($checkbox.is(":checked")){
			var index = layer.msg('推荐中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
                layer.close(index);
				layer.msg("推荐成功");
            },2000);
		}else{
			layer.msg("请选择需要推荐的文章");
		}
	})

	//审核文章
	$(".audit_btn").click(function(){
		var arr = [];
		var $checkbox = $('.news_list tbody input[type="checkbox"][name="checked"]');
		var $checked = $('.news_list tbody input[type="checkbox"][name="checked"]:checked');
		if($checkbox.is(":checked")){
			var index = layer.msg('审核中，请稍候',{icon: 16,time:false,shade:0.8});
            $(".sub:checked").each(function(index, item){
					arr.push(item.value);
				});
				$.ajax({
					url: "/crm/index.php/Home/News/batchUpdateNews",
					type: "post",
					data: {update: arr},
					dataType: "json",
					success: function(data){
						if(data.code == 0){
							newsList();
							layer.msg("审核成功!");
						}else{
							layer.msg("审核失败!");
						}
					},
					error: function(error){
						layer.msg("批量删除失败!");
					}
				});
				layer.close(index);
		}else{
			layer.msg("请选择需要审核的文章");
		}
	})

	//批量删除
	$(".batchDel").click(function(){
		var arr = [];
		var $checkbox = $('.news_list tbody input[type="checkbox"][name="checked"]');
		var $checked = $('.news_list tbody input[type="checkbox"][name="checked"]:checked');
		if($checkbox.is(":checked")){
			layer.confirm('确定删除选中的信息？',{icon:3, title:'提示信息'},function(index){
				$(".sub:checked").each(function(index, item){
					arr.push(item.value);
				});
				$.ajax({
					url: "/crm/index.php/Home/News/batchDelNews",
					type: "post",
					data: {del: arr},
					dataType: "json",
					success: function(data){
						if(data.code == 0){
							newsList();
							layer.msg("批量删除成功!");
						}else{
							layer.msg("批量删除失败!");
						}
					},
					error: function(error){
						layer.msg("批量删除失败!");
					}
				});
				layer.close(index);
	        })
		}else{
			layer.msg("请选择需要删除的活动");
		}
	})

	//全选
	form.on('checkbox(allChoose)', function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		child.each(function(index, item){
			item.checked = data.elem.checked;
		});
		form.render('checkbox');
	});

	//通过判断文章是否全部选中来确定全选按钮是否选中
	form.on("checkbox(choose)",function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		var childChecked = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"]):checked')
		if(childChecked.length == child.length){
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = true;
		}else{
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = false;
		}
		form.render('checkbox');
	})

	//是否展示
	form.on('switch(isShow)', function(data){
		var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
		$.post("/crm/index.php/Home/News/updateShow", {
			id: data.value,
			checked: data.elem.checked == false? "":"checked"
		}, function(rs){
			if($.parseJSON(rs).code == 0){
				layer.close(index);
				layer.msg("展示状态修改成功！");
			}else{
				layer.close(index);
				layer.msg("展示状态修改失败！");
			}
		})
	})

	//操作
	$("body").on("click",".news_edit",function(){  //编辑
		layer.alert('您点击了文章编辑按钮，由于是纯静态页面，所以暂时不存在编辑内容，后期会添加，敬请谅解。。。',{icon:6, title:'文章编辑'});
	})

	$("body").on("click",".news_collect",function(data){  //收藏.
		var id = $(data.target).parents('tr').attr('data-id');
		var that = this
		if($(that).text().indexOf("已收藏") > 0){
			$.post("/crm/index.php/Home/News/updateCollect", {
				id: id,
				collect: "未收藏"
			}, function(rs){
				if($.parseJSON(rs).code == 0){
					$(that).html("<i class='layui-icon'>&#xe600;</i> 收藏");
					layer.msg("取消收藏成功！");
				}else{
					layer.msg("取消收藏失败！");
				}
			})
		}else{
			$.post("/crm/index.php/Home/News/updateCollect", {
				id: id,
				collect: "已收藏"
			}, function(rs){
				if($.parseJSON(rs).code == 0){
					$(that).html("<i class='iconfont icon-star'></i> 已收藏");
					layer.msg("收藏成功！");
				}else{
					layer.msg("收藏失败！");
				}
			})
		}
	})

	$("body").on("click",".news_del",function(){  //删除
		var _this = $(this);
		layer.confirm('确定删除此信息？',{icon:3, title:'提示信息'},function(index){
			$.get("/crm/index.php/Home/News/delNews", { id: _this.attr("data-id") },
			    function(data){
			        if($.parseJSON(data).code == 0) {
			        	newsList();
			        	layer.msg('删除成功！');
			        }else{
			        	layer.msg('删除失败！');
			        }
			});
			layer.close(index);
		});
	})

	function newsList(){
		//渲染数据
		$.get("/crm/index.php/Home/News/allNews", function(data){
			newsData = $.parseJSON(data).list;
			// if(window.sessionStorage.getItem("addUser")){
			// 	var addUsers = window.sessionStorage.getItem("addUser");
			// 	usersData = JSON.parse(addUsers).concat(usersData);
			// }
			//执行加载数据的方法
			//分页
			var nums = 13; //每页出现的数据量
			laypage({
				cont : "page",
				// pages : Math.ceil(newsData.length/nums),
				jump : function(obj){
					$(".news_content").html(renderDate(newsData));
					$('.news_list thead input[type="checkbox"]').prop("checked",false);
			    	form.render();
				}
			})
		})
	}
	function renderDate(data){
		var dataHtml = '';
		currData = data
		if(currData.length != 0){
			for(var i=0;i<currData.length;i++){
				dataHtml += '<tr data-id="'+currData[i].newsid+'">'
		    	+'<td><input type="checkbox" name="checked" class="sub" lay-skin="primary" lay-filter="choose" value="'+currData[i].newsid+'"></td>'
		    	+'<td align="left">'+currData[i].newsname+'</td>'
		    	+'<td>'+currData[i].newsauthor+'</td>';
		    	if(currData[i].newsstatus == "待审核"){
		    		dataHtml += '<td style="color:#f00">'+currData[i].newsstatus+'</td>';
		    	}else{
		    		dataHtml += '<td>'+currData[i].newsstatus+'</td>';
		    	}
		    	dataHtml += '<td>'+currData[i].newslook+'</td>'
		    	+'<td><input type="checkbox" name="show" lay-skin="switch" lay-text="是|否" lay-filter="isShow"'+currData[i].isshow+' value="'+currData[i].newsid+'"></td>'
		    	+'<td>'+currData[i].newstime+'</td>'
		    	+'<td>'
				// +  '<a class="layui-btn layui-btn-mini news_edit"><i class="iconfont icon-edit"></i> 编辑</a>'
				if(currData[i].newscollect == "未收藏"){
		    		dataHtml += '<a class="layui-btn layui-btn-normal layui-btn-mini news_collect" data-id="'+currData[i].newsid+'"><i class="layui-icon">&#xe600;</i> 收藏</a>';
		    	}else{
		    		dataHtml += '<a class="layui-btn layui-btn-normal layui-btn-mini news_collect" data-id="'+currData[i].newsid+'"><i class="iconfont icon-star"></i> 已收藏</a>';
		    	}
				+  ''
				+  '<a class="layui-btn layui-btn-danger layui-btn-mini news_del" data-id="'+currData[i].newsid+'"><i class="layui-icon">&#xe640;</i> 删除</a>'
		        +'</td>'
		    	+'</tr>';
			}
		}else{
			dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
		}
	    return dataHtml;
	}

		//分页
		// var nums = 13; //每页出现的数据量
		// laypage({
		// 	cont : "page",
		// 	// pages : Math.ceil(newsData.length/nums),
		// 	jump : function(obj){
		// 		$(".news_content").html(renderDate(newsData));
		// 		$('.news_list thead input[type="checkbox"]').prop("checked",false);
		//     	form.render();
		// 	}
		// })
})
