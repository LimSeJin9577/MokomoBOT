/*
모코모 봇 Test Code
- Base : 20231002.js
- Version : --
- Update Date : 20231021
- Update Preview : 
    > 장비 업데이트
    > 엘릭서 업데이트
    > 초월 업데이트
*/
// KEY Setting
const KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzMjExMTIifQ.W2txV2Kg9tKhkLXjZ-GoFfqeLpFVTxGSFkwwu2dLo-a5BJJC-5C1FqPG2sFJFwSXwvZaFsTPTtrMix3SkHG4a2rOsvL46L_lBUBU5U2twfhfBQSTtV1RjXA5vOSoz8qfFkQF--ZNvn3VC1o2Mqfi06fqxXNBt8SGglec1xlxBDKdQINDVx3FkbsE3lTEP8HBJiRo6wotWcMJ0lY0q5OT0pmo0MUlt4yIIrEpcVXDKoS90KIzHK6dBfnmt-xD5n5LVqrZAkd0rq_hLa0iK_3mKZBdNkRaYqX1fE4vp0iU4KLagzRiC3W9uCi6LaViqxuhkfUP_Ompg0JI03HcUgzy2Q';

// Character Name
const name = '로잘선'

/*
Request URL
const Url = "https://developer-lostark.game.onstove.com/characters/" + name + "/siblings";
*/
// const Url = "https://developer-lostark.game.onstove.com/characters/" + name + "/siblings";
const Url = "https://developer-lostark.game.onstove.com/armories/characters/"+ name +"/equipment";


// API Response __* Do not Touch!!
const params = {
  headers: { 'Accept' : 'application/json', 'Authorization' : "bearer " + KEY}, method: 'GET',};

let js = fetch(Url, params)
  .then((response) => response.json())
  .then((data) => data)
  // .catch((error) => console.log(error));

function preprocess(js) {
  let js_string = JSON.stringify(js);
  let c = js_string.substr(1, -1);
  return c;

}


preprocess(js)


// setTimeout은 실제로 가서는 없어도 됨. 
setTimeout(function() {
    // console.log(typeof(js)); //object로 인식한다.(json()함수로 처리된듯)
    console.log(preprocess(js));
  }, 1000);

