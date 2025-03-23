import prisma from "./configuration/db";
import dotenv from "dotenv";
import { app } from "./router";

// Load environment variables
dotenv.config();

// Fix BigInt to JSON serialization
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return Number(this);
};

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
// Graceful shutdown for Prisma
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Process terminated.");
  await prisma.$disconnect();
  process.exit(0);
});
