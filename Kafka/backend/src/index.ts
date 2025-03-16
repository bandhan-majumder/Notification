// index.js
import express from "express";
import * as dotenv from "dotenv";
import { addTodo, getTodos } from "./helper/db";
import cors from "cors";
import { connectProducer, sendMessage } from "./kafka/producer";
import { startConsumer } from "./kafka/consumer";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// Connect to Kafka producer when the app starts
connectProducer().catch(console.error);

// Start Kafka consumer, must be a seperate process for production
try {
    startConsumer()
} catch(e){
    console.log("Error is: ", e)
}

app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/get-todos', async (req, res) => {
  const resp = await getTodos();
  res.send({
    todos: resp
  });
});

app.post('/add-todo', async (req, res) => {
  const { todo } = req.body;
  console.log(todo);
  
  // Add database operation
  const resp = await addTodo({title: todo});
  console.log(resp);
  
  // Send message to Kafka
  await sendMessage('todoNotifications', {
    id: resp.id,
    title: todo,
    createdAt: new Date()
  });
  
  res.send('Todo added and notification sent');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
