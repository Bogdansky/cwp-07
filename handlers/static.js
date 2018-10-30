const mime = require('mime-types');
const fs = require('fs');

module.exports.sendStatic = function sendStatic(req, res){
    let url = req.url === '/' ? 'index.html' : req.url;
    res.statusCode = 200;
    res.setHeader('Content-Type', mime.lookup(url));
    let inputStream = fs.createReadStream(`public${url === '/app.js' ? '/index.js' : url}`);
    inputStream.pipe(res);
}