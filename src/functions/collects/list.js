const { collects } = require("../db/collects");

module.exports = async (assetId, sensorId) => {
    const collectsData = await collects.listCollects(assetId, sensorId);
    
    return { statusCode: 200, body: JSON.stringify(collectsData) };
}