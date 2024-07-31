const { collects } = require("../db/collects")

module.exports = async (sensorId, date) => {
    const res = await collects.deleteCollect(sensorId, date);
    
    return { statusCode: res.error ? 500 : 201, body: JSON.stringify(res) };
}