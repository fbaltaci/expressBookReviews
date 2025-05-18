const express = require('express');
const session = require('express-session');
const authMiddleware = require('./middlewares/auth');

const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/books.routes');
const { swaggerUi, swaggerSpec } = require('./swagger/swaggerConfig');

const app = express();
app.use(express.json());

app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

app.use("/customer/auth/*", authMiddleware);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/customer", authRoutes);
app.use("/", bookRoutes);

const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('💤 Server closed gracefully on SIGTERM');
  });
});

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
