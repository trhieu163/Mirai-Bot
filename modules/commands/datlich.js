const fs = require("fs");
const moment = require('moment-timezone');
const { resolve } = require("path");
module.exports.config = {
	name: "datlich", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.0.0", // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "DungUwU", // Công nhận module sở hữu là ai
	description: "", // Thông tin chi tiết về lệnh
	commandCategory: "tiện ích", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "[text]/[time]", // Cách sử dụng lệnh
	cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
	dependencies: {
	}, //Liệt kê các package module ở ngoài tại đây để khi load lệnh nó sẽ tự động cài
    cooldowns: 5
};

const checkTime = (time) => new Promise((resolve) => {
	time.forEach((e,i) => time[i] = parseInt(e));
	const getDayFromMonth = (month) => (month == 0) ? 0 : (month == 2) ? (time[2] % 4 == 0) ? 29 : 28 : ([1,3,5,7,8,10,12].includes(month)) ? 31 : 30;
	if (time[1] > 12 || time[1] < 1) return "thang"
	if (time[0] > getDayFromMonth(time[1]) || time[0] < 1) return "ngay"
	if (time[2] < 2022) return "nam"
	if (time[3] > 23 || time[3] < 0) return "gio"
	if (time[4] > 59 || time[3] < 0) return "phut"
	if (time[5] > 59 || time[3] < 0) return "giay"
	yr = time[2] - 1970;
	yearToMS = (yr) * 365 * 24 * 60 * 60 * 1000;
	yearToMS += ((yr - 2) / 4).toFixed(0) * 24 * 60 * 60 * 1000;
	monthToMS = getDayFromMonth(time[1]-=1) * 24 * 60 * 60 * 1000;
	dayToMS = time[0] * 24 * 60 * 60 * 1000;
	hourToMS = time[3] * 60 * 60 * 1000;
	minuteToMS = time[4] * 60 * 1000;
	secondToMS = time[5] * 1000;
	oneDayToMS = 24 * 60 * 60 * 1000;
	timeMs = yearToMS + monthToMS + dayToMS + hourToMS + minuteToMS + secondToMS - oneDayToMS;
	resolve(timeMs);
});

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID: ID } = event;
	let obj = {};
	let path = __dirname + '/data/datlich.json';
	if(!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify(obj, null, 4));
	let data = JSON.parse(fs.readFileSync(path));
	args = args.join(" ").split("|");
	if(!args[0]) return api.sendMessage("Bạn phải nhập lý do đặt lịch", threadID, messageID);
	if(!args[1]) return api.sendMessage("Bạn phải nhập thời gian đặt lịch", threadID, messageID);
	var date = args[1].split("_");
	if(date[0].split("/").length != 3 || date[1].split(":").length != 3) return api.sendMessage("Bạn phải nhập đúng định dạng NGÀY/THÁNG/NĂM_GIỜ:PHÚT:GIÂY", threadID, messageID);
	var timeInput = [...date[0].split("/"), ...date[1].split(":")];
	timeInput.forEach((e,i) => timeInput[i] = parseInt(e));
	var timeVN = moment().tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY_HH:mm:ss');
	timeVN = timeVN.split("_");
	timeVN = [...timeVN[0].split("/"), ...timeVN[1].split(":")];
	var a = await checkTime(timeInput);
	var b = await checkTime(timeVN);
	if(isNaN(a)) return api.sendMessage("Bạn phải nhập đúng thời gian!", threadID, messageID);
	if(a <= b) return api.sendMessage("Bạn không thể đặt lịch trước thời gian hiện tại!", threadID, messageID);
	if(!(threadID in data)) {
		data[threadID] = {
			[ID]: {}
		};
		fs.writeFileSync(path, JSON.stringify(data, null, 4));
	}
	if(!(ID in data[threadID])) {
		data[threadID][ID] = {}
		fs.writeFileSync(path, JSON.stringify(data, null, 4));
	}
	var reply = []
	let uwu = {}
	if(event.type == "message_reply") {
		for(let e of event.messageReply.attachments) {
			switch(e.type) {
				case 'photo':
					uwu.img = e.url
					reply.push(uwu);
					break;
				case 'video':
					uwu.video = e.url
					reply.push(uwu);
					break;
				case 'audio':
					uwu.audio = e.url
					reply.push(uwu);
					break;
				case 'file':
					uwu.file = e.url
					reply.push(uwu);
					break;
				case 'sticker':
					uwu.sticker = e.url
					reply.push(uwu);
					break;
				case 'gif':
					uwu.gif = e.url
					reply.push(uwu);
					break;
			}
		}
	}
	args.forEach((e,i) => args[i] = e.trim())
	owo = timeInput.join("_");
	if(!args[2] && event.type != "message_reply") {
		data[threadID][ID] = {RESON: args[0], TIME: owo};
		fs.writeFileSync(path, JSON.stringify(data, null, 4));
		return api.sendMessage(`Đã đặt lịch thành công!\nLý do: ${args[0]}\nThời gian: ${date}`, threadID, messageID);
	} else if (args[2] && event.type != "message_reply") {
		data[threadID][ID] = {RESON: args[0], TIME: owo, BOX: args[2]};
		fs.writeFileSync(path, JSON.stringify(data, null, 4));
		return api.sendMessage(`Đã đặt lịch thành công!\nLý do: ${args[0]}\nThời gian: ${date}\nĐổi tên thành: ${args[2]}`, threadID, messageID);
	} else if (args[2] && event.type == "message_reply") {
		data[threadID][ID] = {RESON: args[0], TIME: owo, BOX: args[2], ATTACHMENT: reply};
		fs.writeFileSync(path, JSON.stringify(data, null, 4));
		return api.sendMessage(`Đã đặt lịch thành công!\nLý do: ${args[0]}\nThời gian: ${date}\nĐổi tên thành: ${args[2]}`, threadID, messageID);
	} else {
		data[threadID][ID] = {RESON: args[0], TIME: owo, ATTACHMENT: reply};
		fs.writeFileSync(path, JSON.stringify(data, null, 4));
		return api.sendMessage(`Đã đặt lịch thành công!\nLý do: ${args[0]}\nThời gian: ${date}`, threadID, messageID);
	}
}