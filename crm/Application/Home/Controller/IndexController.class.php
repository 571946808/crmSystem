<?php
namespace Home\Controller;

use Think\Controller;

class IndexController extends Controller{

    public function login(){
        $username = $_POST['username'];
        $password = $_POST['password'];
        $login = D('management');
        $data = $login->where("username='$username' AND password='$password'")->find();
        if($data){
            $_SESSION['management_id']=$data['id'];
            $result = array(
                'code' => '0',
                'ext' => '登录成功'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '用户名不存在或者密码错误'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }

    public function getInfo(){
        $id = $_SESSION['management_id'];
        $login = D('management');
        $data = $login->where("id='$id'")->find();
        if($data){
            $result = array(
                'code' => '0',
                'data' => $data
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '用户名不存在'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }

    public function sendInfo(){
        $management = D('management');
        $id = $_SESSION['management_id'];

        $username = $_POST['username'];
        $usergroup = $_POST['usergroup'];
        $name = $_POST['name'];
        $sex = $_POST['sex'];
        $tel = $_POST['tel'];
        $birth = $_POST['birth'];
        $province = $_POST['province'];
        $city = $_POST['city'];
        $email = $_POST['email'];
        $assess = $_POST['assess'];

        $data['username'] = $username;
        $data['name'] = $name;
        $data['sex'] = $sex;
        $data['tel'] = $tel;
        $data['birth'] = $birth;
        $data['province'] = $province;
        $data['city'] = $city;
        $data['email'] = $email;
        $data['assess'] = $assess;

        $management = $management->where("id='$id'")->setField($data);
        if($service){                
            $result = array(
                'code' => '0',
                'ext' => '修改成功！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '0',
                'errMsg' => '修改失败！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }

    public function reset(){
        $management = D('management');
        $id = $_SESSION['management_id'];
        $password = $_POST['password'];

        $data = $management->where("id='$id'")->setField('password',$password);

        if($data){
            
            $result = array(
                'code' => '0',
                'ext' => '修改成功！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '修改失败！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }

}