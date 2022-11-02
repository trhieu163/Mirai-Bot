
module.exports.config = {
    name: "petmonters",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hercules !!!",
    description: "Mấy con gấu chó sô lô với nhau :))",
    commandCategory: "game",
    usages: "-r/-s/-l/-p",
    cooldowns: 0,
    dependencies: {
        "request":"",
        "fs-extra":""
    }
};
/*==================== NHẮN TIN ======================*/
module.exports.run = ({ event, api, args, client, utils }) => {
    if (!args[0]) {
        api.sendMessage(`Vui lòng nhập các tag: -r/-s/-l/-p`, event.threadID);
    } else {
        switch(args[0]) {
            case "-r": {
            return api.sendMessage(
                "Đăng kí thành công !!!\nBro chính thức trở thành một huấn luyện viên"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "-r"
                });
            }, event.messageID);
        }
        case "-s": {
            return api.sendMessage(
                "==== SHOP PETMONTERS ====\n1.ĐỒ ĂN\n2.VŨ KHÍ\n3.GIÁP\n4.PET"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "-s"
                });
            }, event.messageID);
        }
        case "-l": {
            return api.sendMessage(
                "1.PET HỆ LỬA\n2.PET HỆ NƯỚC\n3.PET HỆ ĐẤT\n4.PET HỆ CỎ\n5.PET HỆ ÁNH SÁNG\n6.PET HỆ BÓNG TỐI"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "-l"
                });
            }, event.messageID);
        }
        case "-p": {
            return api.sendMessage(
                "Comming soon..."
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "-p"
                });
            }, event.messageID);
        }
            default:
            return utils.throwError("petmonters", event.threadID, event.messageID); break;
        }
    }
};
/*====================== REPLY =========================*/
module.exports.handleReply = async function({ api, event, handleReply, client }) {
  switch(handleReply.type) {
    case "-s":
      switch(event.body) {
        case "1":
        return api.sendMessage(
                "===[FOOD]===\n1.Cá(100Đ)\nThả <3 để mua!!!\n2.Nước(100Đ)\nThả 👍 để mua!!!\n3.Trái cây(100Đ)\nThả 😢 để mua!!!"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "FOOD"
                });
            }, event.messageID);
        case "2":
          return api.sendMessage(
                "===[VŨ KHÍ]===\n1.Kiếm\n2.Súng\n3.Khiên"
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "VUKHI"
                });
            }, event.messageID);
          case "3":
          return api.sendMessage(
                "===[GIÁP]===\n1.Giáp da\n2.Comming soon..."
            , event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "GIAP"
                });
            }, event.messageID);
          case "4":
          return api.sendMessage("Comming soon...",  event.threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "PET"
                });
            }, event.messageID);
                  }
      case "-l":
      switch(event.body) {
        case "1":
        return api.sendMessage("Tên: Chó Ba Đầu\nHệ: Lửa\nMáu: 120\nTấn công: 120\nKĩ năng đặc biệt: Khè ra lửa", event.threadID); break;
        case "2":
          return api.sendMessage("Tên: Cá Sấu Ba Đuôi\nHệ: Nước\nMáu: 120\nTấn công: 120\nKĩ năng đặc biệt: Phun ra nước", event.threadID); break;
          case "3":
          return api.sendMessage("Tên: Gấu Chó\nHệ: Đất\nMáu: 120\nTấn công: 120\nKĩ năng đặc biệt: Động đất", event.threadID); break;
          case "4":
          return api.sendMessage("Tên: Rắn Khổng Lồ\nHệ: Cỏ\nMáu: 120\nTấn công: 120\nKĩ năng đặc biệt: Trói nạn nhân", event.threadID); break;
          case "5":
          return api.sendMessage("Tên: Rồng Ba Đầu\nHệ: Ánh Sáng\nMáu: 120\nTấn công: 120\nKĩ năng đặc biệt: Chưởng ra cái đầu buồi gì đó màu trắng trắng", event.threadID); break;
          case "6":
          return api.sendMessage("Tên: Ác Quỷ\nHệ: Bóng tối\nMáu: 120\nTấn công: 120\nKĩ năng đặc biệt: Bóng tối bao trùm, làm mù mắt đối phương", event.threadID); break;
      }
  }
}