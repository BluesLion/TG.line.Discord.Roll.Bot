"use strict";
require('fs').readdirSync(__dirname + '/modules/').forEach(async function (file) {
  if (file.match(/\.js$/) !== null && file !== 'veryImportantPerson.js'&& file !== 'records.js'&& file !== 'discord_bot.js') {
    var name = file.replace('.js', '');
    exports[name] = await require('./modules/' + file);
  }
});
//chrome://inspect from your Chrome to open chrome devices inspector


/*
流程解釋

首先這裡會call modules/中的Discord line Telegram 三個檔案
如果在Heroku 有輸入它們各自的TOKEN 的話
服務就會各自啓動

Discord line Telegram三套BOT 都會統一呼叫analytics.js
再由analytics.js 呼叫roll/ 中各個的骰檔

所以基本上,要增加骰組
參考/roll中的DEMO骰組就好

以上, 有不明可以在GITHUB問我

另外, 使用或參考其中代碼的話, 請保持開源
感謝

*/