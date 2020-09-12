const fs = require('mz/fs');
const mime = require('mime');
const path = require('path');

function staticFiles(url, dir) {
    return async(ctx, next) => {
        let rpath = ctx.request.path;
        if(rpath.startsWith(url)) {
            let filepath = path.join(dir, rpath.substring(url.length));
            if(await fs.exists(filepath)) {
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(filepath);
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;