const { dbTransaction } = require(".");

async function createSensorsTable() {
    await dbTransaction("run", "CREATE TABLE IF NOT EXISTS sensors (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), assetId INTEGER NOT NULL, FOREIGN KEY(assetId) REFERENCES assets(id))");
}

async function listSensors(assetId) {
    await createSensorsTable();
    const sensors = await dbTransaction("all", `SELECT A.name as assetName, S.* FROM assets as A INNER JOIN sensors as S ON A.id=S.assetId WHERE S.assetId=${assetId}`);

    console.log("ABC > ", sensors);

    return sensors;
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