const express = require('express')
const swagger = require('swagger-ui-express')
const app = express()
const port = 8080
swaggerDoc = require('./swagger.json')
app.use('/swagger-ui', swagger.serve, swagger.setup(swaggerDoc));
app.listen(port, () => {console.log("Swagger is running on port "+port)})