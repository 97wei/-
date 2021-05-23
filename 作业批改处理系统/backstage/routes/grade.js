var express = require('express');
const formidable = require('formidable'); //处理含有文件上传的表单
const path = require('path');
const fs = require('fs');
var router = express.Router();
const tableName = 'pgzy'
const { Success, MError } = require("../utils/Result");
const Db = require("../utils/Db");
const { getUUID } = require("../utils");
//教师相关操作------------------
//获取已交作业总数
router.get("/pgzylistcount",async(req,res)=>{
    const { Cclass } = req['query'];
    let data = await Db.select(req, `SELECT COUNT(*) AS total FROM ${tableName} WHERE Cclass = '${Cclass}'`);
    res.send(Success(data));
});

//获取批改后的作业列表
router.get("/gradeList", async (req, res) => {
    const { e } = req['query'];
    let data = await Db.select(req, `SELECT * FROM ${tableName} WHERE ncname = '${e}' AND checkfile!='' AND result!=''`);
        console.log(data);
    res.send(Success(data));
});
//获取一条批改作业信息
router.get("/gradeone", async (req, res) => {
    const { id } = req['query'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE id = '${id}'`);
       console.log(info);
        res.send(Success(info, '获取成功', tableName));
    }
})

//下载作业
router.post("/checkresult", async (req, res) => {
	const resultObj = await moveFile(req);
	if (resultObj === false) {
		res.send(MError([], "作业上传失败"));
		return;
	}
	let data = resultObj['body'];
	if(resultObj['fileName']){
		data.checkfile = resultObj['fileName'];
	}
        const results = await Db.update(req, tableName, data, ` WHERE id = ${data.id}`);
        console.log(results);
		if (results) {
			res.send(Success([], "添加成功"));
		} else {
			res.send(MError("添加失败，请查看字段信息是否正确"));
		}
	// }
    
});
//获取搜索相关列表
router.post("/pgzysearch", async (req, res) => {
    let {e} = req['body'];
    console.log(e,Object.prototype.toString.call(e))
        data = await Db.select(req, `SELECT * FROM ${tableName} WHERE (ncname = '${e}' or id = '${e}')`)
        res.send(Success(data));
});
//删除作业
router.post("/delcheck", async (req, res) => {
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