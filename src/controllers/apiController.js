'use strict'
var $sql = require('../sqlMap');

let successState = 0 // 表示成功
let fialState = 1 // 表示失败
// 1.0 7牛云存储域名
let domain = 'http://ofv795nmp.bkt.clouddn.com/'

var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
      console.log(ret);
        res.json(ret);
        // console.log(res);
    }
};

exports.CheckUser = (req, res) => {
    var sql = $sql.user.check;
    // var params = req.body;
    console.log("进来了吗user？");
    // console.log(params);
//  let sql1 = 'SELECT id , username , password  from admin WHERE username='+ commentObj.username +'AND password='+commentObj.password;
      req.on('data',(chunk)=>{
        let commentTxt = chunk.toString();
        const qs=   require('querystring');
        let commentObj = qs.parse(commentTxt);
        console.log(commentObj);
      let sql1 = `SELECT id , username , password  from user WHERE username= '${commentObj.username}'` + ` AND password='${commentObj.password}'`;
      console.log(sql1);
        req.db.driver.execQuery(sql1, function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                jsonWrite(res, result);
            }
        })


  })

   
}



exports.UpdatePwd = (req, res) => {

    // var sql = $sql.user.check;
      req.on('data',(chunk)=>{
        let commentTxt = chunk.toString();
        const qs=   require('querystring');
        let commentObj = qs.parse(commentTxt);
        console.log(commentObj);
      let sql1 = 'update user set password='+commentObj.newpassword +' where username =' + commentObj.uname;
      console.log(sql1);
        req.db.driver.execQuery(sql1, function(err, result) {
            if (err) {
                console.log("进来了吗user1？");
                console.log(err);

            }
            if (result) {
                console.log("进来了吗user2？");
                console.log(result);
                jsonWrite(res, result);
            }
        })


  })

   
}

exports.UpdateUser = (req, res) => {

    // var sql = $sql.user.check;
      req.on('data',(chunk)=>{
        let commentTxt = chunk.toString();
        const qs=   require('querystring');
        let commentObj = qs.parse(commentTxt);
        console.log(commentObj);
        // `SELECT id , username , password  from user WHERE username= '${commentObj.username}'`
      let sql1 = `update user set nickname='${commentObj.nickname}'  , email='${commentObj.email}' , phone='${commentObj.phone}' , weburl='${commentObj.website}' , birthday='${commentObj.birthday}' ,introduction='${commentObj.introduction}'  where username =${commentObj.uname}`;
      console.log(sql1);
        req.db.driver.execQuery(sql1, function(err, result) {
            if (err) {
                console.log("进来了吗user1？");
                console.log(err);

            }
            if (result) {
                console.log("进来了吗user2？");
                console.log(result);
                jsonWrite(res, result);
            }
        })


  })

   
}



exports.RegUser = (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
     console.log("什么贵");
    console.log("进来了吗？");
     req.on('data',(chunk)=>{
        let commentTxt = chunk.toString();
        const qs=   require('querystring');
        let commentObj = qs.parse(commentTxt);
        console.log(commentObj);
        // `SELECT id , username , password  from user WHERE username= '${commentObj.username}'`
      
         req.db.driver.execQuery(sql, [commentObj.username, commentObj.password], function(err, result) {
        if (err) {
            console.log("进来了吗1？");
            console.log(err);

        }
        if (result) {
            console.log("进来了吗2？");
            console.log(result);
            jsonWrite(res, result);
        }
    })


  })

   
}


exports.CheckAdmin = (req, res) => {
    var sql = $sql.admin.check;
    var params = req.body;
    console.log("进来了吗？");
    console.log(params);
    req.db.driver.execQuery(sql, [params.username, params.password], function(err, result) {
        if (err) {
            console.log("进来了吗1？");
            console.log(err);

        }
        if (result) {
            console.log("进来了吗2？");
            console.log(result);
            jsonWrite(res, result);
        }
    })
}


exports.getlunbo= (req, res) => {

 let resObj = {status: successState, message: [{
            url: 'https://images.weserv.nl/?url=pic3.zhimg.com/v2-80f3f4d68f3bac5ad3ede35d907c6322.jpg',
            img: 'https://images.weserv.nl/?url=pic3.zhimg.com/v2-80f3f4d68f3bac5ad3ede35d907c6322.jpg',
            msg:'新海诚你出来，原来泷与三叶在山顶待了不止 3 分钟'
          }, {
            url: 'https://images.weserv.nl/?url=pic2.zhimg.com/v2-12bc4f4f4dc4ce18e83451dbafc1c311.jpg',
            img: 'https://images.weserv.nl/?url=pic2.zhimg.com/v2-12bc4f4f4dc4ce18e83451dbafc1c311.jpg',
            msg:'对户外的认知偏差， 让这里成了国内死伤率最高的徒步线路'
          }]}

     res.end(JSON.stringify(resObj))

}

