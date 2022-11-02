module.exports.config = {
    name: "afk",
    version: "1.0.0",
    permissions: 1,
    credits: "Henry",
    description: "Bật hoặc tắt chế độ afk",
    usages: "[lí do]",
    commandCategory: "tiện ích",
    cooldowns: 5
};

const afkPath = __dirname + '/data/afk.json';
const fs = require('fs');

module.exports.onLoad = () => {
  if (!fs.existsSync(afkPath)) fs.writeFileSync(afkPath, JSON.stringify({}));
}

module.exports.handleEvent = async function({ api, event, Users }) {
    let afkData = JSON.parse(fs.readFileSync(afkPath));
    var { senderID, threadID, messageID, mentions } = event;
    if (senderID in afkData) {
        var info = afkData[senderID];
        delete afkData[senderID];
        fs.writeFileSync(afkPath, JSON.stringify(afkData, null, 4));
        return api.sendMessage(`Chào mừng bạn đã quay trở lại! 🥰`, threadID, () => {
            if (info.tag.length == 0) api.sendMessage("Trong lúc bạn đi vắng, không có ai nhắc đến bạn cả", threadID);
            else {
                var msg = "";
                for (var i of info.tag) {
                    msg += `${i}\n`
                }
                api.sendMessage("Đây là danh sách những tin nhắn bạn được tag trong khi bạn đi vắng:\n\n" + msg, threadID)
            }
        }, messageID);
    }

    if (!mentions || Object.keys(mentions).length == 0) return;
    
    for (const [ID, name] of Object.entries(mentions)) {
        if (ID in afkData) {
            var infoafk = afkData[ID], mentioner = await Users.getNameUser(senderID), replaceName = event.body.replace(`${name}`, "");
            infoafk.tag.push(`${mentioner}: ${replaceName == "" ? "Đã tag bạn 1 lần" : replaceName}`)
            afkData[ID] = infoafk;
            fs.writeFileSync(afkPath, JSON.stringify(afkData, null, 4));
            return api.sendMessage(`${name.replace("@", "")} hiện đang bận${infoafk.lido ? ` với lý do: ${infoafk.lido}.` : "."}`, threadID, messageID);
        }
    }
}

module.exports.run = async function({ api, event, args, Users }) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    let afkData = JSON.parse(fs.readFileSync(afkPath));
    const { threadID, senderID, messageID, body } = event;
    var content = args.join(" ") || "";
    if (!(senderID in afkData)) {
        afkData[senderID] = {
            lido: content,
            tag: []
        }
        fs.writeFileSync(afkPath, JSON.stringify(afkData, null, 4));
        var msg = (content.length == 0) ? 'Bạn đã bật chế độ afk mà không có lí do' : `Bạn đã bật chế độ afk với lí do: ${content}`;
        return api.sendMessage(msg, threadID, messageID);
    }
}