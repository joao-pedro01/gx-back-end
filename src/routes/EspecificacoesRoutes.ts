import express from "express";
import EspecificacoesController from "../controllers/EspecificacoesController";

const router = express.Router();

router
    .get("/api/especificacoes/", EspecificacoesController.listarEspecificacoes)
    .get("/api/especificacoes/:id",EspecificacoesController.especificacao)
    .post("/api/especificacoes/", EspecificacoesController.cadastrarEspecificacao)
    .put("/api/especificacoes/:id", EspecificacoesController.alterarQuantidade)
    .delete("/api/especificacoes/:id", EspecificacoesController.desativarEspecificacoes)

export default router;