const scriptName = "모코코모";
const {
  Jsoup: Jsoup} = org.jsoup;
const _cmdArr = ["test", "정보", "아바타", "명령어", "부캐", "내실", "시너지"];
const KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzMjExMTIifQ.W2txV2Kg9tKhkLXjZ-GoFfqeLpFVTxGSFkwwu2dLo-a5BJJC-5C1FqPG2sFJFwSXwvZaFsTPTtrMix3SkHG4a2rOsvL46L_lBUBU5U2twfhfBQSTtV1RjXA5vOSoz8qfFkQF--ZNvn3VC1o2Mqfi06fqxXNBt8SGglec1xlxBDKdQINDVx3FkbsE3lTEP8HBJiRo6wotWcMJ0lY0q5OT0pmo0MUlt4yIIrEpcVXDKoS90KIzHK6dBfnmt-xD5n5LVqrZAkd0rq_hLa0iK_3mKZBdNkRaYqX1fE4vp0iU4KLagzRiC3W9uCi6LaViqxuhkfUP_Ompg0JI03HcUgzy2Q';
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if (msg.startsWith("/")) {
    let cmd = msg.slice(1);
    var cmdArr = cmd.split(' ');
    if (_cmdArr.includes(cmdArr[0])) {
      let param = cmdArr[0];
      let reply_msg = '[모코모 봇]\n'
      
      // 명령어 tutorial
      try {
        if (param == '명령어') {
          //Core Function
          let text_tutorial= get_tutorial();
          replier.reply(reply_msg+text_tutorial);
        }
      } catch(e){
        //Exception
        reply_msg = reply_msg+'다시 입력해주세요!'
        replier.reply(reply_msg)
      }
      
      
      // Get Information======================
      try {
        if (param == '정보') {
          let name = msg.substr(cmdArr[0].length + 1).trim();
          //Core Function
          let resLOA = get_INFO(name);
          replier.reply(reply_msg+resLOA);
        }
      } catch(e){
        //Exception
        reply_msg = reply_msg+'다시 입력해주세요!'
        replier.reply(reply_msg)
      }
      
      // Get Avatar Info======================
      try {
        if (param == '아바타') {
        let name = msg.substr(cmdArr[0].length + 1).trim();
        //Core Function
        let resAvatar = get_Avatar(name);
        replier.reply(reply_msg+resAvatar)
        //replier.reply(reply_msg)
        }
      } catch(e) {
        reply_msg = reply_msg+'다시 입력해주세요!'
        replier.reply(reply_msg)
      }
      
      // Get SUB Info======================
      try {
        if (param == '부캐') {
          let name = msg.substr(cmdArr[0].length + 1).trim();
          //Core Function
          let resLOA = get_sub(name);
          replier.reply(reply_msg+resLOA);
        }
      } catch(e){
        //Exception
        reply_msg = reply_msg+'다시 입력해주세요!'
        replier.reply(reply_msg)
      }

      // Get Collectable Info======================
      try {
        if (param == '내실') {
          let name = msg.substr(cmdArr[0].length + 1).trim();
          //Core Function
          let collect_info = get_collect(name);
          replier.reply(reply_msg+collect_info);
        }
      } catch(e){
        //Exception
        reply_msg = reply_msg+'다시 입력해주세요!'
        replier.reply(reply_msg)
      }

      if (param == '시너지') {
        let synergy_t = get_synergy();
        replier.reply(reply_msg+synergy_t);
      }

      
      if (param == 'test') {
        replier.reply("테스트 중입니다 ㅇㅅㅇ");
      }
    }
  }
}

// 사용법 설명서
function get_tutorial() {
  let tut_text = '\💚💚 모코모 봇 사용법 💚💚\n\
캐릭터 검색 -> ”/정보 닉네임“\n\
아바타 검색 -> “/아바타 닉네임"\n\
부캐 검색 -> "/부캐 닉네임"\n\
내실 검색 -> "/내실 닉네임\n\
시너지 검색 -> "/시너지"';
  return tut_text;
}


