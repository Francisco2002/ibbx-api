const { sensors } = require("../db/sensors")

module.exports = async ({ assetId, name }) => {
    const res = await sensors.createSensor(name, assetId);
    
    return { statusCode: res.error ? 500 : 201, body: JSON.stringify(res) };
}