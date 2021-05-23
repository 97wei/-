var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dbObj = require("./utils/Db"); // 数据库对象
var app = express();
app.use(dbObj.connection); // 使用单例模式建立数据库连接， 给express应用对象添加中间件功能
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 1123新增
app.use(express.static("./www"))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

var loginRouter = require('./routes/login');
app.use('/api', loginRouter);//前台、后台用户登录
app.use(express.static(path.join(__dirname, 'public')));

//后台管理相关接口
var userRouter = require('./routes/adminuser');
var classInfo = require('./routes/classInfo');
var courseInfo = require('./routes/courseInfo');
var teacherRouter = require('./routes/teacheruser');
var studentuser = require('./routes/studentuser');
var notice = require('./routes/notice');
var bzzy = require('./routes/bzzy');
var pgzy = require('./routes/pgzy');
var stuCkzy = require('./routes/stuCkzy');
var grade = require('./routes/grade');


app.use('/api', userRouter);
app.use('/api', classInfo);
app.use('/api', courseInfo);
app.use('/api', studentuser);
app.use('/api', teacherRouter);
app.use('/api', notice);
app.use('/api', bzzy);
app.use('/api', pgzy);
app.use('/api', stuCkzy);
app.use('/api', grade);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;