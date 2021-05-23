var express = require('express');
var router = express.Router();
const tableName = 'studentuser'
const { Success, MError } = require("../utils/Result");
const Db = require("../utils/Db");


//学生相关操作------------------
router.post("/studentxgmm", async (req, res) => {
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
//获取学生总数
router.get("/studentcount",async(req,res)=>{
    let data = await Db.select(req, `SELECT COUNT(*) AS total FROM ${tableName}`);
    res.send(Success(data));
});

//获取学生列表
router.get("/studentlist", async (req, res) => {
    const { size,page } = req['query'];
    let data = await Db.select(req, `SELECT * FROM ${tableName}
        LIMIT ${(page-1)*size},${size}`);
    res.send(Success(data));
});
//添加学生
router.post("/studentadd", async (req, res) => {
    let { username,password,ncname,Cclass,roleid} = req['body'];
    console.log( username,password,ncname,Cclass);
    const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE username = '${username}'`);
    if (info) {
        res.send(MError("用户名已存在，不能重复！"));
    } else {
        const result = await Db.insert(req, tableName, {
            username,
            password,
            ncname,
            Cclass,
            roleid
        });
        if (result) {
            res.send(Success([], "添加成功"));
        } else {
            res.send(MError("添加失败，请查看字段信息是否正确"));
        }
    }
});
//获取一条学生信息
router.get("/onestudentInfo", async (req, res) => {
    const { id } = req['query'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE id = '${id}'`);
       console.log(info);
        res.send(Success(info, '获取成功', tableName));
    }

})
//更新学生信息
router.post("/updatestudent", async (req, res) => {
    let { id, username,password,ncname,Cclass} = req['body'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const result = await Db.update(req, tableName, {   username,password,ncname,Cclass,id }, ` WHERE id = ${id}`);
        result === true ? res.send(Success()) : res.send(MError(result));
    }
});
//删除学生
router.post("/studentdelete", async (req, res) => {
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