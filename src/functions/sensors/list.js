const { sensors } = require("../db/sensors");

module.exports = async assetId => {
    const sensorsData = await sensors.listSensors(assetId);
    
    return { statusCode: 200, body: JSON.stringify(sensorsData) };
}