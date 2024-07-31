const { assets, sensors, collects } = require("./functions");

module.exports.main = async (event) => {
  const [method, route] = event.routeKey.split(" ");
  let response = { statusCode: 404 };

  if(method == "GET") {
    switch(route) {
      case "/assets":
        response = assets.list();
        break;
      case "/assets/{assetId}/sensors":
        response = sensors.list(event.pathParameters.assetId);
        break;
      case "/assets/{assetId}/sensors/{sensorId}":
        response = collects.list(event.pathParameters.sensorId);
        break;
    }
  } else if(method == "POST") {
    switch(route) {
      case "/assets":
        response = assets.create(JSON.parse(event.body));
        break;
      case "/assets/{assetId}/sensors":
        response = sensors.create({ ...event.pathParameters, ...JSON.parse(event.body) });
        break;
      case "/assets/{assetId}/sensors/{sensorId}":
        response = collects.create({ ...event.pathParameters, ...JSON.parse(event.body) });
        break;
    }
  } else if(method == "DELETE") {
    switch(route) {
      case "/assets/{assetId}":
        response = assets.delete(event.pathParameters.assetId);
        break;
      case "/assets/{assetId}/sensors/{sensorId}":
        const { sensorId } = event.pathParameters;
        
        if(event.queryStringParameters) {
          const { date } = event.queryStringParameters;
          response = collects.delete(sensorId, date);
        } else {
          response = sensors.delete(sensorId);
        }
        
        break;
    }
  }

  return response;
};
