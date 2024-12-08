import app from "./app";
import cluster from "cluster";
import os from "os";
import dotent from "dotenv";
import { connectRedis } from "./loaders/redis";
dotent.config();
connectRedis();
const PORT = process.env.PORT || 8000;
const numCPUs = os.cpus().length;
if (cluster.isMaster) {
  // Listen for dying workers and restart them
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Replace the dead worker
  });
} else {
  app.listen(PORT, (err?: Error) => {
    if (err) {
      console.log(err);
    }
    console.log(
      `Worker ${process.pid} is listening on port ${process.env.PORT}`
    );
  });
}
