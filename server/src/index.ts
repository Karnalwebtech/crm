import app from "./app";
import dotenv from "dotenv";
import { connectRedis } from "./loaders/redis";


dotenv.config();
connectRedis();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Worker is listening on port ${PORT}`);
});