exports.addclick = (req, res) => {
   console.log("来了？");
 console.log("来了？"); console.log("来了？"); console.log("来了？"); console.log("来了？");
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}

  //  // 1.0 获取参数值
  let newid = req.params.newid

   // 2.0 执行查询操作
  
  let sql = 'update dt_article set click=click+1 where id =' + newid;
  req.db.driver.execQuery(sql, (err, data) => {
   // 3.0 判断是否异常
      if (err)    {
         resObj.status = fialState
         resObj.message = err.message
         res.end(JSON.stringify(resObj))
         return
      }

    // 4.0 获取数据成功
      resObj.message = "成功增加"
      res.end(JSON.stringify(resObj))
  })
}

// 1.0 获取图片新闻资讯列表
exports.getnewslist = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}

   // 3.0 利用orm发送sql语句查询出来分页数据即可
   /*
   id : 资讯主键
   ,title : 资讯标题
   ,add_time ：资讯创建的事件
   ,zhaiyao：摘要
   ,click：点击量
   ,img_url:图片地址，前缀是7牛云存储域名
    */
  let sql = " SELECT id,title,add_time,left(zhaiyao,25) as zhaiyao,click,concat('" + domain + "',img_url) as img_url FROM dt_article where img_url > '' and channel_id = 6 limit 0,10 "
  console.log('获取图文资讯sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
      // 4.0 判断是否异常
      if (err)    {
         resObj.status = fialState
         resObj.message = err.message
         res.end(JSON.stringify(resObj))
         return
      }

      // 5.0 获取数据成功
      resObj.message = datas
      res.end(JSON.stringify(resObj))
  })
}

// 2.0 根据资讯id获取资讯详细内容
exports.getnew = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}

   // 1.0 获取参数值
  let newid = req.params.newid

   // 2.0 执行查询操作
  let sql = 'select id,title,click,add_time,content from dt_article  where id=' + newid
  console.log('获取资讯明细sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
   // 3.0 判断是否异常
      if (err)    {
         resObj.status = fialState
         resObj.message = err.message
         res.end(JSON.stringify(resObj))
         return
      }

    // 4.0 获取数据成功
      resObj.message = data
      res.end(JSON.stringify(resObj))
  })
}

// 3.0 商品
exports.getgoods = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}
  let pageindex = req.query.pageindex
  if(!pageindex){
    pageindex =1;
  }
  let pagesize = 10
  let skipcount = (pageindex - 1) * pagesize

   // 3.0 利用orm发送sql语句查询出来分页数据即可
   /*
   id : 资讯主键
   ,title : 资讯标题
   ,add_time ：资讯创建的事件
   ,zhaiyao：摘要
   ,click：点击量
   ,img_url:图片地址，前缀是7牛云存储域名
    */
  let sql = `SELECT a.id,a.title,a.add_time,left(a.zhaiyao,25) as zhaiyao,a.click,concat('${domain}',a.img_url) as img_url,b.sell_price,b.market_price,b.stock_quantity FROM dt_article as a,dt_article_attribute_value b where a.id = b.article_id and a.channel_id = 7 limit ${skipcount},${pagesize} `
  console.log('获取图文资讯sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
      // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

      // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}

/*
3.0.1 获取商品详情页面数据
-- 获取商品详情页标题，图文介绍信息等
SELECT * FROM dt_article da WHERE da.channel_id = 7 AND da.title LIKE '%新科%';
-- 获取商品详情页中的滚动图片
select * FROM dt_article_albums daa WHERE daa.article_id = 101;

-- 获取商品参数区域信息
SELECT daav.goods_no,daav.stock_quantity FROM dt_article_attribute_value daav  WHERE daav.article_id =101;

-- 商品品论
select * from dt_article_comment dac WHERE dac.article_id=101
 */

// 商品图文描述
exports.getgooddesc = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}
 
 let id = req.params.id;
  let sql = ` SELECT title,content FROM dt_article da WHERE da.id = ${id} `
  console.log(	'获取商品图文描述sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
      // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

      // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}

// 获取商品标题，价格，参数区数据
// getgoodsinfo
exports.getgoodsinfo = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}
 
 let id = req.params.id;
  let sql = ` SELECT da.id,da.title,da.add_time,daa.goods_no,daa.stock_quantity,daa.market_price,daa.sell_price FROM dt_article da , dt_article_attribute_value daa 
				WHERE  da.id = daa.article_id and da.id = ${id} `
  console.log(	'获取商品获取商品标题，价格，参数区数据sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
      // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

      // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}

//获取购物车列表数据
exports.getshopcarlist = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}

   // 1.0 获取参数值
  let ids = req.params.ids
 
   // 2.0 执行查询操作
  let sql = `
  			  SELECT count(distinct tb1.id) as cou, tb1.* FROM (
				SELECT  da.id,da.title,daa.sell_price,alb.thumb_path
				  FROM dt_article da 
				  LEFT JOIN dt_article_attribute_value daa ON (da.id = daa.article_id)
				  LEFT JOIN dt_article_albums alb ON (da.id = alb.article_id)
				WHERE  da.id IN(${ids}) ) AS tb1 GROUP BY tb1.id
  `

  console.log('获取购物车列表sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
   // 3.0 判断是否异常
      if (err)    {
         resObj.status = fialState
         resObj.message = err.message
         res.end(JSON.stringify(resObj))
         return
      }

    // 4.0 获取数据成功
      resObj.message = data
      res.end(JSON.stringify(resObj))
  })
}