// */정보 Function
function get_INFO(name) {
  let json;
  let response = Jsoup.connect("https://developer-lostark.game.onstove.com/characters/" + name + "/siblings")
  .header("Accept", "application/json")
  .header("Authorization", "bearer "+ KEY)
  .ignoreContentType(true)
  .execute().body();
  
  let res_ret = ''
  if (response=='null') { return "정보를 못찾았어요ㅠ" 
  } 

  response = response.replace('[','');
  response = response.replace(']','');

  //json형식만 남았으니 split, json형식으로 바꾸기
  var res_info = [];
  var responseArr = response.split('},{');
  for (let i = 0; i < responseArr.length; i++) {
    let r = responseArr[i];
    if (i<responseArr.length-1) { r = r + '}'; }
    if (i>0) { r = '{'+ r; }
    let rjs = JSON.parse(r);
    res_info.push(rjs);
  }
  
  // json 참조
  for (let i=0; i<res_info.length; i++) {
    if (res_info[i].CharacterName==name) {
      res_ret = res_ret+'캐릭터명 : '+res_info[i].CharacterName + '\n'
      res_ret = res_ret+'서버명 : '+res_info[i].ServerName + '\n'
      res_ret = res_ret+'클래스 : '+res_info[i].CharacterClassName + '\n'
      res_ret = res_ret+'아이템레벨 : '+ res_info[i].ItemMaxLevel.split('.')[0]
    }
  }
  return res_ret
}

// */아바타 Function
function get_Avatar(name) {
  let json;
  let response = Jsoup.connect("https://developer-lostark.game.onstove.com/armories/characters/"+name+"/profiles")
  .header("Accept", "application/json")
  .header("Authorization", "bearer "+ KEY)
  .ignoreContentType(true)
  .execute().body();
  
  let res_ret ='';
  null_point = response.split('"CharacterImage":')[1].substring(0, 4);
  if (null_point == 'null') { return "정보를 못찾았어요ㅠ"}
  else { res_ret = '링크에서 아바타를 확인하세요!\n' }
  response = response.split(',')[0];
  image_link = response.split('":')[1];
  image_link = image_link.replace('"','');
  image_link = image_link.replace('"','');
  return res_ret +   image_link;
}

// */부캐 Function
function get_sub(name){
  let json;
  let response = Jsoup.connect("https://developer-lostark.game.onstove.com/characters/" + name + "/siblings")
  .header("Accept", "application/json")
  .header("Authorization", "bearer "+ KEY)
  .ignoreContentType(true)
  .execute().body();

  let res_ret = ''
  if (response=='null') { return "정보를 못찾았어요ㅠ" } 

  response = response.replace('[','');
  response = response.replace(']','');
  
  
  //json형식만 남았으니 split, json형식으로 바꾸기
  var res_info = [];
  var responseArr = response.split('},{');
  for (let i = 0; i < responseArr.length; i++) {
    let r = responseArr[i];
    if (i<responseArr.length-1) { r = r + '}'; }
    if (i>0) { r = '{'+ r; }
    let rjs = JSON.parse(r);
    if (rjs.CharacterName == name) {
      server = rjs.ServerName
    }
    res_info.push(rjs);
  }
  res_ret = res_ret + '원정대 서버 : ' + server + '\n';
  res_ret = res_ret + '원정대 레벨 : ' + get_Expedition_Level(name) + '\n';
  // json 참조, 원정대(서버)단위로 출력
  for (let i=0; i<res_info.length; i++) {
    if (res_info[i].ServerName == server) {
      let class_name = class_change(res_info[i].CharacterClassName)
      res_ret = res_ret+'['+class_name+'] '+ res_info[i].CharacterName + '/';
      res_ret = res_ret+res_info[i].ItemMaxLevel.split('.')[0].replace(',','');
      if (i != res_info.length-1) {
        res_ret = res_ret + '\n'
      }
    }
  }
  if (res_ret.slice(res_ret.length-1) == '\n') {
    res_ret = res_ret.slice(0,res_ret.length-1)
  }
  return res_ret
}


