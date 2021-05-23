var express = require('express');
const formidable = require('formidable'); //处理含有文件上传的表单
const path = require('path');
const fs = require('fs');
var router = express.Router();
const tableName = 'pgzy'
const { Success, MError } = require("../utils/Result");
const Db = require("../utils/Db");
const { getUUID } = require("../utils");
const { log } = require('console');
//教师相关操作------------------

//获取搜索相关列表
router.post("/pgzysearch", async (req, res) => {
    let {e} = req['body'];
	console.log(Object.prototype.toString.call(e));
        data = await Db.select(req, `SELECT * FROM ${tableName} WHERE (ncname = '${e}' or username = '${e}')`)
        res.send(Success(data));
});
//获取已交作业总数
router.get("/pgzylistcount",async(req,res)=>{
    const { Cclass } = req['query'];
    let data = await Db.select(req, `SELECT COUNT(*) AS total FROM ${tableName} WHERE Cclass = '${Cclass}'`);
    res.send(Success(data));
});

//获取已交列表
router.get("/pgzylist", async (req, res) => {
    const { size,page,Cclass } = req['query'];
    let data = await Db.select(req, `SELECT * FROM ${tableName} WHERE Cclass = '${Cclass}'
        LIMIT ${(page-1)*size},${size}`);
        console.log(data);
    res.send(Success(data));
});
//获取一条作业信息
router.get("/pgzyone", async (req, res) => {
    const { id } = req['query'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE id = '${id}'`);
       console.log(info);
        res.send(Success(info, '获取成功', tableName));
    }
})
// 移动作业的方法
const moveFile = async (req) => {
	const formObj = new formidable.IncomingForm(); // 新建form对象
	formObj.encoding = 'UTF-8'; // UTF8编码
	formObj.uploadDir = "./tempDir"; // 接收的文件缓存路径
	return new Promise((resolve, reject) => {
		formObj.parse(req, (err, fields, files) => {
			console.group(files)
			if(!files.checkfile){
				resolve({
					body: fields,
					fileName:''
				});
				return;
			}
			let fileObj = files.checkfile;
			let oldPath = fileObj['path'];
			let fileName = getUUID() + path.extname(fileObj['name']);
			let newPath = "public/uploads/" + fileName;
			fs.rename(oldPath, newPath, (err) => { // 7. 挪动
				if (err) {
					console.error(err);
					resolve(false);
				} else {
					resolve({
						body: fields,
						fileName: "/uploads/" + fileName
					});
				}
			});
		});
	})
}


//上传已批改作业
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
//查询是否交作业
router.get("/updatestatus", async (req, res) => {
    const { username,ncname,title } = req['query'];
	console.log("这里",{username,ncname,title});
    if (!username || !ncname ||!title) {
        res.send(MError("缺少必要条件"));
    } else {
        const info = await Db.select(req, `SELECT * FROM ${tableName}
		 WHERE username = '${username}' AND ncname = '${ncname}'
		 AND title = '${title}' `);
		 res.send(Success(info))
    }
})


module.exports = router;