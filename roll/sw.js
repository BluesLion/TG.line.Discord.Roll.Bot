"use strict";
const rollbase = require('./rollbase.js');
const axios = require('axios');
var rply = {
    default: 'on',
    type: 'text',
    text: ''
};

var gameName = function () {
    return '【劍世界2.5】.sw (Kx Gr FT TT)'
}

var gameType = function () {
    return 'sw2.5:hktrpg'
}
var prefixs = function () {
    return [{
        first: /^[.]sw$/i,
        second: null
    }]
}
var getHelpMessage = function () {
    return "【劍世界2.5】" + "\
    \n・啓動語 .sw (指令) 如 .sw K20\
	\n  自動的成功、成功、失敗、自動的失敗の自動判定を行います。\
\n\
   \n ・レーティング表　(Kx)\
   　\n Kキーナンバー+ボーナスの形で記入します。\
   　\n ボーナスの部分に「K20+K30」のようにレーティングを取ることは出来ません。\
   　\n また、ボーナスは複数取ることが出来ます。\
   　\n レーティング表もダイスロールと同様に、他のプレイヤーに隠れてロールすることも可能です。\
   　\n 例）K20　　　K10+5　　　k30　　　k10+10　　　Sk10-1　　　k10+5+2\
   \n \
   \n  ・クリティカル値の設定\
   　\n クリティカル値は [クリティカル値]で指定します。\
   　\n 指定しない場合はクリティカル値10とします。\
   　\n クリティカル処理が必要ないときは13などとしてください。(防御時などの対応)\
   　\n またタイプの軽減化のために末尾に「@クリティカル値」でも処理するようにしました。\
   　\n 例）K20[10]　　　K10+5[9]　　　k30[10]　　　k10[9]+10　　　k10-5@9\
   \n \
   \n ・ダイス目の修正（運命変転やクリティカルレイ用）\
   　\n 末尾に「$修正値」でダイス目に修正がかかります。\
   　\n $＋１と修正表記ならダイス目に＋修正、＄９のように固定値ならダイス目をその出目に差し替え。\
   　\n クリティカルした場合でも固定値や修正値の適用は最初の一回だけです。\
   　\n 例）K20$+1　　　K10+5$9　　　k10-5@9$+2　　　k10[9]+10$9\
    \
    \n ・ダイス目の修正（必殺攻撃用）\
    　\n 「＃修正値」でダイス目に修正がかかります。\
    　\n クリティカルした場合でも修正値の適用は継続されます。\
    　\n 例）K20#1　　　k10-5@9#2\
    \n \
    \n ・首切り刀用レーティング上昇 r10\
    　\n 例）K20r10　K30+24@8R10　K40+24@8$12r10\
    \n \
    \n ・グレイテストフォーチュンは末尾に gf\
    　\n 例）K20gf　K30+24@8GF　K40+24@8$12r10gf\
    \n \
    \n ・超越判定用に2d6ロールに 2D6@10 書式でクリティカル値付与が可能に。\
    　\n 例）2D6@10　2D6@10+11>=30\
    \n \
    \n ・成長　(Gr)\
    　\n 末尾に数字を付加することで、複数回の成長をまとめて行えます。\
    　\n 例）Gr3\
    \n \
    \n ・防御ファンブル表　(FT)\
    　\n 防御ファンブル表を出すことができます。\
    \n \
    \n ・絡み効果表　(TT)\
    　\n 絡み効果表を出すことができます。\
		\n "
}
var initialize = function () {
    return rply;
}

var rollDiceCommand = async function (inputStr, mainMsg, groupid, userid, userrole, botname, displayname, channelid) {
    rply.text = '';
    let result = '';
    switch (true) {
        case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
            rply.text = this.getHelpMessage();
            return rply;
        default:
            let str = encodeURIComponent(mainMsg[1])
            // result = calldice("SwordWorld2_5", mainMsg[1])
            //https://bcdice.herokuapp.com/v1/diceroll?system=Cthulhu&command=4d10%3E=15
            result = await axios.get('https://bcdice.onlinesession.app/v1/diceroll?system=SwordWorld2.5&command=' + str)
                .then(function (response) {
                    // handle success
                    return response.data.result;
                })
                .catch(function (error) {
                    // handle error
                    if (error.response.status != 400)
                        console.log(error);
                })
            if (result)
                rply.text = mainMsg[1] + result;
            return rply;
    }
}


module.exports = {
    rollDiceCommand: rollDiceCommand,
    initialize: initialize,
    getHelpMessage: getHelpMessage,
    prefixs: prefixs,
    gameType: gameType,
    gameName: gameName
};



