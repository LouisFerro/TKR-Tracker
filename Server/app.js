"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const user_routes_1 = require("./routes/user-routes");
const app = (0, express_1.default)();
const port = config_1.default.get('appConfig.port');
const origin = config_1.default.get('appConfig.origin');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: origin }));
app.use('/users', user_routes_1.userRouter);
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    res.status(500).send('Something broke!  ' + err);
}
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
