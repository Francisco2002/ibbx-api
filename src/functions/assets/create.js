const { assets } = require("../db/assets");

module.exports = async data => {
    const res = await assets.createAsset(data.name);
    
    return { statusCode: res.error ? 500 : 201, body: JSON.stringify(res) };
}