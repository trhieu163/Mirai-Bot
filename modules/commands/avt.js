module.exports.config = {
    name: "avt",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "nhật",
    description: "Tạo ra một ảnh trên taoanhdep.\ntaoanhdep <id nhân vật> <chữ nền> <chữ ký> <màu (nếu không đổi màu thì nhập no.)>\nXem list danh sách id nhân vật của modules\nhttps://listavataranime.repl.co\nVí dụ : taoanhdep 1 HyTommy HyToomyVjp red\n(Lưu ý: tên màu bằng tiếng anh hoặc nhập là tên màu hoặc là mã hex)",
    commandCategory: "img-edit",
    cooldowns: 0
};
module.exports.run = async function ({ api, event, args, Users }) {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    if(!args[0]) return api.sendMessage({ body: `Vui lòng nhập theo định dạng: ID/ + Chữ ký + Chữ nền`              
    }, event.threadID)

const name = await Users.getNameUser(event.senderID);
var maunen = args.join(" ").slice(args.join(" ").lastIndexOf('|')+2);; //Màu nền ảnh
var chu_nen0 = args.join(" ").slice(args.join(" ").indexOf('|')+1);   
var chu_nen = chu_nen0.slice(0, chu_nen0.indexOf('|')); //chữ nền
var id = args[0];
var chu_ky0 = args.join(" ").slice(0, args.join(" ").lastIndexOf('|'));
var chu_ky00 = chu_ky0.slice(chu_ky0.lastIndexOf('|'));
var chu_ky = chu_ky00.slice(1); //chữ ký

if(!maunen) return api.sendMessage(`Thiếu màu nền\nĐinh dạng: ${this.config.name} ID/ + Chữ ký + Chữ nền + màu nền `, event.threadID);
      //ID nhân vật
if(!chu_ky) return api.sendMessage(`Thiếu chữ ký\nĐinh dạng: ${this.config.name} ID/ + Chữ ký + Chữ nền `, event.threadID);
       
if(!chu_nen) return api.sendMessage(`Thiếu chữ nền\nĐinh dạng: ${this.config.name} ID + Chữ ký + Chữ nền `, event.threadID);
let {data} = ( await axios.get('https://sumichan.tk/list&api_key=NDK_API_SumiChan'))
if (parseInt(id) > data.Data.length) return api.sendMessage(`có cái nịt`, event.threadID, event.messageID);

api.sendMessage(`Đang khởi tạo hình ảnh theo yêu cầu của ${name}`, event.threadID, (err, info) =>
setTimeout(() => {
    api.unsendMessage(info.messageID) } , 8000),event.messageID);
         const hi = __dirname + "/cache/ytc.jpg";         
         let GetImage = (await axios.get(encodeURI(`https://sumichan.tk/avtchuky?id=${id}&chu_ky=${chu_ky}&chu_nen=${chu_nen}&color=${maunen}&api_key=NDK_API_SumiChan`), {responseType: "arraybuffer"})).data;  
         fs.writeFileSync(hi, Buffer.from(GetImage, 'utf-8'));
           
                api.sendMessage({
                    body: `🐥ID Nhân Vật: ${id}\n😎Chữ nền: ${chu_nen}\n🤭Chữ ký: ${chu_ky}\n🏔Màu nền: ${maunen}`,
                    attachment: fs.createReadStream(hi)
                }, event.threadID, () => fs.unlinkSync(hi), event.messageID);
}