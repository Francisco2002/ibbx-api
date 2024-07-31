const { dbTransaction } = require(".");

async function createAssetsTable() {
    await dbTransaction("run", "CREATE TABLE IF NOT EXISTS assets (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255))");
}

async function listAssets() {
    await createAssetsTable();
    const assets = await dbTransaction("all", "SELECT * FROM assets");
    return assets;
}

async function createAsset(name) {
    await createAssetsTable();

    try {
        await dbTransaction("run", `INSERT INTO assets (name) VALUES ('${name}')`);   
    } catch (error) {
        return { error };
    }

    return { message: "SUCCESS" };
}

async function deleteAsset(assetId) {
    await createAssetsTable();

    try {
        await dbTransaction("run", `DELETE FROM assets WHERE id=${assetId}`);
    } catch (error) {
        return { error };
    }
    
    return { message: "SUCCESS" };
}

module.exports.assets = { listAssets, createAsset, deleteAsset };