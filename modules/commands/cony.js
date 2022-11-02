module.exports.config = {
	name: "cony",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "HungCatMoi",
	description: "Tỉ lệ có Ny của bạn trong năm nay",
	commandCategory: "tiện ích", 
	usages: "cony", 
	cooldowns: 0,
	dependencies: [] 
};
const fs = require('fs');
module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/`;
    const path = resolve(dirMaterial, 'chucmung.gif');
    if (!existsSync(path)) await downloadFile("https://i.pinimg.com/originals/02/cd/1b/02cd1bb4996b61d50089f7a20a7a724d.gif", path);
    
}
module.exports.run = async function({ api, event, args, Users, Threads, __GLOBAL, Currencies }) {
	var tl = ['21%', '67%', '19%', '37%', '17%', '96%', '52%', '62%', '76%', '83%', '100%', '99%', "0%", "48%",`1%`,`10%`,`99,9%`];
	var tle = tl[Math.floor(Math.random() * tl.length)];
	let data = await api.getUserInfo(event.senderID);
    let name = await data[event.senderID].name
    var msg = {
				body: `Chúc mừng bạn ${name}. Bot đã dự đoán tỉ lệ có người yêu của bạn trong năm nay là ${tle} ❤❤`,
				attachment: fs.createReadStream(__dirname + `/cache/chucmung.gif`)
			}
			api.sendMessage(msg, event.threadID, event.messageID);
		}
