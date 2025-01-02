import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

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

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}