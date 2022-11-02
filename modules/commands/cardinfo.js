module.exports.config = {
    name: "cardinfo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Nhật Milo", 
    description: "Xem info của bạn",
    commandCategory: "img-edit",
    usages: "",
    cooldowns: 3,
    dependencies: {
        "request": "",
        "fs": ""
    }
    
};
module.exports.run = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const request = require('request');
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  let pathImg = __dirname + `/cache/${senderID}123${threadID}.png`;

if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
let info = (
    await axios.get(encodeURI(`https://sumichan.tk/sumiInfo?uid=${uid}`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(info, "utf-8"));
return api.sendMessage({body: "Done✅",
     attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};