/*
* @Author: Administrator
* @Date:   2018-03-09 14:45:49
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-10 16:39:29
*/
var superagent=require("superagent");
var cheerio = require('cheerio');
var mysql=require("mysql");

var connection=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"root",
	database:"cj"
})
connection.connect();

// let requestHeaders={
//     'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//     'Accept-Encoding':'gzip, deflate, sdch, br',
//     "Accept-Language":"zh-CN,zh;q=0.8",
//     "Cookie":"__jdv=122270672|direct|-|none|-|1495588591027; user-key=ce736567-166e-495d-8348-2eeac1022616; cn=0; ipLoc-djd=1-72-4137-0; areaId=1; listck=62992aa0a82a511dfaadfb3a8b4b9243; __jda=122270672.14955885910252100297481.1495588591.1495633030.1495673905.7; __jdb=122270672.3.14955885910252100297481|7.1495673905; __jdc=122270672; __jdu=14955885910252100297481; 3AB9D23F7A4B3C9B=UEXL4F6G24RU4P5EUHLLWF7PNPWQCHUDDDCTJ6C5GE2ZAODPYFJYB4MM4R6AHLZNO4GVVP72RAOEI2SG4UYNJ5ZWFM",
//     "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
// }

var url = "https://www.lagou.com/"

superagent.get(url).end(function(err,res){
	// console.log(res);
	if(res==undefined){
		console.log("网络超时")
	}else{
		let $=cheerio.load(res.text);
		// console.log(res.text)
		// console.log($(".img_center_word a").attr("href"))
		// $(".img_center_word a").each((index,data)=>{
		// 	console.log(index,$(data).attr("href"))
		// })
		// console.log($(".note-list").html())
		// $("#content .list").children("li").each(function(index,data){
		// 		console.log($(data).find("h2").text());
		// })
		// $(".c-abstract em").each(function(index,data){
		// 	console.log($(data).text())
		// })
		var obj={
			companyPic:"",
			companyName:"",
			job:"",
			salary:"",
			time:""//日期

		}
		var arr=[]
		$("#jobList").find(".position_list_ul").children("li").each(function(index,data){
			obj.salary=$(data).find(".salary").text();
			obj.job=$(data).find(".position_name").find("a").text();
			obj.time=$(data).find(".position_name").children(".create-time").text();
			obj.companyName=$(data).find(".pli_btm").find(".company_name").children("a").text()
			obj.companyPic=$(data).find(".pli_btm").find(".company-logo").attr("src");
			// console.log(obj)

			var queryString="insert into info (companyName,companyPic,salary,job,time) values ('"+obj.companyName+"','"+obj.companyPic+"','"+obj.salary+"','"+obj.job+"','"+obj.time+"')";
			connection.query(queryString,function(err,results,fileds){
				if(err){
					throw err;
				}
				console.log("ok");
			})
		})



		      //  $("#plist .gl-warp").children("li").each((index,data)=>{
        //     // console.log(index,data);
        //     let product={
        //         title:"",
        //         price:"",
        //         pic:"",
        //         opeType:""
        //     };
        //     product.title=$(data).find(".p-name").find("em").text();
        //     product.pic=$(data).find(".p-img").find("img").attr("src")
        //     if(product.pic==undefined){
        //         //懒加载的固定写法  放在data-lazy-img里面
        //         product.pic=$(data).find(".p-img").find("img").attr("data-lazy-img");
        //     }
        //     // console.log(product)
        //     console.log($(data).find(".p-name").find("em").text());
        // })
	}
})