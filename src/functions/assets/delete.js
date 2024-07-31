const { assets } = require("../db/assets");

module.exports = async assetId => {
    const res = await assets.deleteAsset(assetId);
    
    return { statusCode: res.error ? 500 : 201, body: JSON.stringify(res) };
}