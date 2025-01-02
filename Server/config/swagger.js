"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
    },
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: { type: Number },
                    uuid: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    firstname: { type: 'string' },
                    lastname: { type: 'string' },
                    sex: { type: 'string' },
                    street: { type: 'string' },
                    postal_code: { type: 'string' },
                    city: { type: 'string' },
                    country: { type: 'string' }
                }
            }
        },
    },
    apis: ['./router/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function setupSwagger(app) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
