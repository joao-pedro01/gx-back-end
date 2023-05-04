import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

// rotas para acoes usuarios
router
.post("/api/usuarios/logout", UsuarioController.logout)
.get("/api/usuarios/", UsuarioController.listarUsuarios)
.post("/api/usuarios/cadastro", UsuarioController.cadastrarUsuario)
.post("/api/usuarios/entrar", UsuarioController.loginUsuario)

export default router;