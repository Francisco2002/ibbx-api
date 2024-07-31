const sqlite = require("sqlite3");
const db = new sqlite.Database('db/ibbx-challenge.sqlite');

const dbTransaction = (command, sql) => new Promise((resolve, reject) => {
    db.serialize(() => {
        switch(command) {
            case "run":
                db.run(sql, error => {
                    if(error) reject(error);
                    else resolve("SUCCESS");
                })
                break;
            case "all":
                db.all(sql, (error, rows) => {
                    if(error) reject(error);
                    else resolve(rows);
                })
                break;
        }
    })
  });

module.exports = { dbTransaction };