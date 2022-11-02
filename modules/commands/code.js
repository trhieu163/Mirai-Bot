module.exports.config = {
    name: "code",
    version: "2.1.9",
    hasPermssion: 2,
    credits: "miw.fo",
    description: "Làm 1 cái gì đó trong commands",
    commandCategory: "admin",
    usages: "",
    hide: true,
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args, Users }) => {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const cheerio = global.nodemodule["cheerio"];
    if (!args[0]) return api.sendMessage("Đọc code để biết cách xài chứ ai rảnh giải thích?", event.threadID);
    var path = __dirname + '/';
    switch (args[0]) {
        case '-c':
        case 'create': {
            if (args[1].length == 0) return api.sendMessage("Vui lòng đặt tên cho file của bạn", event.threadID);
            if (fs.existsSync(`${__dirname}/${args[1]}.js`))
                return api.sendMessage(
                    `File ${args[1]}.js đã tồn tại.`,
                    event.threadID,
                    event.messageID
                );
            fs.copySync(__dirname + "/example.js", __dirname + "/" + args[1] + ".js");
            return api.sendMessage(
                `Đã tạo thành công file "${args[1]}.js".`,
                event.threadID,
                event.messageID
            );
            break;
        }
        case "-d":
        case 'del': {
            fs.unlink(`${__dirname}/${args[1]}.js`);
            return api.sendMessage(`Đã xoá file ${args[1]}.js`, event.threadID, event.messageID);
            break;
        }
        case "rename":
        case 're': {
            fs.rename(`${__dirname}/${args[1]}.js`, `${__dirname}/${args[2]}.js`, function (err) {
                if (err) throw err;
                return api.sendMessage(
                    `Đã đổi tên file ${args[1]}.js thành ${args[2]}.js`,
                    event.threadID,
                    event.messageID)
            });
            break;
        }
      case 'up':
      case 'link': {
        const request = require('request')
  const cheerio = require('cheerio');
  const fs = require('fs')
  const { threadID, messageID } = event;
  const content = args[1];
  if(!content) return api.sendMessage('Thiếu dữ liệu!', threadID, messageID);
  if(content.endsWith(".js") || content.endsWith(".json")) {
    var data = await fs.readFile(
      `${__dirname}/${content}`,
      "utf-8",
      async function (err, data) {
        if (err) return api.sendMessage(`Không tìm thấy file "${content}".`, threadID, messageID);
        await builtooldev(data)
      }
    );
  }
  else if(event.type == "message_reply" && (event.messageReply.body.indexOf('https://buildtool.') !== -1 || event.messageReply.body.indexOf('https://tinyurl.com') !== -1)) {
    if(!args[1]) return api.sendMessage('Vui lòng nhập tên file muốn áp dụng code mới!', threadID, messageID);
    const options = {
      method: 'GET',
      url: event.messageReply.body
    };
    request(options, function (error, response, body) {
      if(error) return api.sendMessage('Vui lòng chỉ reply link (không chứa gì khác ngoài link)', threadID, messageID);
      const load = cheerio.load(body);
      load('.language-js').each((index, el) => {
        if(index !== 0) return;
        var code = el.children[0].data
        fs.writeFile(`${__dirname}/${args[1]}.js`, code, "utf-8",
          function(err) {
            if (err) return api.sendMessage(`Đã xảy ra lỗi khi áp dụng code mới cho "${args[1]}.js".`);
            return api.sendMessage(`Đã thêm code này vào "${args[1]}.js".`, threadID, messageID);
          }
        );
      });
    });
  }
  else {
    await builtooldev(content)
  }
  async function builtooldev(content) {
    const options = {
        method: 'POST',
        url: 'https://buildtool.dev/verification',
        headers: {
          'cookie': 'paste_submitted=yes; last_code_class=language-js; last_page_link=code-viewer.php%3Fpaste%3D097ba7.language-js'
        },
        form: {
          'content': content,
          'code_class': 'language-js'
        }
    };
    request(options, function (error, response, body) {
      if(error) return api.sendMessage('Đã có lỗi xảy ra!', threadID, messageID);
      const $ = cheerio.load(body);
      $('a').each((index, el) => {
      if(index !== 0) return;
        return api.sendMessage(`Link của bạn đây: https://buildtool.dev/${el.attribs.href}`, threadID,
            async function(error, info) {
                if(error) return await shortLink(el.attribs.href)
            }, messageID);
      });
    });
  }
  async function shortLink(link) {
    const turl = require('turl');
    turl.shorten('https://buildtool.dev/' + link).then((res) => {
      return api.sendMessage(`Do bị hạn chế nên gửi link rút gọn: ${res}`, threadID, messageID);
    }).catch((err) => {
      return api.sendMessage(`Bỏ dấu cách: https://buildtool. dev/${link}`, threadID, messageID);
    });
  }
} break;
        default: {
          const fs = require("fs-extra")
	const stringSimilarity = require('string-similarity');
	const file = args.join(" ");
	if(!file) return api.sendMessage('Tên file không được bỏ trống', event.threadID, event.messageID);
	if (!file.endsWith('.js')) return api.sendMessage('Đuôi file không được khác .js', event.threadID, event.messageID);
	if(event.type == "message_reply") {
		var uid = event.messageReply.senderID
		var name = (await Users.getData(uid)).name
		if(!fs.existsSync(__dirname+"/"+file)) { 
			var mdl = args.splice(1, args.length);
		  	mdl = fs.readdirSync(__dirname).filter((file) => file.endsWith(".js"))
		  	mdl = mdl.map(item => item.replace(/\.js/g, ""));
			var checker = stringSimilarity.findBestMatch(file, mdl)
		    if (checker.bestMatch.rating >= 1) var search = checker.bestMatch.target;
        	if(search == undefined) return api.sendMessage('🔎 Không tìm thấy file ' + args.join(" "), event.threadID, event.messageID); 
			return api.sendMessage('Không tìm thấy file: ' + file + ' \nNhưng có file gần giống là: ' + search + '.js, \n\nThả cảm xúc vào tin nhắn này để give nó.', event.threadID, (error, info) => {
	        global.client.handleReaction.push({
	        	type: 'user',
	            name: this.config.name,
	            author: event.senderID,
	            messageID: info.messageID,
	            file: search,
	            uid: uid,
	            namee: name
	        })}, event.messageID);
		}
		fs.copyFile(__dirname + '/'+file, __dirname + '/'+ file.replace(".js",".txt"));
		return api.sendMessage({
			body: 'File ' + args.join(' ') + ' của bạn đây', 
			attachment: fs.createReadStream(__dirname + '/' + file.replace('.js', '.txt'))
		}, uid, () => fs.unlinkSync(__dirname + '/' + file.replace('.js', '.txt'))).then(
            api.sendMessage('Check tin nhắn đi ' + name, event.threadID, (error, info) => {
            	if(error) return api.sendMessage('Có lỗi khi gửi file đến ' + name, event.threadID, event.messageID);
            }, event.messageID));
	}
	else {
		if(!fs.existsSync(__dirname+"/"+file)) { 
			var mdl = args.splice(1, args.length);
		  	mdl = fs.readdirSync(__dirname).filter((file) => file.endsWith(".js"))
		  	mdl = mdl.map(item => item.replace(/\.js/g, ""));
			var checker = stringSimilarity.findBestMatch(file, mdl)
		    if (checker.bestMatch.rating >= 0.5) var search = checker.bestMatch.target;
       		if(search == undefined) return api.sendMessage('🔎 Không tìm thấy file ' + args.join(" "), event.threadID, event.messageID); 
			return api.sendMessage('Không tìm thấy file: ' + file + ' \nNhưng có file gần giống là: ' + search + '.js, \n\nThả cảm xúc vào tin nhắn này để give nó.', event.threadID, (error, info) => {
	        global.client.handleReaction.push({
	        	type: 'thread',
	            name: this.config.name,
	            author: event.senderID,
	            messageID: info.messageID,
	            file: search
	        })}, event.messageID);
		}
		fs.copyFile(__dirname + '/'+file, __dirname + '/'+ file.replace(".js",".txt"));
		return api.sendMessage({
			body: 'File ' + args.join(' ') + ' của bạn đây', 
			attachment: fs.createReadStream(__dirname + '/' + file.replace('.js', '.txt'))
		}, event.threadID, () => fs.unlinkSync(__dirname + '/' + file.replace('.js', '.txt')), event.messageID);
	}
}
    }
}

