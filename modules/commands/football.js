module.exports.config = {
	name: "football",
	version: "2.0.19",
	hasPermssion: 0,
	credits: "UriE",
	description: "Chơi Đá Bóng Trên Điện Thoại Của Bạn",
	commandCategory: "game",
	usages: "Prefix [Football]",
	cooldowns: 5,
	envConfig: {}};
	module.exports.languages = {
	  "vi" : {
	    "filming" : "=>Đang Quay....<="
	  }
	}
module.exports.run = async ({event,api,handleReply,Currencies,getText
}) => {
	const fs = require("fs-extra");
	const axios = require("axios");
	return api.sendMessage({
		body: `UF GAME SPORTS🏆\n\n(1/-m) [ Market ]\n(2/-gP) [ Game Play ]\n(3/-vM) [ Ví MFG]\n(4/-Ex) [ Extras ]`,
	}, event.threadID, (error, info) => {
		global.client.handleReply.push({
			type: "choosee",
			name: this.config.name,
			author: event.senderID,
			messageID: info.messageID
		})
	})
}
module.exports.handleReply = async function({args,event,Users,api,handleReply,getText,Currencies}) {
	const {threadID,messageID,senderID} = event;
	const axios = require("axios")
	const fs = require('fs-extra');
	const request = require('request');
	const data = (await Currencies.getData(senderID)).data;
	const money = (await Currencies.getData(senderID)).money;
	var msg = "";
	//VAR FUNCTION
	/////////////////////////
	//lớn nhất là 100000Coins nhỏ nhất là 100Coins 
	const coinMrandom = Math.floor(Math.random() * 100000) + 100;
	///////////
	switch (handleReply.type) {
		case "choosee": {
			switch (event.body) {
				case "1":
				case "-m": {
					msg = `(1/-goiRandomCoins) [ GÓI RANDOM Coins ]\nSố tiền bỏ ra để thực hiện giao dịch là [ 1005Coins ] có cơ hội nhận được phần thưởng [ 100000Coins ]`;
					return api.sendMessage({
						body: msg
					}, threadID, (error, info) => {
						global.client.handleReply.push({
							type: "Market",
							name: this.config.name,
							author: senderID,
							messageID: info.messageID
						})
					}, messageID)
				}
				break;
			case "2":
			case "-gP": {
				msg = `(1/-rT) [ Rotation ]\n(2/-tN) [ Tournament ]`;
				return api.sendMessage({
					body: msg
				}, threadID, (error, info) => {
					global.client.handleReply.push({
						type: "GamePlay",
						name: this.config.name,
						author: senderID,
						messageID: info.messageID
					})
				}, messageID)
			}
			break;
			case "3":
			case "-vM": {
			  const fCoin = (await axios.get(`https://i.imgur.com/5OoncD6.jpg`, {
		responseType: "stream"
	})).data;
				msg = `🏦            Ví MFG          🏦\n(1/-xC) [ Xem số tiền của bạn còn dư(fCoin) ]`;
				return api.sendMessage({
					body: msg, attachment: (fCoin)
				}, threadID, (error, info) => {
					global.client.handleReply.push({
						type: "vMFG",
						name: this.config.name,
						author: senderID,
						messageID: info.messageID
					})
				}, messageID)}
			break;
			case "4":
			case "-Ex": {
				msg = `(1/-Se) [ Setting ] \n(2/-heG) [ Help Game ]`;
				return api.sendMessage({
					body: msg
				}, threadID, (error, info) => {
					global.client.handleReply.push({
						type: "Extras",
						name: this.config.name,
						author: senderID,
						messageID: info.messageID
					})
				}, messageID)}}}}
	switch (handleReply.type) {
		case "Market": {
			switch (event.body) {
				case "1":
				case "-goiRandomCoins": {
					msg = `Giao dịch thành công tài khoản của bạn bị -[ 1005Coins ]\nBạn mở random được [ ${coinMrandom}Coins ]`;
					await Currencies.decreaseMoney(senderID, 1005);
					await
					Currencies.increaseMoney(senderID, parseInt(coinMrandom));
					return api.sendMessage({
						body: msg
					}, threadID, messageID)}}}break;
		case "vMFG": {
			switch (event.body) {
				case "1":
				case "-xC": {
					msg = `Số fCoin của bạn là: [ ${money}fCoin ]`;
					return api.sendMessage({
						body: msg
					}, threadID, messageID)}}}break;
		case "GamePlay": {
			switch (event.body) {
				case "1": {
					msg = `(1/-RotaPl) [ Vòng Quay Cầu Thủ ]`;
					return api.sendMessage({
						body: msg
					}, threadID, (error, info) => {
						global.client.handleReply.push({
							type: "Gameplay-Rotation",
							name: this.config.name,
							author: senderID,
							messageID: info.messageID
						})}, messageID)}break;
			  case "2":
			    case "-tN": {
			      msg = `(1/-uCup) [ UF Cup ]`;
					return api.sendMessage({
						body: msg
					}, threadID, (error, info) => {
						global.client.handleReply.push({
							type: "Gameplay-Tournament",
							name: this.config.name,
							author: senderID,
							messageID: info.messageID
						})},messageID)}}}break;
						case "Gameplay-Rotation": {
			switch (event.body) {
				case "1": {
const reply = function (reply){
  return api.sendMessage(reply, threadID,messageID)
};

					var char = ["Neymar","Adama Traoré", "Luka Modrić","Sadio Mané","Lionel Messi"];
					var random = Math.floor(Math.random() * char.length);
					if (char[random] == "Neymar") {
						var link = "https://i.imgur.com/9URT3Rh.jpg"
					} else if (char[random] == "Adama Traoré") {
					  var link = "https://i.imgur.com/UMMTDSh.jpg"
					} else if (char[random]== "Luka Modrić") {
				 var link = "https://i.ibb.co/SNLWt60/f6y3mmc.jpg"
					}else if (char[random] == "Sadio Mané") {
					 var link = "https://i.ibb.co/2752wYH/CWYsA6x.jpg"
					} else if (char[random]== "Lionel Messi") {
					 var link = "https://i.ibb.co/mrWxWTG/kvLqdIU.jpg"
					}
					const img = (await axios.get(link, {
						responseType: "stream"
					})).data;
					//
					reply(`Bạn Mất [ 5000000Coins] Khi Quay`);
					//quay
      reply(getText("filming"));
      setTimeout(() => {reply({body: `(Result) [ Bạn Quay Được Cầu Thủ ] ->  ${char[random]}`,attachment: img})}, 3000);
      await Currencies.decreaseMoney(senderID, 5000000)}}}break;
      case "Extras": {
			switch (event.body) {
				case "1":
				 case "-Se" : {
				   if (this.config.hasPermssion == "0"){
				     msg = "Người Dùng"
				   } else if(this.config.hasPermssion== "1") {
				     msg = "Quản Trị Viên Box"
				   } else if(this.config.hasPermssion == "2") {
				     msg = "Quản Trị Viên Bot"
				   }
				  return api.sendMessage({body:`📢 Tên Lệnh: ${this.config.name}\n📤 Phiên Bản: ${this.config.version}\n📵 Quyền Sử Dụng: ${msg}\n👤 Sáng Tạo: ${this.config.credits}\n🗒️ Mô tả: ${this.config.description}\n➡️ Cách Dùng: ${this.config.usages}\n⌛ Thời Gian Chờ: ${this.config.cooldowns}S`},threadID,messageID)
				 }}}}
	}
