<?php
namespace Home\Controller;

use Think\Controller;

class NewsController extends Controller{

    public function allNews(){
        $activity = D('activity');
        $data = $activity->select();
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

    public function addNews(){
        $activity = D('activity');
        if($activity->create()){
            $data = $activity->add();
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
    }

    public function updateShow(){
        $activity = D('activity');
        $id = $_POST['id'];
        $checked = $_POST['checked'];
        $data['isShow'] = $checked;

        $activity = $activity->where("newsId='$id'")->setField($data);
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

    public function updateCollect(){
        $activity = D('activity');
        $id = $_POST['id'];
        $collect = $_POST['collect'];
        $data['newsCollect'] = $collect;

        $activity = $activity->where("newsId='$id'")->setField($data);
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

    public function selectNews(){
        $activity = D('activity');
        $search = $_POST['search'];
        $data = $activity->where("newsName like '%$search%'")->select();
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

    public function delNews(){
        $activity = D('activity');
        $id = $_GET['id'];
        $data = $activity->where("newsId='$id'")->delete();
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

    public function batchDelNews(){
        $activity = D('activity');
        $ids = $_POST['del'];
        $data = $activity->where(array('newsId'=>array('in',$ids)))->delete();
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

    public function batchUpdateNews(){
        $activity = D('activity');
        $ids = $_POST['update'];
        $data['newsStatus'] = '审核通过';
        $data = $activity->where(array('newsId'=>array('in',$ids)))->setField($data);
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