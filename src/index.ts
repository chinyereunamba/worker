import { processQueue } from "./notifications/process-queue";

console.log("Worker started");

setInterval(async () => {
  await processQueue();
}, 60_000);
