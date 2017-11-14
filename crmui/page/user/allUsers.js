layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

	//加载页面数据
	var usersData = '';
	usersList();

	//查询
	$(".search_btn").click(function(){
		var userArray = [];
		if($(".search_input").val() != ''){
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            	$.ajax({
					url : "/crm/index.php/Home/User/selectUser",
					type : "post",
					dataType : "json",
					data: {search: $(".search_input").val()},
					success : function(data){			
		            	if(data.code == 0){
		            		$(".users_content").html(renderDate(data.data));
		            		$('.users_list thead input[type="checkbox"]').prop("checked",false);
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

	$(".batchDel").click(function(){
		var arr = [];
		if($(".sub:checked").length < 1){
			layer.msg("请至少选择一个删除项!");
		}else{
			layer.confirm('确定批量删除用户？',{icon:3, title:'提示信息'},function(index){
				$(".sub:checked").each(function(index, item){
					arr.push(item.value);
				});
				$.ajax({
					url: "/crm/index.php/Home/User/batchDelUser",
					type: "post",
					data: {del: arr},
					dataType: "json",
					success: function(data){
						if(data.code == 0){
							usersList();
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
			});
			
		}		
	});

	//添加会员
	$(".usersAdd_btn").click(function(){
		var index = layui.layer.open({
			title : "添加用户",
			type : 2,
			content : "addUser.html",
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

	//操作
	// $("body").on("click",".users_edit",function(){  //编辑
	// 	layer.alert('您点击了会员编辑按钮，由于是纯静态页面，所以暂时不存在编辑内容，后期会添加，敬请谅解。。。',{icon:6, title:'文章编辑'});
	// })

	$("body").on("click",".users_del",function(){  //删除
		var _this = $(this);
		layer.confirm('确定删除此用户？',{icon:3, title:'提示信息'},function(index){
			//_this.parents("tr").remove();
			// for(var i=0;i<usersData.length;i++){
			// 	if(usersData[i].userid == _this.attr("data-id")){
			// 		usersData.splice(i,1);
			// 		usersList(usersData);
			// 	}
			// }
			$.get("/crm/index.php/Home/User/delUser", { id: _this.attr("data-id") },
			    function(data){
			        if($.parseJSON(data).code == 0) {
			        	usersList();
			        	layer.msg('删除成功！');
			        }else{
			        	layer.msg('删除失败！');
			        }
			});
			layer.close(index);
		});
	})

	function usersList(){
		$.get("/crm/index.php/Home/User/allUser", function(data){
			usersData = $.parseJSON(data).list;
			// if(window.sessionStorage.getItem("addUser")){
			// 	var addUsers = window.sessionStorage.getItem("addUser");
			// 	usersData = JSON.parse(addUsers).concat(usersData);
			// }
			//执行加载数据的方法
			//分页
			var nums = 13; //每页出现的数据量
			// if(usersData) {
				laypage({
					cont : "page",
					// pages : Math.ceil(usersData.length/nums),
					jump : function(obj){
						$(".users_content").html(renderDate(usersData));
						$('.users_list thead input[type="checkbox"]').prop("checked",false);
				    	form.render();
					}
				})
			// }
		})
	}

	//渲染数据
	function renderDate(usersData)	{
		var dataHtml = '';
		// currData = usersData.concat().splice(curr*nums-nums, nums);
		currData = usersData;
		if(currData !=undefined && currData.length != 0){
			for(var i=0;i<currData.length;i++){
				dataHtml += '<tr>'
		    	+  '<td><input type="checkbox" class="sub" name="checked" lay-skin="primary" lay-filter="choose" value="'+ currData[i].userid +'"></td>'
		    	+  '<td>'+currData[i].username+'</td>'
		    	+  '<td>'+currData[i].useremail+'</td>'
		    	+  '<td>'+currData[i].usertel+'</td>'
		    	+  '<td>'+currData[i].userage+'</td>'
		    	+  '<td>'+currData[i].usersex+'</td>'
		    	+  '<td>'+currData[i].usercompany+'</td>'
		    	+  '<td>'
				+    '<a class="layui-btn layui-btn-mini users_edit" href="addUseredit.html?id='+ currData[i].userid +'"><i class="iconfont icon-edit"></i> 编辑</a>'
				+    '<a class="layui-btn layui-btn-danger layui-btn-mini users_del" data-id="'+ currData[i].userid +'"><i class="layui-icon">&#xe640;</i> 删除</a>'
		        +  '</td>'
		    	+'</tr>';
			}
		}else{
			dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
		}
	    return dataHtml;
	}
        
})