var rate_sw2_0 = [
    //0
    ['*', 0, 0, 0, 1, 2, 2, 3, 3, 4, 4],
    ['*', 0, 0, 0, 1, 2, 3, 3, 3, 4, 4],
    ['*', 0, 0, 0, 1, 2, 3, 4, 4, 4, 4],
    ['*', 0, 0, 1, 1, 2, 3, 4, 4, 4, 5],
    ['*', 0, 0, 1, 2, 2, 3, 4, 4, 5, 5],
    ['*', 0, 1, 1, 2, 2, 3, 4, 5, 5, 5],
    ['*', 0, 1, 1, 2, 3, 3, 4, 5, 5, 5],
    ['*', 0, 1, 1, 2, 3, 4, 4, 5, 5, 6],
    ['*', 0, 1, 2, 2, 3, 4, 4, 5, 6, 6],
    ['*', 0, 1, 2, 3, 3, 4, 4, 5, 6, 7],
    ['*', 1, 1, 2, 3, 3, 4, 5, 5, 6, 7],
    //11
    ['*', 1, 2, 2, 3, 3, 4, 5, 6, 6, 7],
    ['*', 1, 2, 2, 3, 4, 4, 5, 6, 6, 7],
    ['*', 1, 2, 3, 3, 4, 4, 5, 6, 7, 7],
    ['*', 1, 2, 3, 4, 4, 4, 5, 6, 7, 8],
    ['*', 1, 2, 3, 4, 4, 5, 5, 6, 7, 8],
    ['*', 1, 2, 3, 4, 4, 5, 6, 7, 7, 8],
    ['*', 1, 2, 3, 4, 5, 5, 6, 7, 7, 8],
    ['*', 1, 2, 3, 4, 5, 6, 6, 7, 7, 8],
    ['*', 1, 2, 3, 4, 5, 6, 7, 7, 8, 9],
    ['*', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //21
    ['*', 1, 2, 3, 4, 6, 6, 7, 8, 9, 10],
    ['*', 1, 2, 3, 5, 6, 6, 7, 8, 9, 10],
    ['*', 2, 2, 3, 5, 6, 7, 7, 8, 9, 10],
    ['*', 2, 3, 4, 5, 6, 7, 7, 8, 9, 10],
    ['*', 2, 3, 4, 5, 6, 7, 8, 8, 9, 10],
    ['*', 2, 3, 4, 5, 6, 8, 8, 9, 9, 10],
    ['*', 2, 3, 4, 6, 6, 8, 8, 9, 9, 10],
    ['*', 2, 3, 4, 6, 6, 8, 9, 9, 10, 10],
    ['*', 2, 3, 4, 6, 7, 8, 9, 9, 10, 10],
    ['*', 2, 4, 4, 6, 7, 8, 9, 10, 10, 10],
    //31
    ['*', 2, 4, 5, 6, 7, 8, 9, 10, 10, 11],
    ['*', 3, 4, 5, 6, 7, 8, 10, 10, 10, 11],
    ['*', 3, 4, 5, 6, 8, 8, 10, 10, 10, 11],
    ['*', 3, 4, 5, 6, 8, 9, 10, 10, 11, 11],
    ['*', 3, 4, 5, 7, 8, 9, 10, 10, 11, 12],
    ['*', 3, 5, 5, 7, 8, 9, 10, 11, 11, 12],
    ['*', 3, 5, 6, 7, 8, 9, 10, 11, 12, 12],
    ['*', 3, 5, 6, 7, 8, 10, 10, 11, 12, 13],
    ['*', 4, 5, 6, 7, 8, 10, 11, 11, 12, 13],
    ['*', 4, 5, 6, 7, 9, 10, 11, 11, 12, 13],
    //41
    ['*', 4, 6, 6, 7, 9, 10, 11, 12, 12, 13],
    ['*', 4, 6, 7, 7, 9, 10, 11, 12, 13, 13],
    ['*', 4, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    ['*', 4, 6, 7, 8, 10, 10, 11, 12, 13, 14],
    ['*', 4, 6, 7, 9, 10, 10, 11, 12, 13, 14],
    ['*', 4, 6, 7, 9, 10, 10, 12, 13, 13, 14],
    ['*', 4, 6, 7, 9, 10, 11, 12, 13, 13, 15],
    ['*', 4, 6, 7, 9, 10, 12, 12, 13, 13, 15],
    ['*', 4, 6, 7, 10, 10, 12, 12, 13, 14, 15],
    ['*', 4, 6, 8, 10, 10, 12, 12, 13, 15, 15],
    //51
    ['*', 5, 7, 8, 10, 10, 12, 12, 13, 15, 15],
    ['*', 5, 7, 8, 10, 11, 12, 12, 13, 15, 15],
    ['*', 5, 7, 9, 10, 11, 12, 12, 14, 15, 15],
    ['*', 5, 7, 9, 10, 11, 12, 13, 14, 15, 16],
    ['*', 5, 7, 10, 10, 11, 12, 13, 14, 16, 16],
    ['*', 5, 8, 10, 10, 11, 12, 13, 15, 16, 16],
    ['*', 5, 8, 10, 11, 11, 12, 13, 15, 16, 17],
    ['*', 5, 8, 10, 11, 12, 12, 13, 15, 16, 17],
    ['*', 5, 9, 10, 11, 12, 12, 14, 15, 16, 17],
    ['*', 5, 9, 10, 11, 12, 13, 14, 15, 16, 18],
    //61
    ['*', 5, 9, 10, 11, 12, 13, 14, 16, 17, 18],
    ['*', 5, 9, 10, 11, 13, 13, 14, 16, 17, 18],
    ['*', 5, 9, 10, 11, 13, 13, 15, 17, 17, 18],
    ['*', 5, 9, 10, 11, 13, 14, 15, 17, 17, 18],
    ['*', 5, 9, 10, 12, 13, 14, 15, 17, 18, 18],
    ['*', 5, 9, 10, 12, 13, 15, 15, 17, 18, 19],
    ['*', 5, 9, 10, 12, 13, 15, 16, 17, 19, 19],
    ['*', 5, 9, 10, 12, 14, 15, 16, 17, 19, 19],
    ['*', 5, 9, 10, 12, 14, 16, 16, 17, 19, 19],
    ['*', 5, 9, 10, 12, 14, 16, 17, 18, 19, 19],
    //71
    ['*', 5, 9, 10, 13, 14, 16, 17, 18, 19, 20],
    ['*', 5, 9, 10, 13, 15, 16, 17, 18, 19, 20],
    ['*', 5, 9, 10, 13, 15, 16, 17, 19, 20, 21],
    ['*', 6, 9, 10, 13, 15, 16, 18, 19, 20, 21],
    ['*', 6, 9, 10, 13, 16, 16, 18, 19, 20, 21],
    ['*', 6, 9, 10, 13, 16, 17, 18, 19, 20, 21],
    ['*', 6, 9, 10, 13, 16, 17, 18, 20, 21, 22],
    ['*', 6, 9, 10, 13, 16, 17, 19, 20, 22, 23],
    ['*', 6, 9, 10, 13, 16, 18, 19, 20, 22, 23],
    ['*', 6, 9, 10, 13, 16, 18, 20, 21, 22, 23],
    //81
    ['*', 6, 9, 10, 13, 17, 18, 20, 21, 22, 23],
    ['*', 6, 9, 10, 14, 17, 18, 20, 21, 22, 24],
    ['*', 6, 9, 11, 14, 17, 18, 20, 21, 23, 24],
    ['*', 6, 9, 11, 14, 17, 19, 20, 21, 23, 24],
    ['*', 6, 9, 11, 14, 17, 19, 21, 22, 23, 24],
    ['*', 7, 10, 11, 14, 17, 19, 21, 22, 23, 25],
    ['*', 7, 10, 12, 14, 17, 19, 21, 22, 24, 25],
    ['*', 7, 10, 12, 14, 18, 19, 21, 22, 24, 25],
    ['*', 7, 10, 12, 15, 18, 19, 21, 22, 24, 26],
    ['*', 7, 10, 12, 15, 18, 19, 21, 23, 25, 26],
    //91
    ['*', 7, 11, 13, 15, 18, 19, 21, 23, 25, 26],
    ['*', 7, 11, 13, 15, 18, 20, 21, 23, 25, 27],
    ['*', 8, 11, 13, 15, 18, 20, 22, 23, 25, 27],
    ['*', 8, 11, 13, 16, 18, 20, 22, 23, 25, 28],
    ['*', 8, 11, 14, 16, 18, 20, 22, 23, 26, 28],
    ['*', 8, 11, 14, 16, 19, 20, 22, 23, 26, 28],
    ['*', 8, 12, 14, 16, 19, 20, 22, 24, 26, 28],
    ['*', 8, 12, 15, 16, 19, 20, 22, 24, 27, 28],
    ['*', 8, 12, 15, 17, 19, 20, 22, 24, 27, 29],
    ['*', 8, 12, 15, 18, 19, 20, 22, 24, 27, 30]
];

////////////////////////////////////////
//////////////// SW
////////////////////////////////////////
function sw(triggermsg) {


    //判斷式  [0]K013+21-5@8,[1]K,[2]13,[3]+21,[4]21,[5]-5,[6]5,[7]@8,[8]8

    if (triggermsg.match(/^(kk)0*([0-9][0-9]?|100)(((\+|-)(\d+)|)((\+|-)(\d+)|))(|\@(\d+))(|\$(\d+))(|\$\+(\d+))(|gf)$/i) != null) {
        //var varcou = 0;
        var finallynum = 0;
        var returnStr = triggermsg + '(SW 威力表) → ';
        var match = /^(kk)0*([0-9][0-9]?|100)(((\+|-)(\d+)|)((\+|-)(\d+)|))(|\@(\d+))(|\$(\d+))(|\$\+(\d+))(|gf)$/i.exec(triggermsg);
        //	console.log(match);
        if (match[11] == null) {
            match[11] = 10
        }
        if (match[11] <= 2) {
            match[11] = 3
        }

        for (var round = 1; round > 0; round--) {
            [match, round, returnStr, finallynum] = swroll(match, round, returnStr, finallynum);
        }
        //判斷式  [0]KK1+5-5@5$5$+5,[1]KK,[2]1,[3]+5-5,[4]+5,[5]+,[6]5,[7]-5,[8]-,[9]5,[10]@5,[11]5,[12]$5,[13]5,[14]$+5,[15]5,[16]gf

        returnStr = returnStr.replace(/[,][ ]+]/ig, ']');
        if (match[5] == '+') {
            for (var i = 0; i < Number(match[6]); i++) {
                finallynum++;
            }
        }
        if (match[5] == '-') {
            for (var i = 0; i < Number(match[6]); i++) {
                finallynum--;
            }
        }
        if (match[8] == '+') {
            for (var i = 0; i < Number(match[9]); i++) {
                finallynum++;
            }
        }
        if (match[8] == '-') {
            for (var i = 0; i < Number(match[9]); i++) {
                finallynum--;
            }
        }

        if (match[0] > 0) returnStr += '→' + match[0] + '迴轉';
        if ((match[0] == 0) && (/[*]/.test(returnStr))) returnStr += ' → 大失敗'
        else {
            returnStr += ' → ' + finallynum;
        }
        rply.text = returnStr;
        return rply;
    }
}

async function swroll(match, round, returnStr, finallynum) {
    //判斷式  [0]K013+21-5@8,[1]K,[2]13,[3]+21,[4]21,[5]-5,[6]5,[7]@8,[8]8
    //判斷式  [0]KK1+5-5@5$,[1]KK,[2]1,[3]+5-5,[4]+5,[5]+,[6]5,[7]-5,[8]-,[9]5,[10]@5,[11]5,[12]$5,[13]5,[14]$+5,[15]5 

    var result = 0;
    var rollnum = 1;
    if (isNaN(match[0])) match[0] = 0;
    match[1] = 0;
    var varcoua = "";
    var varcoub = "";
    var varsu = "";
    for (var i = 0; i < rollnum; i++) {
        //varcoua = Math.floor(Math.random() * 6) + 1;
        //varcoub = Math.floor(Math.random() * 6) + 1;
        varcoua = await rollbase.Dice(6)
        varcoub = await rollbase.Dice(6)
        if (match[16] == 'gf') varcoub = varcoua;
        var varcou = varcoua + varcoub;
        if (match[13] >= 1) {
            varcou = match[13];
        }
        if (match[15] >= 1) {
            for (var i = 0; i < Number(match[15]); i++) {
                varcou++;
            }
        }
        if (varcou > 12) {
            varcou = 12;
        }
        if (varcou <= 2) {
            varcou = 2;
        }
        result = rate_sw2_0[match[2]][varcou - 2];
        if (varcou >= Number(match[11])) {
            match[1]++;
            //match[0]++;
        }
        if (match[13] != null) {
            varsu += match[13];

        } else {
            varsu += varcoua + ',' + varcoub;
        }
        if (match[15] != null) {
            varsu += '+' + match[15];
        }

        match[13] = null;
        match[15] = null;
    }
    returnStr += result + '[' + varsu + '] ';
    if (isNaN(result)) {} else {
        finallynum += Number(result);
    }
    if (match[1] >= 1) {
        round++;
        match[0]++;
        returnStr += '+ ';
    }
    return [match, round, returnStr, finallynum];
}