import express from "express";
import { Application } from "express";
//import swaggerUi from "swagger-ui-express";
//import swaggerDocs from "../../helpers/swagger.json" assert { type: "json" };
import usuarios from "./UsuariosRoutes";
import categoria from "./CategoriaRoutes";
import especificacao from "./EspecificacoesRoutes";
import { /*dd,*/ verifyJWT } from "../controllers/functions";

const routes = (app: Application) => {
    // rotas principais
    app.route('/').get((req, res) => {
        res.status(200).json({titulo: "Teste"});
    });
    app.route('/api/test').get((req,res) => {
        res.status(200).json({test: 1});
    });
    //app.use('/api/documentacao', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    // rotas de arquivos externos
    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', '*');
        res.append('Access-Control-Allow-Headers', '*');
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    });
    app.use(
        express.json(),
        //usuarios,
        //verifyJWT,
        categoria,
        //especificacao
    );
};
export default routes;