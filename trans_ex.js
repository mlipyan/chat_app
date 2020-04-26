var  translate  = require("google-translate-api-browser").translate;
// var { translate } = require("../../dist/index");
var string = 'hello man';


var c;

translate(string, { to: "ru" })
    .then(res => {c = res.text; console.log(c)}).finally(()=>{});


