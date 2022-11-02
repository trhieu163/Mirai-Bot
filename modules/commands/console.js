module.exports.config = {
    name: "console",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "DuyCuteUwU",
    description: "Console bớt nhàm chán hơn",
    commandCategory: "Admin",
    usages: "",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event, args, Users, Threads }) {
    const { configPath } = global.client;
    const { DeveloperMode } = global.config; 
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    const modDev = config.DeveloperMode
    if ((this.config.credits) != "DuyCuteUwU") { return api.sendMessage(`Sài chùa còn thích thay credits à con chó 😼`, event.threadID, event.messageID)}
    if (modDev == true) return
    else {
    const chalk = require('chalk');
    const moment = require("moment-timezone");
    var time= moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:s");
    var gio= moment.tz("Asia/Ho_Chi_Minh").format("HH");
    var phut= moment.tz("Asia/Ho_Chi_Minh").format("mm");
    var giay= moment.tz("Asia/Ho_Chi_Minh").format("s");
    var msg = event.body||"Tin nhắn này đéo phải chữ";
    const threadInfo = await api.getThreadInfo(event.threadID)
    var threadName = threadInfo.threadName||"Box chưa có tên";
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var randomColor1 = Math.floor(Math.random()*12345678).toString(16);
    var randomColor2 = Math.floor(Math.random()*13245769).toString(16);
    var randomColor3 = Math.floor(Math.random()*13333333).toString(16);
    var randomColor4 = Math.floor(Math.random()*15943833).toString(16);
    var randomColor5 = Math.floor(Math.random()*14983944).toString(16);
    var randomColor6 = Math.floor(Math.random()*11584570).toString(16);
    var randomColor7 = Math.floor(Math.random()*14377215).toString(16);
    const name = await Users.getNameUser(event.senderID)
    return console.log(chalk.white("›› 🌸 ") + chalk.green("Nhóm: ") + chalk.hex("#" + randomColor)(`${threadName} `) + chalk.green(`->`) +chalk.hex("#" + randomColor1) (` ${name} `)  + chalk.green(`->`) + chalk.hex("#" + randomColor2)(` ${msg} `) + chalk.green(`-> `) + chalk.hex("#" + randomColor3) (`${gio}`) + chalk.hex("#" + randomColor2) (`:`)+ chalk.hex("#" + randomColor6) (`${phut}`) + chalk.hex("#" + randomColor2) (`:`)+ chalk.hex("#" + randomColor7) (`${giay}`)) ;
}
}
module.exports.run = async ({ api, event, args }) => {
    if ((this.config.credits) != "DuyCuteUwU") { return api.sendMessage(`Sài chùa còn thích thay credits à con chó 😼`, event.threadID, event.messageID)}
    const {
        configPath
    } = global.client;
    const {
        DeveloperMode
    } = global.config;
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    const modDev = config.DeveloperMode

    if (modDev == true) {
        api.sendMessage(`DeveloperMode: ${modDev}\nVui lòng chỉnh về false để sử dụng!!!`, event.threadID)
    } else
        return api.sendMessage(`DeveloperMode: ${modDev}\nConsole đang chạy...`, event.threadID)
}
