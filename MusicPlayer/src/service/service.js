class Router {
    constructor( id ) {
        this.id = id;
        this.express =require("express");
        this.app = this.express();
        this.portConfig = require("../config/portConfig");
        this.htmlConfig = require("../config/htmlConfig");
    }
    serviceReady() {
        this.app.use(this.express.static(this.htmlConfig.htmlTemplate));
        this.app.listen(this.portConfig.port,()=>{
            console.log(`Port: ${this.portConfig.port} Service Start`);
        });
    }
    runFunctoin() {
        this.app.get("/musicPlayer/",(req,res)=>{
            const runMusic = require("../run/runMusic");
            runMusic(req,res);
        });
        
    }
    run() {
        this.serviceReady();
        this.runFunctoin();
    }
}

const service = new Router("service");
module.exports = service;
