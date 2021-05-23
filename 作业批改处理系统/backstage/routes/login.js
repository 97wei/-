var express = require('express');
var router = express.Router();
// const tableName = 'user'
const tableNameRole = 'role'
const tableNameMenu = 'menu'
const { Success, MError } = require("../utils/Result");
const Db = require("../utils/Db");
const crypto = require('crypto');
const random = require('string-random');
const { getToken,getTree } = require("../utils");
//管理员用户登录
router.post("/adminlogin", async (req, res) => { // 登录接口
    console.log(req['body'])
    let { username,password } = req['body'];

    if(!username || !password){
        res.send(MError("请填写用户名和密码"));
        return;
    }
    const result = await Db.select(req, `SELECT * FROM adminuser WHERE  username = '${username}'`)
    if(result === null){
        res.send(MError("用户信息不存在"));
        return;
    }
    const info = result[0];
    if(password !== info.password){
        res.send(MError("用户名密码错误"));
        return;
    }
    res.send(Success(info, '登录成功'));
});
//教师用户登录
router.post("/teacherlogin", async (req, res) => { // 登录接口
    console.log(req['body'])
    let { username,password } = req['body'];

    if(!username || !password){
        res.send(MError("请填写用户名和密码"));
        return;
    }
    const result = await Db.select(req, `SELECT * FROM teacheruser WHERE  username = '${username}'`)
    if(result === null){
        res.send(MError("用户信息不存在"));
        return;
    }
    const info = result[0];
    if(password !== info.password){
        res.send(MError("用户名密码错误"));
        return;
    }
    res.send(Success(info, '登录成功'));
});
//学生登录
router.post("/studentlogin", async (req, res) => { // 登录接口
    console.log(req['body'])
    let { username,password } = req['body'];

    if(!username || !password){
        res.send(MError("请填写用户名和密码"));
        return;
    }
    const result = await Db.select(req, `SELECT * FROM studentuser WHERE  username = '${username}'`)
    if(result === null){
        res.send(MError("用户信息不存在"));
        return;
    }
    const info = result[0];
    if(password !== info.password){
        res.send(MError("用户名密码错误"));
        return;
    }
    res.send(Success(info, '登录成功'));
});
module.exports = router;