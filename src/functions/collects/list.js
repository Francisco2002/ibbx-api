const { collects } = require("../db/collects");

module.exports = async sensorId => {
    const collectsData = await collects.listCollects(sensorId);
    
    return { statusCode: 200, body: JSON.stringify(collectsData) };
}