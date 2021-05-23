var express = require('express');
var router = express.Router();
const tableName = 'notice'
const tableNameRole = 'role'
const tableNameMenu = 'menu'
const { Success, MError } = require("../utils/Result");
const Db = require("../utils/Db");
const crypto = require('crypto');
const random = require('string-random');
const { getUUID,getToken,getTree } = require("../utils");

//管理员相关操作------------------

//获取公告列表
router.get("/noticelist", async (req, res) => {
    let data = await Db.select(req, `SELECT * FROM ${tableName}`);
    res.send(Success(data));
});
//添加公告
router.post("/noticeadd", async (req, res) => {
    let { content,title,data } = req['body'];
    if (content==''||title==''||data=='') {
        res.send(MError("请填写完整"));
    } else {
        const result = await Db.insert(req, tableName, {
            content,
            title,
            data,
        });
        if (result) {
            res.send(Success([], "添加成功"));
        } else {
            res.send(MError("添加失败，请查看字段信息是否正确"));
        }
    }
    }),
//获取一条公告信息
router.get("/onenotice", async (req, res) => {
    const { id } = req['query'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE id = '${id}'`);
        res.send(Success(info, '获取成功', tableName));
    }

});
//更新公告信息
router.post("/noticeedit", async (req, res) => {
    let {id, content,title,data} = req['body'];
    console.log(id, content,title,data);
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const result = await Db.update(req, tableName, {  content,title,data }, ` WHERE id = ${id}`);
        result === true ? res.send(Success()) : res.send(MError(result));
    }
});
//删除公告
router.post("/noticedelete", async (req, res) => {
    let { id } = req['body'];
    console.log(id);
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