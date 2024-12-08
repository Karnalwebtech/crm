import app from "./app";
import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";
import { connectRedis } from "./loaders/redis";

// Load environment variables
dotenv.config();

// Connect to Redis
connectRedis();

const PORT = process.env.PORT || 9000;
const numCPUs = os.cpus().length;

// Master process logic
if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart workers if they die
  cluster.on("exit", (worker, code, signal) => {
    console.warn(`Worker ${worker.process.pid} exited (code: ${code}, signal: ${signal})`);
    console.log("Starting a new worker...");
    cluster.fork();
  });
} else {
  // Worker process logic
  const startServer = async () => {
    try {
      app.listen(PORT, () => {
        console.log(`Worker process ${process.pid} is listening on port ${PORT}`);
      });
    } catch (error:any) {
      console.error(`Failed to start server in worker ${process.pid}: ${error.message}`);
    }
  };

  startServer();
}

app.listen(PORT, (err?: Error) => {
  if (err) {
    console.log(err);
  }
  console.log(`Worker ${process.pid} is listening on port ${process.env.PORT}`);
});