// */부캐 Function +
function class_change(class_name) {
  let cc;
  switch(class_name) {
    case '워로드' :
      cc = '워 롯'; break;
    case '디스트로이어' :
      cc = '디 트'; break;
    case '버서커' : 
      cc = '버 섴'; break;
    case '홀리나이트' :
      cc = '홀 리'; break;
    case '슬레이어' :
      cc = '슬 레'; break;
    case '스트라이커' :
      cc = '스 커'; break;
    case '배틀마스터' : 
      cc = '배 마'; break;
    case '인파이터' :
      cc = '인 파'; break;
    case '기공사' :
      cc = '기 공'; break;
    case '창술사' :
      cc = '창 술'; break;
    case '데빌헌터' : 
      cc = '데 헌'; break;
    case '블래스터' :
      cc = '블 래'; break;
    case '스카우터' :
      cc = '스 카'; break;
    case '건슬링어' :
      cc = '건 슬'; break;
    case '바드' : 
      cc = '바 드'; break;
    case '서머너' :
      cc = '서 먼'; break;
    case '아르카나' :
      cc = '알 카'; break;
    case '소서리스' :
      cc = '소 서'; break;
    case '블레이드' : 
      cc = '블 레'; break;
    case '데모닉' :
      cc = '데 몬'; break;
    case '리퍼' :
      cc = '리 퍼'; break;
    case '소울이터' :
      cc = '소 울'; break;
    case '도화가' : 
      cc = '아 가'; break;
    case '기상술사' :
      cc = '기 상'; break;
  }
  return cc;
}

// */내실 Function
function get_collect(name) {
  let json;
  let response = Jsoup.connect("https://developer-lostark.game.onstove.com/armories/characters/"+ name +"/collectibles")
  .header("Accept", "application/json")
  .header("Authorization", "bearer "+ KEY)
  .ignoreContentType(true)
  .execute().body();
  
  let res_ret = ''
  if (response=='null') { return "정보를 못찾았어요ㅠ" 
  }
  response = preprocess_collect(response)
  res_ret = res_ret + '원정대 레벨 : ' + get_Expedition_Level(name) + '\n';
  res_ret = res_ret + response;
  return res_ret;
}

// */내실 Function +
function preprocess_collect(res) {
  res = res.slice(1, res.length-1)
  let res_arr = res.split(']},');
  let rtext = '';
  for(i=0;i<res_arr.length-1;i++) {
    let r = res_arr[i] + ']}'
    let rjs = JSON.parse(r);
    rtext = rtext + rjs.Type+' : '+rjs.Point+'/'+rjs.MaxPoint+'\n';
  }
  rtext = rtext.slice(0,rtext.length-1)
  return rtext;
}

// 원정대레벨 Function(not /)
function get_Expedition_Level(name) {
  let json;
  let response = Jsoup.connect("https://developer-lostark.game.onstove.com/armories/characters/"+ name +"/profiles")
  .header("Accept", "application/json")
  .header("Authorization", "bearer "+ KEY)
  .ignoreContentType(true)
  .execute().body();
  
  let exp_level = response.split('"ExpeditionLevel":')[1].split(',')[0];
  return exp_level;
}

// */시너지 Function
function get_synergy() {
  let synergy_text = "=============\n\
[치명타 확률 증가]\n\
건슬링어 데빌헌터\n\
기상술사 아르카나\n\
배틀마스터 스트라이커\n\
\n\
[치명타 피해 증가]\n\
창술사\n\
\n\
[사멸 피해 증가]\n\
블레이드 워로드\n\
\n\
[방어력 감소]\n\
워로드 디트 리퍼\n\
블래스터 서머너\n\
\n\
[받는 피해 증가]\n\
인파 버서커 데모닉\n\
호크아이 소서리스\n\
슬레이어 소울이터\n\
\n\
[공격력 증가]\n\
스카우터 기공사\n\
\n\
[정화]\n\
워로드 홀리나이트\n\
도화가 기공사\
  "
  return synergy_text;
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}
function onStart(activity) {
}
function onResume(activity) {
}
function onPause(activity) {
}
function onStop(activity) {
}