// 4.0 图片分享
exports.getimages = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}

  let cateid = req.params.cateid - 0
  console.log(req.params);

  let sql = ' select id,title,img_url,zhaiyao from dt_article where channel_id = 9 and category_id=' + cateid

  if (cateid <= 0) {
    sql = ' select * from dt_article where channel_id = 9 '
  }

   // 3.0 利用orm发送sql语句查询出来分页数据即可
   /*

    */

  console.log('获取图片分享sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
      // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

      // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}


// 4.0.1 根据id获取图片详细内容
exports.getimage = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}

   // 1.0 获取参数值
  let newid = req.params.imgid

   // 2.0 执行查询操作
  let sql = `select thumb_path as src  from dt_article_albums where article_id =${newid}`

  console.log('获取图片分享明细中缩略图sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
   // 3.0 判断是否异常
      if (err)    {
         resObj.status = fialState
         resObj.message = err.message
         res.end(JSON.stringify(resObj))
         return
      }

    // 4.0 获取数据成功
      resObj.message = data
      res.end(JSON.stringify(resObj))
  })
}


// 4.0.1 根据id获取图片详细内容
exports.getimageInfo = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}

   // 1.0 获取参数值
  let newid = req.params.imgid

   // 2.0 执行查询操作
  let sql = `select id,title,click,add_time,content from dt_article where id=${newid}`

  console.log('获取图片分享明细sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
   // 3.0 判断是否异常
      if (err)    {
         resObj.status = fialState
         resObj.message = err.message
         res.end(JSON.stringify(resObj))
         return
      }

    // 4.0 获取数据成功
      resObj.message = data
      res.end(JSON.stringify(resObj))
  })
}

// 5.0 获取图片分享分类
exports.getimgcategory = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}

   // 3.0 利用orm发送sql语句查询出来分页数据即可
   /*

    */
  let sql = ' select title,id from dtcmsdb4.dt_article_category where channel_id = 9 '
  console.log('获取图片分享分类sql语句：============>', sql)
  req.db.driver.execQuery(sql, (err, datas) => {
      // 4.0 判断是否异常
    if (err) {
      resObj.status = fialState
      resObj.message = err.message
      res.end(JSON.stringify(resObj))
      return
    }

      // 5.0 获取数据成功
    resObj.message = datas
    res.end(JSON.stringify(resObj))
  })
}

//6.0 获取评论信息
exports.getcomments = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}

   // 1.0 获取参数值
  let artid = req.params.artid
  let pageindex = req.query.pageindex
  let pagesize = 10;
  let skipCount = (pageindex - 1) * pagesize

   // 2.0 执行查询操作
  let sql = `select user_name,add_time,content from dt_article_comment where article_id = ${artid} order by add_time desc limit ${skipCount},${pagesize}`

  console.log('获取评论sql===>', sql)
  req.db.driver.execQuery(sql, (err, data) => {
   // 3.0 判断是否异常
      if (err)    {
         resObj.status = fialState
         resObj.message = err.message
         res.end(JSON.stringify(resObj))
         return
      }

    // 4.0 获取数据成功
      resObj.message = data
      res.end(JSON.stringify(resObj))
  })
}


//7.0 提交评论数据
exports.postcomment = (req, res) => {
   // 代表返回的数据结构
  let resObj = {status: successState, message: ''}

   // 1.0 获取参数值
  let artid = req.params.artid
  //获取评论内容
  req.on('data',(chunk)=>{
    let commentTxt = chunk.toString();
    const qs=   require('querystring');
    let commentObj = qs.parse(commentTxt);


       // 2.0 执行查询操作
      let sql = `insert into  dt_article_comment(channel_id,article_id,parent_id,user_id,user_name,user_ip,
                                content,is_lock,add_time,is_reply,reply_content,reply_time)
                  values (7,${artid},0,0,'${commentObj.uname}','127.0.0.1','${commentObj.content}',0,NOW(),0,'',NOW())`

      console.log('post提交评论sql===>', sql)
      req.db.driver.execQuery(sql, (err, data) => {
       // 3.0 判断是否异常
          if (err)    {
             resObj.status = fialState
             resObj.message = err.message
             res.end(JSON.stringify(resObj))
             return
          }

        // 4.0 获取数据成功
          resObj.message = '评论提交成功'
          res.end(JSON.stringify(resObj))
      })


  })
}


