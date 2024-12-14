import xmz_ from '#xmz_';
import fetch from 'node-fetch';
import plugin from './../../../lib/plugins/plugin.js';
export class plugin_name extends plugin {
  constructor () {
    super({
      name:"随机表情包",
      dsc:"调用小米粥工具箱获取随机表情包图像并发送",
      event:"message", 
      priority:1,
      rule:[
        {reg:/^#?随机奶龙/,fnc:'NaiLong'},
        {reg:/^#?随机Doro/gi,fnc:'Doro'},
        {reg:/^#?随机乌萨奇/,fnc:'WuSaQi'},
        {reg:/^#?随机懒羊羊/,fnc:'Paddi'}
      ]
    });
  }
  async NaiLong(e) { await s(e, 'NaiLong'); }
  async Doro(e) { await s(e, 'Doro'); }
  async WuSaQi(e) { await s(e, 'WuSaQi'); }
  async Paddi(e) { await s(e, 'Paddi'); }
}

async function s(e, f) {
  const index = await xmz_.config('sj_Image', 'index');
  const func = await xmz_.config('sj_Image', f);
  if (!index || func === false) {
    return false;
  }
  const uid = await xmz_.config('xmzTools', 'uid');
  const api_key = await xmz_.config('xmzTools', 'api_key');
  if (!uid||!api_key||uid==''||api_key=='') {
    e.reply('❌ 请求失败，缺少小米粥工具箱uid或api_key',true);
    return false;
  }

  const url = `https://tools.xmz.netkj.com/api/API/sj_${f}?uid=${uid}&api_key=${api_key}`;
  
  try {
    const json = await (await fetch(url)).json();
    if (json.code == 200) {
      e.reply(segment.image(json.data.url));
    } else {
      e.reply('❌ API未返回数据：\n'+json.msg,true);
    }
  } catch (err) {
    e.reply('❌ API请求时出现异常：\n'+err,true);
  }
}