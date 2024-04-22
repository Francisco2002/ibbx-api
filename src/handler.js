module.exports.main = async (event) => {
  const [method, route] = event.routeKey.split(" ");

  let response = { statusCode: 404 };

  if (route === "/example" && method === "GET") {
    const example = require("./functions/example");
    response = await example();
  } 
  // else if (route === "/example2" && method === "POST") {
  //   const example = require("./functions/example2");
  //   response = await example();
  // }

  return response;
};
