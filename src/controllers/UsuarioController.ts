import path from 'path';
import axios from 'axios';
import jwt from "jsonwebtoken";
import Usuario from '../classes/Usuario';
import { buscaUsuario, cadastrarUsuario, listarUsuarios } from '../models/Usuarios';
import ErrorLog from '../classes/errorLog';

// class responsavel por todas acoes do usuario
class UsuarioController {
    // function que retorna os usuarios
    static listarUsuarios = (req: any, res: any) => {
        listarUsuarios().then((usuarios) => {
            res.status(200).json(usuarios);
        });
    }

    static cadastrarUsuario = (req: any, res: any) => {
        let objUsuario: Usuario = new Usuario(req.body.usuario, req.body.senha);
        objUsuario.loginUsuario();

        buscaUsuario(objUsuario).then((usuario) => {
            if(usuario) {
                return res.status(400).send({message: 'Usuario já cadastrado'});
            }

            cadastrarUsuario(objUsuario).then((usuario) => {
                throw new Error('Erro teste');
                res.status(200).send({message: 'Usuario cadastrado com sucesso'});
            }).catch(err => {
                let logError = new ErrorLog(path.join(__dirname, '../../logs/errorLog.json'));
                logError.saveLog(err, objUsuario.getId(), objUsuario.getNome());
                console.log(err);
                res.status(500).send({message: `falha ao cadastrar usuario`});
            });
        })
    }

    static loginUsuario = (req: any, res: any) => {
        let objUsuario: Usuario = new Usuario(req.body.usuario, req.body.senha);

        axios.post(`${process.env.API_URL ?? ''}/login`, {
            username: objUsuario.getNome(),
            password: objUsuario.getSenha()
        }).then(response => {
            console.log(response.data)
            if (response.data == true) {
                var token = jwt.sign({
                    id: objUsuario.getId(),
                    nome: objUsuario.getNome(),
                }, process.env.SECRET ?? '', {
                expiresIn: 14400 //4h
                // expiresIn: 60 //1 min
                // expiresIn: '7d' // 7 dia
            });

                return res.json({erro: false, message: "Login realizado com sucesso!", token});
            }
            
            return res.status(400).json({ erro: true, message: "Usuário ou a senha incorreta!" });
        }).catch(error => {
            const logs = new ErrorLog(path.join(__dirname, '../../logs/errorLog.json'));
            logs.saveLog(error, 0, '');
            return res.status(500).json({ erro: true, message: "Erro ao validar usuário!" });
        });
    }

    static logout = (req: any, res: any) => {
        res.json({ auth: false, token: null });
    }
}

export default UsuarioController;