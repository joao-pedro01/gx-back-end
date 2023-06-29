import express from "express";
import CategoriaController from "../controllers/CategoriaController";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/categorias/", CategoriaController.listarCategorias)
    .post("/api/categorias", CategoriaController.cadastrarCategoria)
    .delete("/api/categorias/:id", CategoriaController.desativarCategoria)

export default router;