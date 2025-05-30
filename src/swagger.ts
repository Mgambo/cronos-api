import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cronos API Documentation",
      version: "1.0.0",
      description: "Documentation for Cronos API endpoints",
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-app-key",
          description: "API key for authentication",
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
    // servers: [
    //   {
    //     url: "/api/v1",
    //     description: "API v1",
    //   },
    //   {
    //     url: "/",
    //     description: "API",
    //   },
    // ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
