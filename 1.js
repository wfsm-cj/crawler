/*
* @Author: Administrator
* @Date:   2018-03-09 14:16:05
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-09 14:39:03
*/
const superagent = require('superagent');
const cheerio = require('cheerio');

const testUrl = "https://m.lagou.com/";

superagent.get(testUrl).end(function(err,res){
	if(err){
		 throw Error(err);
		console.log(err);
	}
	console.log(res.text);//res.text返回的html
	let $=cheerio.load(res.text);
// 	$('#list-container .note-list li').each(function(i, elem) {
//    // 拿到当前li标签下所有的内容，开始干活了
//    console.log(i,elem);
// });
})