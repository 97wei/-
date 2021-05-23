var express = require('express');
var router = express.Router();
const tableName = 'courseinfo'
const { Success, MError } = require("../utils/Result");
const Db = require("../utils/Db");

//管理员相关操作------------------
//班级列表
//获取课程列表
router.get("/courselist", async (req, res) => {
    const { size,page } = req['query'];
    let data = await Db.select(req, `SELECT * FROM ${tableName}
    LIMIT ${(page-1)*size},${size}`);
    res.send(Success(data));
});

//获取所有课程列表
router.get("/courselistall",async(req,res)=>{
    let data = await Db.select(req, `SELECT * FROM ${tableName}`);
    res.send(Success(data));
});

//获取课程总数
router.get("/coursecount",async(req,res)=>{
    let data = await Db.select(req, `SELECT COUNT(*) AS total FROM ${tableName}`);
    res.send(Success(data));
});

//添加课程
router.post("/courseinfoadd", async (req, res) => {
    let { uid,coursename} = req['body'];
    const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE uid = '${uid}' OR coursename='${coursename}'`);
    if (info) {
        res.send(MError("课程编号或者课程已存在，不能重复！"));
    } else {
        const result = await Db.insert(req, tableName, {
            uid,
            coursename
        });
        if (result) {
            res.send(Success([], "添加成功"));
        } else {
            res.send(MError("添加失败，请查看字段信息是否正确"));
        }
    }
});
//获取一条课程信息
router.get("/getonecourse", async (req, res) => {
    const { id } = req['query'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE id = '${id}'`);
        res.send(Success(info, '获取成功', tableName));
    }

})
//修改课程资料
router.post("/updatecourse", async (req, res) => {
    let { uid,coursename } = req['body'];
    if (!uid || !coursename) {
        res.send(MError("缺少必要条件"));
    } else {
        const result = await Db.update(req, tableName, {  uid,coursename}, ` WHERE uid = ${uid}`);
        result === true ? res.send(Success()) : res.send(MError(result));
    }
});
//删除课程信息
router.post("/coursedelete", async (req, res) => {
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