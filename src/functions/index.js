const createAsset = require("./assets/create");
const deleteAsset = require("./assets/delete");
const listAsset = require("./assets/list");

const createCollect = require("./collects/create");
const deleteCollect = require("./collects/delete");
const listCollect = require("./collects/list");

const createSensor = require("./sensors/create");
const deleteSensor = require("./sensors/delete");
const listSensor = require("./sensors/list");

module.exports.assets = { list: listAsset, create: createAsset, delete: deleteAsset };
module.exports.sensors = { list: listSensor, create: createSensor, delete: deleteSensor };
module.exports.collects = { list: listCollect, create: createCollect, delete: deleteCollect }