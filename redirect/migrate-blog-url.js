/**
 * This is a simple NodeJS script which I used to migrate the blogs at root level to a
 * subdirectory "blog". The original URLs are manually captured and given a redirect
 * (via a meta-refresh) to the URL prefixed with"/blog/".
 */
"use strict";


const fs = require("fs");
const basedir = "../_posts/migrated/"
const targetdir = "blog/"
const urlPattern = new RegExp("^blogger_orig_url:.*$", "gm");

var migrate = function(basedir) {
    fs.readdir(basedir, (err, filenames) => {
        if (err) {
            onError(err);
            return;
        }

        filenames.forEach(processInputFilename);
    });
};

var processInputFilename = function(filename) {
    fs.readFile(basedir + filename, 'utf-8', function(err, content) {
        if (err) {
            onError(err);
            return;
        }
        var newContent = "---\n" + "layout: redirect\n" + "permalink: " + extractOldPath(content) + "\n" + "---\n"
        if (!fs.existsSync(targetdir)){
            fs.mkdirSync(targetdir);
        }
        console.log(targetdir + renameFilename(filename));
        writeNewFile(targetdir + renameFilename(filename), newContent);
    });
};

var renameFilename = function(filename) {
    return filename.substring(11);
};

var extractOldPath = function(filecontent) {
    var line = filecontent.match(urlPattern);
    if (line.length > 0) {
        return line[0].replace('blogger_orig_url: http://tech.ethomasjoseph.com', '');
    }
    return null;
};

var writeNewFile = function(filepath, content) {
    fs.writeFile(filepath, content, function(err) {
        if (err) {
            return console.log(err);
        }
    });
};


migrate(basedir);