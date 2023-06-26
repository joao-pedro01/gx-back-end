import { buscaUsuario, cadastrarUsuario, listarUsuarios, loginUsuario } from '../models/Usuarios';
import md5 from "md5";
import jwt from "jsonwebtoken";
import jwtr from 'jwt-redis';
import bcrypt from "bcryptjs";
import { dd } from './functions.js';

// class responsavel por todas acoes do usuario
class UsuarioController {
    // function que retorna os usuarios
    static listarUsuarios = (req, res) => {
        listarUsuarios().then((usuarios) => {
            res.status(200).json(usuarios);
        });
    }

    static cadastrarUsuario = (req, res) => {
        var nome = req.body.nome;
        var senha = req.body.senha;
        let data = new Date();
        let dataFormatada = data.getFullYear() + "/" + ((data.getMonth() + 1)) + "/" + ((data.getDate() ));

        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(senha, salt);
        const hash = md5(senha);

        var query = {
            nome: nome,
            senha: hash,
            criado: dataFormatada
        };

        buscaUsuario({"nome": nome}).then((usuario) => {
            //dd(usuario)
            cadastrarUsuario(query).then((usuario) => {
                res.status(200).send({message: 'Usuario cadastrado com sucesso'});
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao cadastrar usuario`});
            });
        })
    }

    static loginUsuario = (req, res) => {
        var usuario = req.body.usuario;
        var senha = req.body.senha;
        var hash = md5(senha);
        var query = {
            nome: usuario,
            senha: hash
        }

        loginUsuario(query).then((usuario) => {
            if(usuario == undefined) {
                res.status(400).json({ erro: true, message: "Usuário ou a senha incorreta!" });
            }else {
                let dados = {
                    id: usuario.id,
                    nome: usuario.nome,
                }
                var token = jwt.sign(dados, process.env.SECRET, {
                    expiresIn: 1200 //20 min
                    // expiresIn: 60 //1 min
                    // expiresIn: '7d' // 7 dia
                });
                res.json({erro: false, message: "Login realizado com sucesso!", token});
            }
        });
    }

    static logout = (req, res) => {
        res.json({ auth: false, token: null });
    }

    static validarToken = (req, res) => {
        const token = req.headers['x-access-token'];

        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        // Retorna true indicando autenticação bem-sucedida
        res.json({ auth: true });
        });
    }
}

export default UsuarioController;