
import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Level Up Gamer API',
            version: '1.0.0',
            description: 'API documentation for Level Up Gamer e-commerce platform',
        },
        servers: [
            {
                url: 'http://localhost:3006/api',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/**/*.ts'], // Path to the API docs
};

export default swaggerOptions;
