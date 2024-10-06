

import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import OSS from 'ali-oss'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
require('dotenv').config()

const stat = promisify(fs.stat)
const mkdir = promisify(fs.mkdir)

console.log('process.env.ACCESS_KEY_ID ----', process.env.ACCESS_KEY_ID)

class Oss {
    constructor () {
        this.client = new OSS({
            // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
            region: 'oss-cn-beijing',
            // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
            accessKeyId: process.env.ACCESS_KEY_ID,
            accessKeySecret: process.env.ACCESS_KEY_SECRET,
            // 填写Bucket名称。关于Bucket名称命名规范的更多信息，请参见Bucket。
            bucket: 'zhengjin-oss',
        })
        this.uploadPath = 'tempUpload'
    }

    put = async (dir) => {
        try {
          // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
          // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
          const result = await this.client.put(`upload/${path.basename(dir)}`, dir);
          // const result = await client.put('exampleobject.txt', path.normalize('D:\\localpath\\examplefile.txt'), { headers });   
        //   console.log(result);
          return result
        } catch (e) {
          console.log(e);
        }
    }

    uploadImg = async (ctx) => {
        const file = ctx.request.files.file
        const ext = path.extname(file.filepath)
        const dir = path.join(process.cwd(), `/${this.uploadPath}/${moment().format('YYYYMMDD')}`)
        try {
            await stat(dir)
        } catch (statErr) {
            await mkdir(dir, { recursive: true })
        }
        const imgname = uuidv4()
        const destPath = `${dir}/${imgname}${ext}`
        const reader = fs.createReadStream(file.filepath)
        const writer = fs.createWriteStream(destPath)
        const url = await new Promise((resolve) => {
            reader.on('end', async () => {
                writer.end()
                const res = await this.put(destPath)
                resolve(res.url)
            })
            reader.pipe(writer)
        })
        fs.rmdir(path.join(process.cwd(), this.uploadPath), { recursive: true }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('删除成功')
            }
        })
        ctx.body = {
            code: 200,
            data: { url },
            success: true,
            msg: '上传成功'
        }
    }
}

const headers = {
  // 指定该Object被下载时网页的缓存行为。
  // 'Cache-Control': 'no-cache', 
  // 指定该Object被下载时的名称。
  // 'Content-Disposition': 'oss_download.txt', 
  // 指定该Object被下载时的内容编码格式。
  // 'Content-Encoding': 'UTF-8', 
  // 指定过期时间。
  // 'Expires': 'Wed, 08 Jul 2022 16:57:01 GMT', 
  // 指定Object的存储类型。
  // 'x-oss-storage-class': 'Standard', 
  // 指定Object的访问权限。
  // 'x-oss-object-acl': 'private', 
  // 设置Object的标签，可同时设置多个标签。
  // 'x-oss-tagging': 'Tag1=1&Tag2=2', 
  // 指定CopyObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
  // 'x-oss-forbid-overwrite': 'true', 
};


export default new Oss()