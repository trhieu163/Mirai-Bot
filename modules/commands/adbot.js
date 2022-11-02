module.exports.config = {
    name: "adbot",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Khánh Milo FIX",
    description: "",
    commandCategory: "Hệ thống Admin-bot",
    usages: "",
    cooldowns: 3,
    dependencies: {
        "axios": "",
        "fs-extra": ""
    }
    
};

module.exports.languages = {
    "vi": {
        "INFOADMIN": "🖐Xin chào: %1\n🔰Tên admin: %2\n⚛️UID: %3\n🔗Link FB: %4\n🚻Giới tính: %5\n💠Username: %6\n❄️Kết bạn ADMIN : %7\n🥺Zalo: 0799185105\n✡️ Sở thích: Nghe nhạc\n👩‍❤️‍👨 Đang độc thân \n✌Chiều cao: 1m77😢 \n😶Cân Nặng: 55Kg \n👍Sinh Ngày: 25-02-2003"
    },
    "en": {
        "addTags": "=== Anime's tags ===\n%1"
    }
}

module.exports.run = async({ api, event, args, Users, getText }) => {
    const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
    var nameid= (await Users.getData(event.senderID)).name;
    let data = await api.getUserInfo(global.config.ADMINBOT[0]);
    let url = data[global.config.ADMINBOT[0]].profileUrl;
    let b = data[global.config.ADMINBOT[0]].isFriend == false ? "không !" : data[global.config.ADMINBOT[0]].isFriend == true ? "có !" : "Đéo";
    let sn = data[global.config.ADMINBOT[0]].vanity;
    let name = await data[global.config.ADMINBOT[0]].name;
    var sex = await data[global.config.ADMINBOT[0]].gender;
    var uid = global.config.ADMINBOT[0]
    var gender = sex == 2 ? "Nam ♂️" : sex == 1 ? "Nữ ♀" : "Trần Đức Bo";
    var getimg = (await axios.get(`https://graph.facebook.com/${global.config.ADMINBOT[0]}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, {responseType: "arraybuffer"})).data;
    fs.writeFileSync(__dirname + `/cache/1.png`, Buffer.from(getimg, "utf-8")); 
    return api.sendMessage({body: getText("INFOADMIN", nameid, name, uid, url, gender, sn, b), attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
    
    }
 





  