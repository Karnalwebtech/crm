import app from "./app";
import cluster from "cluster";
import os from "os";
import dotent from "dotenv";
import { connectRedis } from "./loaders/redis";
dotent.config();
connectRedis();
const port = process.env.PORT || 9000
const numCPUs = os.cpus().length;
// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   // Listen for dying workers and restart them
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     cluster.fork(); // Replace the dead worker
//   });
// } else {
//   const start_server = async () => {
//     const PORT = process.env.PORT || 7000;
//     await new Promise<void>((resolve, rejects) => {
//       app.listen(PORT, (err?: Error) => {
//         if (err) {
//           console.log(err);
//           return rejects(err);
//         }
//         console.log(`Worker ${process.pid} is listening on port ${PORT}`);
//         resolve();
//       });
//     });
//   };
//   start_server()
//     .then(() => {
//       console.log(`Server started successfully in worker ${process.pid}`);
//     })
//     .catch((err?: Error | undefined) => {
//       console.error(
//         `Failed to start server in worker ${process.pid}: ${err?.message}`
//       );
//     });
// }

app.listen(port, (err?: Error) => {
  if (err) {
    console.log(err);
  }
  console.log(`Worker ${process.pid} is listening on port ${process.env.PORT}`);
});
