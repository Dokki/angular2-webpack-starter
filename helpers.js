const path = require('path');
const zlib = require('zlib');

// Helper functions

function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

function gzipMaxLevel(buffer, callback) {
    return zlib.gzip(buffer, { level: 9 }, callback);
}

function root() {
    const args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode() {
    const args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}

exports.hasProcessFlag = hasProcessFlag;
exports.gzipMaxLevel = gzipMaxLevel;
exports.root = root;
exports.rootNode = rootNode;
