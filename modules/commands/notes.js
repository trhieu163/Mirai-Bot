module.exports.config = {
	name: "notes",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "DuyVuong",
	description: "tùy biến ghi chú cho từng nhóm",
	commandCategory: "tiện ích",
	usages: "[add/remove/all] [ghi chú]",
	cooldowns: 5,
	dependencies: {
        "fs-extra": "",
        "path": ""
    }
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "data", "notes.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = ({ event, api, args, permssion }) => {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const pathData = join(__dirname, "data", "notes.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, listRule: [] };

    switch (args[0]) {
        case "add": {
            if (permssion == 0) return api.sendMessage("[Note] Bạn không đủ quyền hạn để có thể sử dụng thêm ghi chú chỉ có quản trị viên mới được dùng!", threadID, messageID);
            if (content.length == 0) return api.sendMessage("[Note] Phần nhập thông tin không được để trống", threadID, messageID);
            if (content.indexOf("\n") != -1) {
                const contentSplit = content.split("\n");
                for (const item of contentSplit) thisThread.listRule.push(item);
            }
            else {
                thisThread.listRule.push(content);
            }
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage('[Note] Đã thêm ghi chú mới cho nhóm thành công!', threadID, messageID);
            break;
        }
        case "list":
        case"all": {
            var msg = "", index = 0;
            for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
            if (msg.length == 0) return api.sendMessage("[Note] Nhóm của bạn hiện tại chưa có danh sách ghi chú để hiển thị!", threadID, messageID);
            api.sendMessage(`Ghi chú của nhóm là:\n\n${msg}`, threadID, messageID);
            break;
        }
        case "rm":
        case "remove":
        case "delete": {
            if (!isNaN(content) && content > 0) {
                if (permssion == 0) return api.sendMessage("[Note] Bạn không đủ quyền hạn để có thể sử dụng xóa ghi chú chỉ có quản trị viên mới được dùng!", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("[Note] Nhóm của bạn chưa có danh sách ghi chú để có thể xóa!", threadID, messageID);
                thisThread.listRule.splice(content - 1, 1);
                api.sendMessage(`[Rule] Đã xóa thành công ghi chú có số thứ tự thứ ${content}`, threadID, messageID);
                break;
            }
            else if (content == "all") {
                if (permssion == 0) return api.sendMessage("[Note] Bạn không đủ quyền hạn để có thể sử dụng xóa ghi chú chỉ có quản trị viên mới được dùng!", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("[Note] Nhóm của bạn chưa có danh sách ghi chú để có thể xóa!", threadID, messageID);
                thisThread.listRule = [];
                api.sendMessage(`[Note] Đã xóa thành công toàn bộ ghi chú của nhóm!`, threadID, messageID);
                break;
            }
        }
        default: {
            if (thisThread.listRule.length != 0) {
                var msg = "", index = 0;
                for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
                return api.sendMessage(`Ghi chú của nhóm là:\n\n${msg}`, threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }

    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}