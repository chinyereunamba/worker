import { processQueue } from "./notifications/process-queue";

// console.log("Worker started");

// setInterval(async () => {
//   await processQueue();
// }, 60_000);

console.log("Worker started");

async function runWorkerOnce() {
  try {
    await processQueue(); // process all pending notifications once
    console.log("Worker finished processing queue");
  } catch (err) {
    console.error("Error processing queue:", err);
  } finally {
    process.exit(0); // ensures Bun exits cleanly
  }
}

runWorkerOnce();

