import express from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = express.Router();

// rotas para acoes usuarios
router
    //.post("/api/cadastro", UsuarioController.cadastrarUsuario)
    .post("/api/entrar", UsuarioController.loginUsuario)
    
export default router;