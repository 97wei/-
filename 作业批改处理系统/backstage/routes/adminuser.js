var express = require('express');
var router = express.Router();
const tableName = 'adminuser'
const tableNameRole = 'role'
const tableNameMenu = 'menu'
const { Success, MError } = require("../utils/Result");
const Db = require("../utils/Db");
const crypto = require('crypto');
const random = require('string-random');
const { getUUID,getToken,getTree } = require("../utils");

//管理员相关操作------------------
//修改管理员密码
router.post("/adminxgmm", async (req, res) => {
    let { username,password,newpassword } = req['body'];
    if (!password || !newpassword) {
        res.send(MError("请输入完整"));
    } else {
        const result1 = await Db.select(req, `SELECT * FROM ${tableName} WHERE  username = '${username}'`)
        const oldInfo = result1[0];
        if(password !== oldInfo.password){
            res.send(MError("用户名密码错误"));
            return;
        }
        password=newpassword
        let newInfo = { username,password };
        const result = await Db.update(req, tableName, newInfo, ` WHERE username = '${username}'`);
        console.log(result);
        result === true ? res.send(Success()) : res.send(MError(result));
    }
});
//管理员列表
router.get("/userlist", async (req, res) => {
    let data = await Db.select(req, `SELECT * FROM ${tableName}`);
    res.send(Success(data));
});
//添加管理员
router.post("/adminUseradd", async (req, res) => {
    let { username,password,ncname,roleid} = req['body'];
    const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE username = '${username}'`);
    if (info) {
        res.send(MError("用户名已存在，不能重复！"));
    } else {
        const result = await Db.insert(req, tableName, {
            username,
            password,
            ncname,
            roleid
        });
        if (result) {
            res.send(Success([], "添加成功"));
        } else {
            res.send(MError("添加失败，请查看字段信息是否正确"));
        }
    }
});
//获取一条管理员信息
router.get("/userinfo", async (req, res) => {
    const { id } = req['query'];
    console.log(id);
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE id = '${id}'`);
        res.send(Success(info, '获取成功', tableName));
    }

})
//修改管理员资料
router.post("/useredit", async (req, res) => {
    let { id,username,password,ncname } = req['body'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const result = await Db.update(req, tableName, {  id,username,password,ncname }, ` WHERE id = ${id}`);
        result === true ? res.send(Success()) : res.send(MError(result));
    }
});
//删除管理员
router.post("/userdelete", async (req, res) => {
    let { id } = req['body'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const result = await Db.delete(req, `DELETE FROM ${tableName} WHERE id = '${id}'`);
        if(result === true){
            data = await Db.select(req, `SELECT * FROM ${tableName}`);
            res.send(Success(data))
        }else{
            res.send(MError());
        }
    }
});
module.exports = router;