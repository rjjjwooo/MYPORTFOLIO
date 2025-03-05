const runMusic = (req,res)=>{
    const mysql = require("mysql");
    const fs = require("fs");
    const db = require("../config/dbConfig");
    const sqlHandler = mysql.createConnection({
        host: db.host,
        user:db.user,
        password:db.password,
        database:db.database
    });
    sqlHandler.connect((err)=>{
        if(err) throw err;
        console.log("DB CONNECT!");
        sqlHandler.query(db.selectAll,(err,data)=>{
            if(err) throw err;
            const jsonData = JSON.stringify(data,null,2);
            fs.writeFile("./htmlTemplate/jsonTemplate/music.json",jsonData,(err)=>{
                if(err) throw err;
                console.log("SUCESS JSON FILE");
            });
            //console.log(jsonData);
        });
    });
    fs.readFile("./htmlTemplate/html/portfolio.html",'utf-8',(err,data)=>{
        if(err) throw err;
        try{
            //console.log(data);
            res.send(data);
        }catch(err){
            console.log("ERROR");
        }
    });
}

module.exports = runMusic;
