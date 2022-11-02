module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.4",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm",
	dependencies: {
		"fs-extra": ""
	}
};

module.exports.onLoad = async() => {
    const { resolve, join } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    mkdirSync(__dirname + "/cache/joinGif", { recursive: true })
    const { downloadFile } = global.utils;
    const path = join(__dirname, "cache", "joinGif");
    const pathGif = join(path, 'join.gif');
    const pathPng = join(path, 'join.png');
    if (!existsSync(pathGif)) await downloadFile("https://i.imgur.com/bvLe7or.gif", pathGif);
    if (!existsSync(pathPng)) await downloadFile("https://i.imgur.com/5dILqdq.jpg", pathPng);
    
}


module.exports.run = async function({ api, event, Users }) {
	const { join } = global.nodemodule["path"];
	const fs = global.nodemodule["fs-extra"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Rin Cute" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		return api.sendMessage({body: `Đã kết nốt thành công với boxchat\n Cảm ơn các bạn đã sử dụng Hệ thống BotChat Messenger của mình \n Dưới đây là một vài chú ý nhỏ trước khi sử dụng:`, attachment: fs.createReadStream(__dirname + '/cache/joinGif/join.png')}, threadID);
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `join.mp4`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);

				if (!global.data.allUserID.includes(id)) {
					await Users.createData(id, { name: userName, data: {} });
					global.data.userName.set(id, userName);
					global.data.allUserID.push(id);
				}
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "Xin Chào {name}.\nChào mừng bạn đã đến với {threadName}.\n{type} là thành viên thứ {soThanhVien} của nhóm 🥰 \nMong {type1} luôn tương tác với nhóm nhé! thanks you 😘" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : 'bạn')
			.replace(/\{type1}/g, (memLength.length > 1) ?  'các cậu' : 'cậu')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}