var $;
layui.config({
	base : "js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage;
		$ = layui.jquery;

 	var addUser = {};
 	var id = GetQueryString("id");
 	if(id){
 		$.post("/crm/index.php/Home/User/findUser", {
 				id: id
	 		},
	      	function(data){
	      		if($.parseJSON(data).code == 0){
	      			var data = $.parseJSON(data).data;
	      			$(".userName").val(data.username);  //登录名
			        $(".userEmail").val(data.useremail);	 //邮箱
			        $(".userTel").val(data.usertel);	 //电话号码
			        $(".userAge").val(data.userage);	 //年龄
			        $(".userCompany").val(data.usercompany);	//公司
			        $(".userSex").val(data.usersex);	//性别
			        $(".userDescription").val(data.userdescription);	//描述
	      		}else{
	      			layer.alert("用户信息获取失败！")
	      		}          		
		});
 	} 	
 	form.on("submit(addUser)",function(data){
 		//是否添加过信息
	 	// if(window.sessionStorage.getItem("addUser")){
	 	// 	addUserArray = JSON.parse(window.sessionStorage.getItem("addUser"));
	 	// }


	 	// var userStatus,userGrade,userEndTime;
	 	// //会员等级
	 	// if(data.field.userGrade == '0'){
 		// 	userGrade = "注册会员";
 		// }else if(data.field.userGrade == '1'){
 		// 	userGrade = "中级会员";
 		// }else if(data.field.userGrade == '2'){
 		// 	userGrade = "高级会员";
 		// }else if(data.field.userGrade == '3'){
 		// 	userGrade = "超级会员";
 		// }
 		// //会员状态
 		// if(data.field.userStatus == '0'){
 		// 	userStatus = "正常使用";
 		// }else if(data.field.userStatus == '1'){
 		// 	userStatus = "限制用户";
 		// }
 		if(id){
 			addUser.userId = id;	//id
 		}       
        addUser.userName =  $(".userName").val();  //登录名
        addUser.userEmail = $(".userEmail").val();	 //邮箱
        addUser.userTel = $(".userTel").val();	 //电话号码
        addUser.userAge = $(".userAge").val();	 //年龄
        addUser.userCompany = $(".userCompany").val();	//公司
        addUser.userSex = data.field.sex; //性别
        addUser.userDescription = $(".userDescription").val();	//描述
        addUser.type = 2;	//会员

 		// addUser += '"userStatus":"'+ userStatus +'",'; //会员等级
 		// addUser += '"userGrade":"'+ userGrade +'",'; //会员状态
 		// addUser += '"userEndTime":"'+ formatTime(new Date()) +'"}';  //登录时间

		// addUserArray.unshift(JSON.parse(addUser));
 		// window.sessionStorage.setItem("addUser",JSON.stringify(addUserArray));
		//弹出loading
 		var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
 		$.post("/crm/index.php/Home/User/addUserHuiyuan", addUser,
          	function(data){
          		if($.parseJSON(data).code == 0){
        console.log(addUser)
          			top.layer.close(index);
					top.layer.msg("用户添加成功！");
		 			layer.closeAll("iframe");
			 		//刷新父页面
			 		parent.location.reload();
          		}else{
          			layer.alert("用户添加失败！")
          		}          		
		});
   //      setTimeout(function(){
   //          top.layer.close(index);
			// top.layer.msg("用户添加成功！");
 		// 	layer.closeAll("iframe");
	 	// 	//刷新父页面
	 	// 	parent.location.reload();
   //      },2000);
 		return false;

 	})
	
})

//格式化时间
function formatTime(_time){
    var year = _time.getFullYear();
    var month = _time.getMonth()+1<10 ? "0"+(_time.getMonth()+1) : _time.getMonth()+1;
    var day = _time.getDate()<10 ? "0"+_time.getDate() : _time.getDate();
    var hour = _time.getHours()<10 ? "0"+_time.getHours() : _time.getHours();
    var minute = _time.getMinutes()<10 ? "0"+_time.getMinutes() : _time.getMinutes();
    return year+"-"+month+"-"+day+" "+hour+":"+minute;
}
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
// //加入会员
// $('#joinUser').on('click', function(){
// 	// debugger;
//     layer.open({
//         type: 1,
//         shadeClose: false, //点击遮罩关闭
//         btn: ['确定','取消'],
//         yes: function (index) {
//
//         },
//         btn2: function( index ){
//             layer.close(index);
//         },
//         content: '\<\div style="padding:20px 50px 20px 50px;font-size:16px;">是否要加入会员?\<\/div>'
//     });
// });

