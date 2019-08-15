const PropertiesReader = require('properties-reader');
const configProps = PropertiesReader('config.properties');

var getProperty = function (tag) {
    return configProps.get(tag);
}



module.exports = { getProperty };