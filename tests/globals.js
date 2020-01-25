// Set here the global variables used in the sets.
var config = {
    baseUrl: "http://localhost:3000",
    filesPath: "files",
    screenshotsPath: "screenshots",
    devices: {
        laptop: {
            width: 1200,
            height: 800
        },
        desktop: {
            width: 2560,
            height: 1440
        },
        mobile_portrait: {
            width: 370,
            height: 650
        },
        mobile_landscape: {
            width: 650,
            height: 370
        },
        tablet_portrait: {
            width: 800,
            height: 1024
        },
        tablet_landscape: {
            width: 1024,
            height: 768
        }
    }
};


// @TODO: move every function to page objects!

/**
 * Get the path where files are located.
 */
config.getFilesPath = () => {
    return __dirname + "/" + config.filesPath;
}

/**
 * Get the real path for a relative path used in tests. 
 */
config.getFilesRealPath = (relativePath) => {
    return config.getFilesPath() + '/' + relativePath;
}


/**
 * Get the path where files are located.
 */
config.getScreenshotsPath = () => {
    return __dirname + "/" + config.screenshotsPath;
}

/**
 * Get the real path for a relative path used in tests. 
 */
config.getScreenshotRealPath = (relativePath) => {
    return config.getScreenshotsPath() + '/' + relativePath;
}

config.generateScreenshotFileName = () => {
    let date = new Date();
    return 'screenshot-' 
    + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() 
    + '-' + date.getHours() + date.getMinutes() + date.getSeconds() + '.png';
}

module.exports = config;
