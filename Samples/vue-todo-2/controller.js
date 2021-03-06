const fs = require('fs');

// add url-route in /controllers

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: get ${path}`);
        } else if(url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: post ${path}`);
        } else if(url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: put ${path}`);
        } else if(url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: delete ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    try {
        fs.readFileSync(__dirname + '/' + dir).filter((f)=>{
            return f.endsWith('.js');
        }).forEach((f)=>{
            console.log(`process controller: ${f}...`);
            let mapping = require(__dirname + '/' + dir + '/' + f);
            addMapping(router, mapping);
        });
    } catch(e) {
        
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}