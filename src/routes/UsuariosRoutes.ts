import express from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/usuarios", UsuarioController.listarUsuarios)
    //.post("/api/logout", UsuarioController.logout)
    //.get("/api/usuarios", UsuarioController.Logar)
    .post("/api/cadastro", UsuarioController.cadastrarUsuario)
    .post("/api/entrar", UsuarioController.loginUsuario)
    // .post("/api/validar-token", UsuarioController.validarToken)
export default router;