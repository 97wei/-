var express = require('express');
const formidable = require('formidable'); //处理含有文件上传的表单
const path = require('path');
const fs = require('fs');
var multipart = require('connect-multiparty');
var router = express.Router();
const tableName = 'bzzy'
const tableNameCate = 'category'
const { Success, MError } = require("../utils/Result");
const Db = require("../utils/Db");
const { getTree,getUUID } = require("../utils");

//作业列表
router.get("/ckzylist", async (req, res) => {
    const {Cclass} = req['query'];
    let data = await Db.select(req, `SELECT * FROM ${tableName} WHERE Cclass = '${Cclass}'`);
    res.send(Success(data));
});


//获取一条
router.get("/workinfo", async (req, res) => {
    const {id} = req['query'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const info = await Db.select(req, `SELECT * FROM ${tableName} WHERE id = '${id}'`);
        res.send(Success(info, '获取成功', tableName));
    }

})
//删除作业
router.post("/delwork", async (req, res) => {
    let { id } = req['body'];
    if (!id) {
        res.send(MError("缺少必要条件"));
    } else {
        const result = await Db.delete(req, `DELETE FROM ${tableName} WHERE id = '${id}'`);
        if(result === true){
            data = await Db.select(req, `SELECT * FROM ${tableName}`);
            res.send(Success(getTree(data)))
        }else{
            res.send(MError());
        }
    }
});
// 移动作业的方法
const moveFile = async (req) => {
	const formObj = new formidable.IncomingForm(); // 新建form对象
	formObj.encoding = 'UTF-8'; // UTF8编码
	formObj.uploadDir = "./tempDir"; // 接收的文件缓存路径
	return new Promise((resolve, reject) => {
		formObj.parse(req, (err, fields, files) => {
			if(!files.file){
				resolve({
					body: fields,
					fileName:''
				});
				return;
			}
			let fileObj = files.file;
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


//提交作业
router.post("/tjzyAdd", async (req, res) => {
	const resultObj = await moveFile(req);
	console.group(resultObj);
	if (resultObj === false) {
		res.send(MError([], "作业上传失败"));
		return;
	}
	let data = resultObj['body'];
	if(resultObj['fileName']){
		data.file = resultObj['fileName'];
	}
		const result = await Db.insert(req, 'pgzy', data);
		if (result) {
			res.send(Success([], "添加成功"));
		} else {
			res.send(MError("添加失败，请查看字段信息是否正确"));
		}
	// }
    
});
module.exports = router;