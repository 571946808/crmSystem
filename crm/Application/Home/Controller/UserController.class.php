<?php
namespace Home\Controller;

use Think\Controller;

class UserController extends Controller{
    // 用户
    public function allUser(){
        $user = D('user');
        $data = $user->where("type='0'")->select();
        if($data){
            $result = array(
                'code' => '0',
                'list' => $data
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '查询失败！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }
    // 客户
    public function allKehu(){
        $user = D('user');
        $data = $user->where("type='1'")->select();
        if($data){
            $result = array(
                'code' => '0',
                'list' => $data
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '查询失败！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }
    // 会员
    public function allHuiyuan(){
        $user = D('user');
        $data = $user->where("type='2'")->select();
        if($data){
            $result = array(
                'code' => '0',
                'list' => $data
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '查询失败！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }
    public function delUser(){
        $user = D('user');
        $id = $_GET['id'];
        $data = $user->where("userId='$id'")->delete();
        if($data){
            $result = array(
                'code' => '0'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '删除失败！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }

    public function addUser(){
        $user = D('user');
        $id = $_POST['userId'];
        if(!$id){
            if($user->create()){
                $data = $user->add();
                if($data){            
                    $result = array(
                        'code' => '0'
                    );
                    echo json_encode($result,JSON_UNESCAPED_UNICODE);
                }else{
                    $result = array(
                        'code' => '1',
                        'errMsg' => '添加失败！'
                    );
                    echo json_encode($result,JSON_UNESCAPED_UNICODE);
                }
            }
        }else{
            $userName = $_POST['userName'];
            $userEmail = $_POST['userEmail'];
            $userTel = $_POST['userTel'];
            $userAge = $_POST['userAge'];
            $userCompany = $_POST['userCompany'];
            $userSex = $_POST['userSex'];
            $userDescription = $_POST['userDescription'];

            $data['userName'] = $userName;
            $data['userEmail'] = $userEmail;
            $data['userTel'] = $userTel;
            $data['userAge'] = $userAge;
            $data['userCompany'] = $userCompany;
            $data['userSex'] = $userSex;
            $data['userDescription'] = $userDescription;

            $service = $user->where("userId='$id'")->setField($data);

            if($service){                
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

    public function addUserKehu(){
        $user = D('user');
        $id = $_POST['userId'];
        if(!$id){
            if($user->create()){
                $data = $user->add();
                if($data){            
                    $result = array(
                        'code' => '0'
                    );
                    echo json_encode($result,JSON_UNESCAPED_UNICODE);
                }else{
                    $result = array(
                        'code' => '1',
                        'errMsg' => '添加失败！'
                    );
                    echo json_encode($result,JSON_UNESCAPED_UNICODE);
                }
            }
        }else{
            $userName = $_POST['userName'];
            $userEmail = $_POST['userEmail'];
            $userTel = $_POST['userTel'];
            $userAge = $_POST['userAge'];
            $userCompany = $_POST['userCompany'];
            $userSex = $_POST['userSex'];
            $userDescription = $_POST['userDescription'];

            $data['userName'] = $userName;
            $data['userEmail'] = $userEmail;
            $data['userTel'] = $userTel;
            $data['userAge'] = $userAge;
            $data['userCompany'] = $userCompany;
            $data['userSex'] = $userSex;
            $data['userDescription'] = $userDescription;
            $data['type'] = 1;

            $service = $user->where("userId='$id'")->setField($data);

            if($service){                
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

    public function addUserHuiyuan(){
        $user = D('user');
        $id = $_POST['userId'];
        if(!$id){
            if($user->create()){
                $data = $user->add();
                if($data){            
                    $result = array(
                        'code' => '0'
                    );
                    echo json_encode($result,JSON_UNESCAPED_UNICODE);
                }else{
                    $result = array(
                        'code' => '1',
                        'errMsg' => '添加失败！'
                    );
                    echo json_encode($result,JSON_UNESCAPED_UNICODE);
                }
            }
        }else{
            $userName = $_POST['userName'];
            $userEmail = $_POST['userEmail'];
            $userTel = $_POST['userTel'];
            $userAge = $_POST['userAge'];
            $userCompany = $_POST['userCompany'];
            $userSex = $_POST['userSex'];
            $userDescription = $_POST['userDescription'];

            $data['userName'] = $userName;
            $data['userEmail'] = $userEmail;
            $data['userTel'] = $userTel;
            $data['userAge'] = $userAge;
            $data['userCompany'] = $userCompany;
            $data['userSex'] = $userSex;
            $data['userDescription'] = $userDescription;
            $data['type'] = 2;

            $service = $user->where("userId='$id'")->setField($data);

            if($service){                
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

    public function findUser(){
        $user = D('user');
        $id = $_POST['id'];
        $data = $user->where("userId='$id'")->find();
        if($data){
            $result = array(
                'code' => '0',
                'data' => $data
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '删除失败！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }

    public function selectUser(){
        $user = D('user');
        $search = $_POST['search'];
        $data = $user->where("userName like '%$search%' AND type='1'")->select();
        if($data){
            $result = array(
                'code' => '0',
                'data' => $data
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '查询失败！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }

    public function selectHuiyuan(){
        $user = D('user');
        $search = $_POST['search'];
        $data = $user->where("userName like '%$search%' AND type='2'")->select();
        if($data){
            $result = array(
                'code' => '0',
                'data' => $data
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '查询失败！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }

    public function batchDelUser(){
        $user = D('user');
        $ids = $_POST['del'];
        $data = $user->where(array('userId'=>array('in',$ids)))->delete();
        if($data){
            $result = array(
                'code' => '0'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            $result = array(
                'code' => '1',
                'errMsg' => '删除失败！'
            );
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }
    }

}