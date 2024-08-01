const { collects } = require("../db/collects")

module.exports = async ({ date, value, sensorId }) => {
    const res = await collects.createCollect(date, value, sensorId);
    
    return { statusCode: res.error ? 500 : 201, body: JSON.stringify(res) };
}