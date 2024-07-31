const { sensors } = require("../db/sensors")

module.exports = async (sensorId) => {
    const res = await sensors.deleteSensor(sensorId);
    
    return { statusCode: res.error ? 500 : 201, body: JSON.stringify(res) };
}