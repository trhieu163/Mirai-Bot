module.exports.config = {
    name: "out",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "HungCho",
    description: "Rời nhóm",
    commandCategory: "Admin",
    usages: "out [id]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
      const moment = require("moment-timezone");
        var today = new Date()
        var content = args.join(" ")
        if (event.messageReply) {name = event.messageReply.body} 
        else name = args[0] 
            let threadInfo = await api.getThreadInfo(name || event.threadID)
        let hii = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
        var date = today.getDate()+ '/' +(today.getMonth()+1)+ '/' +today.getFullYear();
        var msg = `Đã nhận lệnh rời khỏi nhóm ${threadInfo.name} từ Admin.`;
        var admin = global.config.admin;

        let namee = threadInfo.threadName;
        var msgg = "Bot đã rời nhóm " + "'" + namee + "'" + " với lệnh out !";
        var out = (!name) ? api.sendMessage(msg, event.threadID, 
            () => api.removeUserFromGroup(api.getCurrentUserID(), event.threadID),event.messageID) :  api.sendMessage(msg, name, 
            () => api.removeUserFromGroup(api.getCurrentUserID(), name))
        for(let i in admin){
          api.sendMessage(msgg, admin[i]);
        }
}