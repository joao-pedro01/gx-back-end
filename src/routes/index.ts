import express, { Request, Response, NextFunction } from "express";
import { Application } from "express";
//import swaggerUi from "swagger-ui-express";
//import swaggerDocs from "../../helpers/swagger.json" assert { type: "json" };
import usuarios from "./UsuariosRoutes";
import usuariosPublic from "./UsuariosRoutesPublic";
import categoria from "./CategoriaRoutes";
import especificacao from "./EspecificacoesRoutes";
import jwt from "jsonwebtoken";
import ErrorLog from "../classes/errorLog";
import path from "path";
//import { /*dd,*/ verifyJWT } from "../controllers/functions";

const routes = (app: Application) => {
    // Middleware de autenticação
    const middlewareAutenticacao = (req: any, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });
        jwt.verify(token, process.env.SECRET ?? '', function(err: any, decoded: any) {
            if (err) {
                const logs = new ErrorLog(path.join(__dirname, '../../logs/errorLog.json'));
                if (err.name === 'TokenExpiredError') {
                    //logs.saveLog(err, decoded.userId, '');
                    return res.status(401).json({ auth: false, message: 'Token expirado.' });
                }

                logs.saveLog(err, decoded.userId, '');
                return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
            }
            
            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            
            // Se o token for válido, passa para o próximo middleware
            next();
        });
    };

    // rotas principais
    app.route('/').get((req: Request, res: Response) => {
        res.status(200).json({titulo: "Teste"});
    });
    app.route('/api/test').get((req: Request,res: Response) => {
        res.status(200).json({test: 1});
    });
    //app.use('/api/documentacao', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    // rotas de arquivos externos
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.append('Access-Control-Allow-Origin', '*');
        res.append('Access-Control-Allow-Headers', '*');
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    });
    app.use(
        express.json(),
        usuariosPublic,
        express.urlencoded({ extended: true }),
        middlewareAutenticacao,
        usuarios,
        categoria,
        especificacao
    );
};
export default routes;