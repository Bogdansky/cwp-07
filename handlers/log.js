const fs = require('fs');

module.exports.log = function log(object, path='./log.json'){
    object.date = getDate();
    const json = JSON.parse(fs.readFileSync(path));
    json.push(object);
    fs.writeFile(path, JSON.stringify(json), (err) => {
        if (err) 
        throw err;
    })
}

function getDate(){
    let date = new Date(); 
    const dateString =  `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
    return date;
}

module.exports.getLog = function getLog(req, res, payload, cb){
    let logs = JSON.parse(fs.readFileSync('./log.json'));
    cb(null, logs);
}