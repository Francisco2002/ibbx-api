const { dbTransaction } = require(".");

async function createCollectTable() {
    await dbTransaction("run", "PRAGMA foreign_keys=ON");
    await dbTransaction("run", "CREATE TABLE IF NOT EXISTS collects (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, value DECIMAL(8, 2), sensorId INTEGER NOT NULL, CONSTRAINT fk_collect_sensor FOREIGN KEY (sensorId) REFERENCES sensors(id) ON DELETE CASCADE)");
}

async function listCollects(assetId, sensorId) {
    await createCollectTable();

    const sensor = await dbTransaction("all", `SELECT * FROM sensors WHERE id=${sensorId}`);
    const asset = await dbTransaction("all", `SELECT * FROM assets WHERE id=${assetId}`);
    const collects = await dbTransaction("all", `SELECT * FROM collects WHERE sensorId=${sensorId} ORDER BY date DESC`);

    sensor[0]["asset"] = asset[0];
    sensor[0]["collects"] = collects;

    return sensor[0];
}

async function createCollect(date, value, sensorId) {
    await createCollectTable();

    try {
        await dbTransaction("run", `INSERT INTO collects (date, value, sensorId) VALUES ('${date}', ${value}, ${sensorId})`);   
    } catch (error) {
        return { error };
    }

    return { message: "SUCCESS" };
}

async function deleteCollect(sensorId, date) {
    await createCollectTable();

    try {
        console.log(sensorId, date);
        await dbTransaction("run", `DELETE FROM collects WHERE sensorId=${sensorId} AND date="${date}"`);
    } catch (error) {
        return { error };
    }
    
    return { message: "SUCCESS" };
}

module.exports.collects = { listCollects, createCollect, deleteCollect };