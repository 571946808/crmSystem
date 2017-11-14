/*
MySQL Data Transfer
Source Host: localhost
Source Database: crm
Target Host: localhost
Target Database: crm
Date: 2017/11/14 9:00:56
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for crm_activity
-- ----------------------------
DROP TABLE IF EXISTS `crm_activity`;
CREATE TABLE `crm_activity` (
  `newsId` int(100) NOT NULL AUTO_INCREMENT,
  `newsName` varchar(50) DEFAULT NULL,
  `newsAuthor` varchar(50) DEFAULT NULL,
  `newsStatus` varchar(50) DEFAULT NULL,
  `isShow` varchar(10) DEFAULT '""',
  `newsTime` varchar(50) DEFAULT NULL,
  `newsLook` varchar(50) DEFAULT NULL,
  `newsKey` varchar(50) DEFAULT NULL,
  `newsAbstract` varchar(200) DEFAULT NULL,
  `newsContent` varchar(200) DEFAULT NULL,
  `newsCollect` varchar(50) DEFAULT '未收藏',
  PRIMARY KEY (`newsId`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for crm_management
-- ----------------------------
DROP TABLE IF EXISTS `crm_management`;
CREATE TABLE `crm_management` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `usergroup` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `birth` varchar(20) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `assess` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for crm_user
-- ----------------------------
DROP TABLE IF EXISTS `crm_user`;
CREATE TABLE `crm_user` (
  `userName` varchar(50) DEFAULT '',
  `userEmail` varchar(50) DEFAULT NULL,
  `userTel` varchar(20) DEFAULT NULL,
  `userAge` varchar(20) DEFAULT NULL,
  `userCompany` varchar(50) DEFAULT NULL,
  `userSex` varchar(10) DEFAULT NULL,
  `userDescription` varchar(200) DEFAULT NULL,
  `userId` int(100) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT '0',
  `userCreateTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `userEndTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `crm_activity` VALUES ('4', '2', null, '审核通过', 'checked', null, null, null, null, null, '未收藏');
INSERT INTO `crm_activity` VALUES ('3', '1', null, '审核通过', '', null, null, null, null, null, '未收藏');
INSERT INTO `crm_activity` VALUES ('9', '21321312', '21321', '审核通过', 'checked', '2017-11-06', '开放浏览', '', '', '', '未收藏');
INSERT INTO `crm_management` VALUES ('1', 'admin', 'admin', '超级管理员', '张三', '男', '15732456789', '1995-08-08', '', '', '21312@qq.com', '优秀哈');
INSERT INTO `crm_user` VALUES ('1', '111@qq.com', '1572848329479', '111', 'gongsi', '男', 'gts是猪', '14', '0', '2017-11-09 20:10:17', null);
INSERT INTO `crm_user` VALUES ('2', '123@qq.com', '', '', '', '男', '324233123123', '15', '0', '2017-11-09 19:13:02', null);
INSERT INTO `crm_user` VALUES ('3', null, null, null, null, null, null, '16', '0', null, null);
INSERT INTO `crm_user` VALUES ('1', '111@qq.com', '', '', '', '男', '', '25', '0', null, null);
INSERT INTO `crm_user` VALUES ('2', '222@qq.com', '', '', '', '男', '', '26', '0', null, null);
INSERT INTO `crm_user` VALUES ('5', '5@qq.com', '', '', null, '男', null, '19', '0', null, null);
INSERT INTO `crm_user` VALUES ('6', '666@qq.com', '', '', null, '女', null, '20', '0', '2017-11-09 17:20:46', null);
INSERT INTO `crm_user` VALUES ('7', '777@qq.com', '', '', null, '女', null, '21', '0', null, null);
INSERT INTO `crm_user` VALUES ('qw21312', '213@qq.com', '', '', '', '男', '', '30', '0', null, null);
INSERT INTO `crm_user` VALUES ('wqeqwe', '213@qq.com', '', '', '', '男', '', '28', '1', '2017-11-09 20:39:04', null);
INSERT INTO `crm_user` VALUES ('21312', '21312@qq.com', '', '', '', '男', null, '34', '0', null, null);
INSERT INTO `crm_user` VALUES ('wq213wweq21', '213@qq.com', '', '', '', '男', '', '31', '0', null, null);
INSERT INTO `crm_user` VALUES ('213', '2131@qq.com', '', '', '', '男', '', '32', '0', null, null);
INSERT INTO `crm_user` VALUES ('213', '213@qq.com', '', '', '', '男', null, '45', '2', null, null);
