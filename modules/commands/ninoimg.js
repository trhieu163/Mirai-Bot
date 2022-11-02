module.exports.config = {
	name: "ninoimg",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "VĐT&NTH với sự Sp của DũngUwU",
	description: "Random ảnh Cosplay có phí",
	commandCategory: "Hình ảnh",
	usages: "nino nakano",
	cooldowns: 3
};

module.exports.run = async ({ api, event, Currencies }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	var money = (await Currencies.getData(event.senderID)).money
	if (money >= 100) {
		axios.get('https://api-botchat.xyz/nino.php').then(res => {
		var callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + '/cache/cosplay.jpg')
					}, event.threadID, () => fs.unlinkSync(__dirname + '/cache/cosplay.jpg'), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + '/cache/cosplay.jpg')).on("close", callback).then(Currencies.setData(event.senderID, options = {money: money - 100}));
			})
	} else return api.sendMessage("Bạn cần 100 đô để xem ảnh ?",event.threadID,event.messageID);
}
