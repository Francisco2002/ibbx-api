const { collects } = require("../db/collects")

module.exports = async ({ data, value, sensorId }) => {
    const res = await collects.createCollect(data, value, sensorId);
    
    return { statusCode: res.error ? 500 : 201, body: JSON.stringify(res) };
}