var express = require('express');
var router = express.Router();
const https = require('https');
var ETlistItems;
var RUlistItems;

const ETpost = 'https://api.vk.com/method/wall.get?owner_id=-202120409&access_token=7ff0cc8d7ff0cc8d7ff0cc8dd07f86d29e77ff07ff0cc8d1fe0ce460248f8bfb41a485d&v=5.126';
const RUpost = 'https://api.vk.com/method/wall.get?owner_id=-202120422&access_token=2efe49e62efe49e62efe49e6f42e8857f722efe2efe49e64ef1b65d5acae1c7081f1797&v=5.126';


RUtext = {
  langto : "ET",
  h1:"ГОРЯЩИЕ ТУРЫ ПО ВСЕМУ МИРУ",
  firstBlockp: "Пройди простой опрос и получи индивидуальную подборку горящив туров",
  firstBlockBut: "ПОДОБРАТЬ ТУР ЗА 3 МИНУТЫ",
  h2: "Спецпредложения и горящие туры:",
  more : "Подробнее",
  footerBut: "Больше предложений",
  footerP : " Рауа 16А, 10152, Таллинн Тарту мнт. 29, 10128, Tallinn Pikk 45, 50603, Tarturaua @ oikumena.eeasian @ oikumena.ee tartu@oikumena.ee T: +372 625-6030 T: +372 648-4422 T: + 372 7420330 M: +372530 -09905 М: +372511-9681"
}

ETtext = {
  langto : "RU",
  h1:"VIIMASE MINUTI RINGID MAAILMAS",
  firstBlockp: "Osale lihtne uuring ja saad isikupärastatud valiku kuumadest ekskursioonidest",
  firstBlockBut: "LEIDA 3 minutiga ekskursioon",
  h2: "Eripakkumised ja viimase hetke ekskursioonid:",
  more : "Rohkem detaile",
  footerBut: "Veel pakkumisi",
  footerP : " Raua 16A, 10152, Tallinn Tartu mnt. 29, 10128, Tallinn Pikk 45, 50603, Tarturaua @ oikumena.eeasian @ oikumena.ee tartu@oikumena.ee T: +372 625-6030 T: +372 648-4422 T: + 372 7420330 M: +372530 -09905 М : + 372 511-9681 "
}


function getPost(apiPost){
  https.get(apiPost, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    if(apiPost == RUpost){
    resp.on('end', () => {
      RUlistItems = JSON.parse(data).response.items.slice(0, 7);
    });
    } else{
    resp.on('end', () => {
      ETlistItems = JSON.parse(data).response.items.slice(0, 7);
    });}

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

getPost(ETpost)
getPost(RUpost)

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(RUlistItems)
  res.render('index', { text : RUtext, posts : RUlistItems });
});

router.get('/ET', function(req, res, next) {
  res.render('index', { text : ETtext, posts : ETlistItems });
});

router.get('/RU', function(req, res, next) {
  res.render('index', { text : RUtext, posts : RUlistItems });
});


module.exports = router;
