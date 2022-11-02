module.exports.config = {
 name: "autosend",
 eventType: [],
 version: "0.0.1",
 credits: "DungUwU",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
const moment = require("moment-timezone");
time = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
var cantsend = [];
	var allThread = global.data.allThreadID || [];
	if (time == "16:52:00") {
    for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage("test" + args.join(" ") , idThread, (error, info) => {
				if (error) cantsend.push(idThread);
			});
		}
	  }
    for (var id of global.config.ADMINBOT) {
          api.sendMessage(`Lỗi khi tự động gửi tin nhắn đến các threads:\n${cantsend.join("\n")}`,id);
    }
  }
}