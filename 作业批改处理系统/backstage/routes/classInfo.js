var express = require('express');
var router = express.Router();
const tableName = 'classinfo'
const { Success, MError } = require("../utils/Result");
const Db = require("../utils/Db");

//管理员相关操作------------------
//班级列表
//获取班级列表
router.get("/classlist", async (req, res) => {
    const { size,page } = req['query'];
    let data = await Db.select(req, `SELECT * FROM ${tableName}
    LIMIT ${(page-1)*size},${size}`);
    res.send(Success(data));
});

//获取所有班级列表
router.get("/classlistall",async(req,res)=>{
    let data = await Db.select(req, `SELECT * FROM ${tableName}`);
    res.send(Success(data));
});

//获取班级总数
router.get("/classcount",async(req,res)=>{
    let data = await Db.select(req, `SELECT COUNT(*) AS total FROM ${tableName}`);
    res.send(Success(data));
});

//添加班级
router.post("/classinfoadd", async (req, res) => {
    let { uid,classname} = req['body'];
    const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE uid = '${uid}' OR classname='${classname}'`);
    if (info) {
        res.send(MError("班级编号或者班级已存在，不能重复！"));
    } else {
        const result = await Db.insert(req, tableName, {
            uid,
            classname
        });
        if (result) {
            res.send(Success([], "添加成功"));
        } else {
            res.send(MError("添加失败，请查看字段信息是否正确"));
        }
    }
});
//获取一条班级信息
router.get("/getoneclass", async (req, res) => {
    const { id } = req['query'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE id = '${id}'`);
        res.send(Success(info, '获取成功', tableName));
    }

})
//修改班级资料
router.post("/updateclass", async (req, res) => {
    let { uid,classname } = req['body'];
    if (!uid || !classname) {
        res.send(MError("缺少必要条件"));
    } else {
        const result = await Db.update(req, tableName, {  uid,classname}, ` WHERE uid = ${uid}`);
        result === true ? res.send(Success()) : res.send(MError(result));
    }
});
//删除班级信息
router.post("/classdelete", async (req, res) => {
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