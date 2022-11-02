module.exports.config = {
	name: "offbot",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "TruongTrann",
	description: "Tắt Bot.",
	commandCategory: "admin",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage("Bye",event.threadID, () =>process.exit(0))