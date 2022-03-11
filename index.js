var express = require('express');
var axios = require('axios');
var app = express();
app.listen(8081,'0.0.0.0', () => { console.info('Servidor publico iniciado en puerto 8081') } );
app.use(express.json({limit: '128mb'}));
app.use(express.urlencoded({limit: '128mb'}));
estructura = {
    "mensaje": null,
    "id": null,
    "key": null,
    "boolean": null,
    "string": null,
    "date": null,
    "file": null,
    "null": null,
    "content": [],
    "msg": null
}
estructuraContent = {
    "NumberA":null,
    "NumberB":null,
    "Cond":null,
    "Value":null
}
app.post('/main', async function(req, res) {
    let obj = estructura;
    obj = {...req.body }
    obj.msg = await getMsg();
    obj.content = [];
    for (let i = 0; i < req.body.content.length; i++) {
        let vocales = getVowels(req.body.content[i].Cond);
        if(vocales > 0){
            req.body.content[i].Value = req.body.content[i].NumberA + req.body.content[i].NumberB;
        }else{
            req.body.content[i].Value = req.body.content[i].NumberA * req.body.content[i].NumberB;
        }
        obj.content.push(req.body.content[i]);  
    }

    return res.status(200).send(obj);
});
function getVowels(str) {
    var m = str.match(/[aeiou]/gi);
    return m === null ? 0 : m.length;
  }
const getMsg = async () => {
    try{
        var req = await axios.request({
            method: 'get',
            url: 'http://localhost:8080/getMsg',
            headers: {  }
        });
        return req.data;
    }catch(e){
        console.log(e.response);
    }

}