		module.exports =  function ({ api,  client, models, Users, Threads, Currencies, utils, help })  { const stringSimilarity = require('string-similarity');const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");const logger = require("../../utils/log.js");
			return async function({ event }) {
				const { readFileSync, writeFileSync } = require("fs-extra");
					const { join } = require("path");
						const pathData = join(__dirname , '../AdminOnly.json');
							var Data2a = JSON.parse(readFileSync(pathData, "utf-8"));
								var thisThread = await Data2a.find(item => item.Misc == event.threadID) || { Misc: event.threadID, Status: 1,Onlist: [] };
									if (!Data2a.some(item => item.Misc == event.threadID)) { Data2a.push(thisThread);writeFileSync(pathData, JSON.stringify(Data2a, null ,4), "utf-8");}
								if (thisThread.Status == 2) {
								if (!Data2a.some(item => item.Misc == event.threadID)) { Data2a.push(thisThread);writeFileSync(pathData, JSON.stringify(Data2a, null ,4), "utf-8");}
							var { PREFIX, ADMINBOT } = global.config; // admin ngu cái regex =))
						var data1 = (await Threads.getData(String(event.threadID))).data["PREFIX"] || null;
					if (data1 && data1 != null && event.body && event.body.indexOf(data1)==0 || event.body && event.body.indexOf(PREFIX)==0) {
						var threadInfo = await api.getThreadInfo(event.threadID);
							var permssion = 0;
								const find = threadInfo.adminIDs.find(el => el.id == event.senderID);
									if (ADMINBOT.includes(event.senderID.toString())) permssion = 2;
										else if (!ADMINBOT.includes(event.senderID) && find) permssion = 1;		
											if (permssion == 0) {
											if (!Data2a.some(item => item.Misc == event.threadID)) { Data2a.push(thisThread);writeFileSync(pathData, JSON.stringify(Data2a, null ,4), "utf-8");}
										return api.sendMessage("Hông bé ơi, hiện tại BOT đang ở trạng thái chỉ QTV sử dụng, tắt bằng cách QTV chat .adminonly",event.threadID,async (error,info) => {
											await new Promise(resolve => setTimeout(resolve, 5 * 1000));
											api.unsendMessage(info.messageID);
										});
									}
								else if (permssion > 0) {
          				const handleCommand = require("./handleCommand")({ api, models, Users, Threads, Currencies });
					const handleReply = require("./handleReply")({ api, models, Users, Threads, Currencies });
					handleCommand({ event });
						handleReply({ event });
								}
									}
										}
									if (thisThread.Status == 1) {	
									if (!Data2a.some(item => item.Misc == event.threadID)) { Data2a.push(thisThread);writeFileSync(pathData, JSON.stringify(Data2a, null ,4), "utf-8");}
          					const handleCommand = require("./handleCommand")({ api, models, Users, Threads, Currencies });
						const handleReply = require("./handleReply")({ api, models, Users, Threads, Currencies });
					handleCommand({ event });
				handleReply({ event });				
		}
	};
};