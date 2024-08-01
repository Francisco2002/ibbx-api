const { dbTransaction } = require(".");

async function createSensorsTable() {
    await dbTransaction("run", "PRAGMA foreign_keys=ON");
    await dbTransaction("run", "CREATE TABLE IF NOT EXISTS sensors (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), assetId INTEGER NOT NULL, CONSTRAINT fk_sensor_asset FOREIGN KEY(assetId) REFERENCES assets(id) ON DELETE CASCADE)");
}

async function listSensors(assetId) {
    await createSensorsTable();

    const asset = await dbTransaction("all", `SELECT * FROM assets WHERE id=${assetId} LIMIT 1`);
    const sensors = await dbTransaction("all", `SELECT * FROM sensors WHERE assetId=${assetId}`);

    asset[0]["sensors"] = sensors || [];

    return asset[0];
}

async function createSensor(name, assetId) {
    await createSensorsTable();

    try {
        await dbTransaction("run", `INSERT INTO sensors (name, assetId) VALUES ('${name}', ${assetId})`);   
    } catch (error) {
        return { error };
    }

    return { message: "SUCCESS" };
}

async function deleteSensor(sensorId) {
    await createSensorsTable();

    try {
        await dbTransaction("run", `DELETE FROM sensors WHERE id=${sensorId}`);
    } catch (error) {
        return { error };
    }
    
    return { message: "SUCCESS" };
}

module.exports.sensors = { listSensors, createSensor, deleteSensor };