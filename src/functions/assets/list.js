const { assets } = require("../db/assets");

module.exports = async () => {
    const assetsData = await assets.listAssets();
    
    return { statusCode: 200, body: JSON.stringify(assetsData) };
}