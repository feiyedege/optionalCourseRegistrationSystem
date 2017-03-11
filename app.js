//引用模块
var express = require("express");
var session = require('express-session')
var mongoose = require("mongoose");
//路由
var common_router = require("./router/common-router.js");
var admin_router = require("./router/admin-router.js");
var student_router = require("./router/student-router.js");
//创建APP
var app = express();
//mongoose链接数据库
mongoose.connect('mongodb://localhost:27017/xuanxiukebaoming');

//设置默认模板引擎
app.set("view engine","ejs");
app.set("views","views");

//设置session
app.set('trust proxy', 1)
app.use(session({
    secret: 'hpf',
    resave: false,
    saveUninitialized: true
}));

//路由清单
app.use ("/public"                          ,express.static("public"));         //静态资源服务
app.post("/checklogin"                      ,common_router.checklogin);         //Ajax接口，检查登录是否成功
app.get ("/"                                ,common_router.showIndex);          //首页
app.get ("/exit"                            ,common_router.exit);               //退出登陆
app.get ("/admin"                           ,admin_router.showAdmin);           //管理员面板
app.get ("/admin/student"                   ,admin_router.showAdminStudent);    //管理员管理学生面板
app.get ("/admin/student/uploadform"        ,admin_router.showuploadform);      //上传表单
app.post("/admin/student/doexcelpost"       ,admin_router.doexcelpost);         //提交excel表单处理
app.get ("/admin/student/setinitpassword"   ,admin_router.setinitpassword);     //生成学生初始密码
app.get ("/admin/student/exportexcel"       ,admin_router.exportexcel);         //下载excel表单处理
app.post("/admin/student/changepw"          ,admin_router.changepw);            //更改密码
app.get ("/admin/course"                    ,admin_router.showAdminCourse);     //管理员管理课程面板
app.post("/admin/course/add"                ,admin_router.addCourse);           //增加课程
app.get ("/admin/course/all"                ,admin_router.getallcourse);        //Ajax的接口，得到所有课程
app.post("/admin/course/change"             ,admin_router.changecourse);        //Ajax的接口，改变课程
app.post("/admin/course/delete"             ,admin_router.deletecourse);        //Ajax的接口，删除课程
app.get("/admin/course/search"              ,admin_router.search);        		//Ajax的接口，模糊查询
app.get("/student/:xuehao/courses"          ,student_router.getstudentcourses); //Ajax的接口，显示某个学生已经报名的课程编号
app.get("/baoming"                          ,student_router.baoming);           //Ajax的接口，报名！
app.get("/tuiding"                          ,student_router.tuiding);           //Ajax的接口，退订！
app.get("/course/:cid"                      ,student_router.showcourse);        //显示某一个课程报名的人
app.post("/changepw"                        ,student_router.changepw);          //学生修改密码
app.get ("/*"                               ,common_router.show404);            //404页面

//监听
app.listen(3800);