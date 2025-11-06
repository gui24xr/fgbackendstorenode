import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as tenantRouter } from "./routes/tenant.routes.js";


const COOKIE_SIGN = process.env.COOKIE_SIGN || 'firmascookieserver'
const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser(COOKIE_SIGN));

server.use(
  cors({
    origin: "http://localhost:8081/", // Especifica el origen permitido
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permite que las cookies sean enviadas y recibidas
  })
);

server.use('/api',tenantRouter)



export default server