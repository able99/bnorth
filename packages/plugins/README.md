# `bnorth-plugins`

bnorth 常用插件集合

## 插件列表

### base64

提供了编码和解码 base64 字符串的能力

### browser

实现浏览器的操作，包括通过 user angent 的平台检测、标题，图标的管理、cookie 管理、url 解析等

### cordova

cordova 扩展调用辅助工具

### format

实现格式化功能，比如时间格式化，数字格式化，货币格式化等。

### geolocation

获取位置信息

*** 坐标系 ***

从设备获取经纬度（GPS）坐标

1. 如果使用的是百度sdk那么可以获得百度坐标（bd09）或者火星坐标（GCJ02),默认是bd09
1. 如果使用的是ios的原生定位库，那么获得的坐标是WGS84
1. 如果使用的是高德sdk,那么获取的坐标是GCJ02

火星坐标系：
iOS 地图（其实是高德）、Google国内地图（.cn域名下）、搜搜、阿里云、高德地图、腾讯
百度坐标系：
百度地图
WGS84坐标系：
谷歌国外地图、osm地图等

### md5

负责 md5 编码

### network

网络请求

### request

网络数据的数据单元

### storage

存储能力

### validate

数据有效性校验

## 文档

[bnorth 文档](//able99.github.io/#cbnorth)

[参考手册](//able99.github.io/bnorth/plugins/)
