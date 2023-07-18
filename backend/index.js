const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRouter = require('./routers/todoRouters');

const app = express();
dotenv.config();

const connectToMongoDB = async() => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect MongoDB:', error);
    }
  }
  
  connectToMongoDB();

app.use(express.json());
app.use(cors());
app.use('/api/v1/todo', todoRouter)

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});