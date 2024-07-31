const { dbTransaction } = require(".");

async function createCollectTable() {
    await dbTransaction("run", "CREATE TABLE IF NOT EXISTS collects (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, value DECIMAL(8, 2), sensorId INTEGER NOT NULL, FOREIGN KEY(sensorId) REFERENCES sensors(id))");
}

async function listCollects(sensorId) {
    await createCollectTable();
    const collects = await dbTransaction("all", `SELECT S.name as sensorName, A.id as assetId, A.name as assetName, C.* FROM sensors as S INNER JOIN assets as A ON S.assetId=A.id INNER JOIN collects as C ON C.sensorId=S.id WHERE C.sensorId=${sensorId}`);
    return collects;
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
        await dbTransaction("run", `DELETE FROM collects WHERE sensorId=${sensorId} AND date=${date}`);
    } catch (error) {
        return { error };
    }
    
    return { message: "SUCCESS" };
}

module.exports.collects = { listCollects, createCollect, deleteCollect };