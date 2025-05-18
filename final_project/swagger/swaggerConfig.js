const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express Book Reviews API',
    version: '1.0.0',
    description: 'API documentation for the Express Book Reviews project',
  },
  servers: [{ url: 'http://localhost:5000' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Book: {
        type: 'object',
        properties: {
          author: { type: 'string', example: 'Jane Austen' },
          title: { type: 'string', example: 'Pride and Prejudice' },
          reviews: {
            type: 'object',
            additionalProperties: { type: 'string' },
            example: {
              user1: "A timeless classic.",
              user2: "Beautifully written."
            }
          }
        }
      },
      Review: {
        type: 'object',
        properties: {
          review: { type: 'string', example: 'Great read, highly recommend.' }
        }
      },
      UserCredentials: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', example: 'johndoe' },
          password: { type: 'string', example: '1234secure' }
        }
      },
      MessageResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Success' }
        }
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