module.exports.handleReaction = ({ Users, api, event, handleReaction,  }) => {
    var { file, author, type, uid, namee } = handleReaction;
    if (event.userID != handleReaction.author) return;
    const fs = require("fs-extra")
    var fileSend = file + '.js'
    switch (type) {
    	case "user": {
		    fs.copyFile(__dirname + '/'+fileSend, __dirname + '/'+ fileSend.replace(".js",".txt"));
		    api.unsendMessage(handleReaction.messageID)
			return api.sendMessage({
				body: '» File ' + file + ' của bạn đây', 
				attachment: fs.createReadStream(__dirname + '/' + fileSend.replace('.js', '.txt'))
			}, uid, () => fs.unlinkSync(__dirname + '/' + fileSend.replace('.js', '.txt'))).then(
            api.sendMessage('Check tin nhắn đi ' + namee, event.threadID, (error, info) => {
            	if(error) return api.sendMessage('Có lỗi khi gửi file đến ' + namee, event.threadID, event.messageID);
            }, event.messageID));;
		}
		case "thread": {
			fs.copyFile(__dirname + '/'+fileSend, __dirname + '/'+ fileSend.replace(".js",".txt"));
		    api.unsendMessage(handleReaction.messageID)
			return api.sendMessage({
				body: 'File ' + file + ' của bạn đây', 
				attachment: fs.createReadStream(__dirname + '/' + fileSend.replace('.js', '.txt'))
			}, event.threadID, () => fs.unlinkSync(__dirname + '/' + fileSend.replace('.js', '.txt')), event.messageID);
		}
	}
}