/*
SQLyog Enterprise v12.09 (64 bit)
MySQL - 5.5.40 : Database - mi
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mi` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `mi`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `admin` */

insert  into `admin`(`id`,`username`,`password`) values (1,'root','123456');

/*Table structure for table `cart` */

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `pro_id` int(11) NOT NULL,
  `pro_name` varchar(100) NOT NULL,
  `nums` int(11) NOT NULL,
  `price` double NOT NULL,
  `image` varchar(100) NOT NULL,
  `u_id` int(11) NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `c_u_fk` (`u_id`),
  CONSTRAINT `c_u_fk` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

/*Data for the table `cart` */

insert  into `cart`(`cart_id`,`pro_id`,`pro_name`,`nums`,`price`,`image`,`u_id`) values (13,6,'小米10 青春版 5G',2,1899,'../../uploads/phone-05.jpg',1),(14,1,'小米10 至尊纪念版',2,5599,'../../uploads/phone-01.jpg',1),(15,18,'小米插线板 5孔位',3,39,'../../uploads/dapei-02.jpg',1),(16,23,'RedmiBook 13 全面屏',2,5299,'../../uploads/bijiben-01.jpg',1),(17,7,'小米MIX Alpha',2,19999,'../../uploads/phone-06.jpg',11);

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(50) NOT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `category` */

