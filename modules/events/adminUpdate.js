module.exports.config = {
    name: "adminUpdate",
    eventType: ["log:thread-admins","log:thread-name", "log:user-nickname"],
    version: "1.0.1",
    credits: "Mirai Team",
    description: "Cập nhật thông tin nhóm một cách nhanh chóng",
    envConfig: {
        autoUnsend: true,
        sendNoti: true,
        timeToUnsend: 10
    }
};

module.exports.run = async function ({ event, api, Threads }) { 
    const { threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;

    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
            case "log:thread-admins": {
                if (logMessageData.ADMIN_EVENT == "add_admin") {
                const i = await api.getUserInfo(logMessageData.TARGET_ID);
                const name = await i[logMessageData.TARGET_ID].name
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID })
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage({body: `[ CẬP NHẬT NHÓM ]\n» Đã cập nhật người dùng: ${name}\n» Trở thành quản trị viên nhóm.`, mentions: [{ tag: name, id: logMessageData.TARGET_ID }]}, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                const c = await api.getUserInfo(logMessageData.TARGET_ID);
                const d = await c[logMessageData.TARGET_ID].name
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.ID != logMessageData.TARGET_ID);
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage({body: `[ CẬP NHẬT NHÓM ]\n» Đã cập nhật người dùng: ${d}\n» Trở thành thành viên.`, mentions: [{ tag: d, id: logMessageData.TARGET_ID }]}, threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                break;
            }

            case "log:user-nickname": {
            const cc = await api.getUserInfo(logMessageData.participant_id);
                const name = await cc[logMessageData.participant_id].name
                  
                dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                if (typeof global.configModule["nickname"] != "undefined" && !global.configModule["nickname"].allowChange.includes(threadID) && !dataThread.adminIDs.some(item => item.id == event.author) || event.author == api.getCurrentUserID()) return;
                if (global.configModule[this.config.name].sendNoti) api.sendMessage({body: `[ CẬP NHẬT NHÓM ]\n» Đã cập nhật biệt danh của người dùng » ${name}\n» Thành: ${(logMessageData.nickname.length == 0) ? "tên gốc": logMessageData.nickname}`, mentions: [{ tag: name, id: logMessageData.participant_id }]}, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }

            case "log:thread-name": {
                dataThread.threadName = event.logMessageData.name || "Không tên";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[ CẬP NHẬT NHÓM ]\n» Đã cập nhật tên nhóm thành: ${dataThread.threadName}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
           
            }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e) };
}