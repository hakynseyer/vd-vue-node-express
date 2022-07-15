import express, { Application } from "express";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { sequelize } from "./database";
// import "./models/ranks";
// import "./models/users";
// import "./models/providers";
// import "./models/materials";

import loginRoutes from "./views/login/login";
import rankRoutes from "./views/rank/rank";
import userRoutes from "./views/user/user";
import providerRoutes from "./views/provider/provider";
import materialRoutes from "./views/material/material";

// Init
const app: Application = express();

// Settings
app.set("port", process.env.HOST_BACKEND_PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database

// Routes
app.use("/login", loginRoutes);
app.use("/rango", rankRoutes);
app.use("/usuario", userRoutes);
app.use("/proveedor", providerRoutes);
app.use("/material", materialRoutes);

// Starting Server
async function init() {
  try {
    await sequelize.sync({ force: false });
    console.log("MariaDB cargado");

    app.listen(app.get("port"), (): void => {
      console.log(`Servidor arrancado en puerto ${app.get("port")}`);
    });
  } catch (e) {
    console.error("No se pudo conectar a la base de datos", e);
  }
}

init();
