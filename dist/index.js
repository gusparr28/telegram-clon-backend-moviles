"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("./database");
// starting the server
app_1.default().httpServer.listen(app_1.default().port, () => {
    console.log('server listening on port', app_1.default().port);
});
// app.listen(app.get('port'), () => {
//     console.log('server listening on port', app.get('port'));
// });