insert  into `category`(`c_id`,`categoryname`) values (1,'手机'),(2,'家电'),(3,'智能'),(4,'搭配'),(5,'配件'),(6,'周边'),(7,'笔记本'),(8,'健康'),(9,'耳机'),(10,'生活');

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `pro_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `simpleInfo` varchar(255) NOT NULL,
  `detailsInfo` text NOT NULL,
  `price` double NOT NULL,
  `image` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`pro_id`),
  KEY `p_c_fk` (`category_id`),
  CONSTRAINT `p_c_fk` FOREIGN KEY (`category_id`) REFERENCES `category` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`pro_id`,`name`,`simpleInfo`,`detailsInfo`,`price`,`image`,`category_id`) values (1,'小米10 至尊纪念版','120X 变焦/120W秒充/120Hz屏幕','120X 超远变焦 / 120W 秒充科技 / 120Hz刷新率 + 240Hz采样率 / 骁龙865旗舰处理器 / 双模5G / 10倍光学变焦 / OIS光学防抖+EIS数字防抖 / 2000万超清前置相机 / 双串蝶式石墨烯基锂离子电池 / 等效4500mAh大电量 / 120W 有线秒充+50W无线秒充+10W无线反充 / WiFi 6 / 多功能NFC / 红外遥控',5599,'../../uploads/phone-01.jpg',1),(2,'Redmi K30 至尊纪念版','120Hz弹出全面屏，天玑1000+旗舰处理器','120Hz弹出全面屏 / 天玑1000+旗舰处理器 / 索尼6400万四摄 / 立体声双扬声器 / 4500mAh+33W闪充 / 双模5G / 多功能NFC / 线性震动马达 / 红外遥控',1999,'../../uploads/phone-02.jpg',1),(3,'Redmi 红米电视 70英寸','70英寸震撼巨屏，4K画质，细腻如真','70英寸震撼巨屏，4K画质，细腻如真/70英寸震撼巨屏，4K画质，细腻如真/70英寸震撼巨屏，4K画质，细腻如真',2999,'../../uploads/jiadian-01.jpg',2),(4,'腾讯黑鲨3S','骁龙865处理器，120Hz刷新率','骁龙865处理器 / 双模5G / 270Hz触控采样率+120Hz屏幕刷新率 / 三星AMOLED全面屏 / 最高65W极速闪充+背部磁吸充电 / 4720mAh大容量双电池 / UFS3.1闪存+LPDDR5运存 / “三明治”液冷散热 / JoyUI 12 游戏操作系统 / 畅玩投屏',3999,'../../uploads/phone-03.jpg',1),(5,'Redmi 9A','5000mAh长循环大电量，6.53\"超大护眼屏幕','5000mAh长循环大电量 / 6.53\"超大护眼屏幕 / G25八核处理器 / 大音量扬声器 / 1300万 AI相机 / 人脸解锁 / 最高支持512GB存储扩展',499,'../../uploads/phone-04.jpg',1),(6,'小米10 青春版 5G','50倍潜望式变焦 / 轻薄5G手机','向往的生活同款/ 50倍潜望式超远变焦 / 双模5G / 骁龙765G处理器 / 三星AMOLED原色屏 / 180Hz采样率 / 4160mAh大电池 / 多功能NFC / 红外遥控器',1899,'../../uploads/phone-05.jpg',1),(7,'小米MIX Alpha','骁龙855Plus旗舰处理器 / 纳米硅基锂离子4050mAh电池','创新环绕屏，极具未来感的智能交互体验 / 1亿像素超高清相机，超大感光元件 / 5G双卡全网通超高速网络 / 骁龙855Plus旗舰处理器 / 纳米硅基锂离子4050mAh电池，40W超级快充 / 钛合金+精密陶瓷+蓝宝石镜片前沿工艺',19999,'../../uploads/phone-06.jpg',1),(8,'小米10','骁龙865处理器 / 1亿像素8K电影相机 / 双模5G','骁龙865处理器 / 1亿像素8K电影相机 / 双模5G / 新一代LPDDR5内存 / 对称式立体声 / 90Hz刷新率+180Hz采样率 / UFS 3.0高速存储 / 全面适配Wi-Fi 6 / 超强VC液冷散热 / 30W极速闪充+30W无线闪充+10W无线反充 / 4780mAh大电量 / 多功能NFC',3999,'../../uploads/phone-07.jpg',1),(9,'小米全面屏电视E32C','全面屏设计 / 高清分辨率 / 海量内容','全面屏设计 / 高清分辨率 / 海量内容 / 1G+4G大内存 / 多核处理器',749,'../../uploads/jiadian-02.jpg',2),(10,'小米全面屏电视E55A','全面屏设计 / 4K超高清+HDR','全面屏设计 / 4K超高清+HDR / 纤薄机身 / 2GB+8GB大内存 / 64位四核处理器 / 内置小爱同学',1799,'../../uploads/jiadian-03.jpg',2),(11,'定频 | 米家空调 大1匹','快速冷暖 / 静音设计 / 强力除湿','快速冷暖 / 静音设计 / 强力除湿',1499,'../../uploads/jiadian-04.jpg',2),(12,'米家互联网洗烘一体机Pro 10kg','国标双A+级洗烘能力 / 22种洗烘模式 / 除菌率达99.9%+ ','国标双A+级洗烘能力 / 22种洗烘模式 / 除菌率达99.9%+ / 支持小爱同学语音遥控 / 支持OTA在线智能升级 / 智能空气洗 / 智能投放洗涤剂',2999,'../../uploads/jiadian-05.jpg',2),(13,'Redmi全自动波轮洗衣机1A 8kg','8kg大容量 / 10种洗涤模式 / 10挡水位调节 / 耐腐蚀金属机身','8kg大容量 / 10种洗涤模式 / 10挡水位调节 / 耐腐蚀金属机身 / 桶自洁、桶风干模式避免细菌滋生 / 空气阻尼减震 / 免运费及基础安装费',899,'../../uploads/jiadian-06.jpg',2),(14,'小爱老师','AI英语学习机 / 词汇教材同步 / 无痛背单词 / AI电子词典','AI英语学习机 / 词汇教材同步 / 无痛背单词 / AI电子词典 / AI听说训练 / 内置小爱同学 / 翻译机 / AI录音笔 / 25天待机',499,'../../uploads/zhineng-01.jpg',3),(15,'小米智能门锁 E','6种开锁方式丨防插安全锁体丨电子门铃功能','6种开锁方式丨防插安全锁体丨电子门铃功能',999,'../../uploads/zhineng-02.jpg',3),(16,'小米小爱音箱 Play','智能设备控制 / 人工智能语音对话 / 就近唤醒 / 趣味闹钟 / 孩子的超级故事王','智能设备控制 / 人工智能语音对话 / 就近唤醒 / 趣味闹钟 / 孩子的超级故事王',99,'../../uploads/zhineng-03.jpg',3),(17,'小米真无线蓝牙耳机 Air 2','智能语音唤醒，解放双手 / 蓝牙5.0芯片，稳定无线连接','智能语音唤醒，解放双手 / 蓝牙5.0芯片，稳定无线连接 / 分体式真无线设计，无主从限制，单双耳灵活切换 / 双麦克风降噪，有效降低通话时环境噪音 / LHDC蓝牙解码高清音质 / 复合振膜动圈，还原声音细节',299,'../../uploads/dapei-01.jpg',4),(18,'小米插线板 5孔位','过载断电保护 / 独立安全门 / 高温阻燃','过载断电保护 / 独立安全门 / 高温阻燃',39,'../../uploads/dapei-02.jpg',4),(19,'小米无线充电宝青春版10000mAh','10000mAh大容量 / 支持边充边放 / 有线无线都能充 / 双向快充','10000mAh大容量 / 支持边充边放 / 有线无线都能充 / 双向快充',129,'../../uploads/peijian-01.jpg',5),(20,'米家飞行员太阳镜 Pro','阻隔紫外线防眩光 / 1mm 超细镜腿 / 不锈钢超薄镜架 / 免螺丝一体结构','阻隔紫外线防眩光 / 1mm 超细镜腿 / 不锈钢超薄镜架 / 免螺丝一体结构',199,'../../uploads/zhoubian-01.jpg',6),(21,'米家负离子速干吹风机 H300','9.5cm 超短简身 / 20m/s 超大风速 / 5000 万负离子 / 57°C智能恒温','9.5cm 超短简身 / 20m/s 超大风速 / 5000 万负离子 / 57°C智能恒温',149,'../../uploads/zhoubian-02.jpg',6),(22,'贝医生巴氏牙刷 四色装','赠精美旅行盒 / 德日进口刷毛 / 专利科学布局 / 全身食品级材质','赠精美旅行盒 / 德日进口刷毛 / 专利科学布局 / 全身食品级材质',39,'../../uploads/zhoubian-03.jpg',6),(23,'RedmiBook 13 全面屏','四窄边全面屏 / 全新十代酷睿™处理器 / 全金属超轻机身 / MX250 高性能独显 / 小米互传 / 专业「飓风」散热系统 / 11小时长续航','四窄边全面屏 / 全新十代酷睿™处理器 / 全金属超轻机身 / MX250 高性能独显 / 小米互传 / 专业「飓风」散热系统 / 11小时长续航',5299,'../../uploads/bijiben-01.jpg',7),(24,'米家自动洗手机套装','免接触更卫生 / 99.9%有效抑菌 / 植物精华，滋润舒适','免接触更卫生 / 99.9%有效抑菌 / 植物精华，滋润舒适',79,'../../uploads/jiankang-01.jpg',8),(25,'小米小爱音箱 Art','全新金属机身 / 极光灯带 / DTS专业调音 / 立体声2.0* / 匠心调制扬声器 / 第三代小爱同学','全新金属机身 / 极光灯带 / DTS专业调音 / 立体声2.0* / 匠心调制扬声器 / 第三代小爱同学',349,'../../uploads/erji-01.jpg',9),(26,'小米小背包','城市休闲 / 简约设计 / 多容量选择 / 防泼水','城市休闲 / 简约设计 / 多容量选择 / 防泼水',49,'../../uploads/shenghuo-01.jpg',10),(27,'Redmi K30 系列','双模5G / 三路并发 / 7nm 5G低功耗处理器 ','双模5G / 三路并发 / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67\'\'小孔径全面屏 / 索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NFC',1799,'../../uploads/phone-08.jpg',1),(28,'Redmi K30 Pro 系列','双模5G / 高通骁龙865 / 弹出式超光感全面屏 /索尼 6400万高清四摄 / 超大面积VC立体散热 / 4700mAh+33W疾速闪充 / 多功能NFC / 红外遥控','双模5G / 高通骁龙865 / 弹出式超光感全面屏 /索尼 6400万高清四摄 / 超大面积VC立体散热 / 4700mAh+33W疾速闪充 / 多功能NFC / 红外遥控',2699,'../../uploads/phone-09.jpg',1),(29,'米家电烤箱','32L大容积 / 上下独立控温 / 旋转烤叉 / 热风循环 / 40°C恒温发酵 / 120分钟定时 / 支持免定时持续运行','32L大容积 / 上下独立控温 / 旋转烤叉 / 热风循环 / 40°C恒温发酵 / 120分钟定时 / 支持免定时持续运行',299,'../../uploads/zhoubian-04.jpg',6),(30,'小米手环5','24小时睡眠监测 / 14天超长续航 / 磁吸式充电 / 11种运动模式','24小时睡眠监测 / 14天超长续航 / 磁吸式充电 / 11种运动模式',189,'../../uploads/zhineng-04.jpg',3);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`) values (1,'zhangsan','123456'),(2,'zhaoliu','123456'),(11,'xuanlvge','3016zzz'),(12,'56165165','314234234234');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
