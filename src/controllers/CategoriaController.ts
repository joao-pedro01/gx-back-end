import Categoria from '../classes/Categoria';
import {
    cadastrarCategoria,
    countCategoria,
    desativarCategoria,
    listarCategorias
} from '../models/Categoria';
import { /*dd,*/ removeNull, removeUndefined } from './functions';

// class responsavel por todas acoes das pecas
class CategoriasController {
    /**
    * Lista todas categorias.
    *
    * @method GET
    * @param status : boolean
    * @param categoria : string
    * @param tipo : string
    * @return (200) - objeto equipamentos
    * @return (500) - erro interno servidor
    * 
    * caso o query exista e esteja correto irá retornar um objeto query ["is_active"] => boolean().
    * caso o status seja true || false, vai fazer select com where, se for bem sucedido irá retornar status 200, caso contrário erro status 500
    * caso contrário irá executar select, mas sem query, as respostas são as mesmas, o que muda é o filtro do status.
    */
    static listarCategorias = (req: any, res: any) => {
        let objCat = new Categoria(1);
        objCat.setId(req.query.id);
        objCat.setNome(req.query.nome);
        objCat.setTipo(req.query.tipo);
        objCat.setStatus(req.query.status);
        //removeUndefined();

        listarCategorias(objCat).then((categorias: Categoria[]) => {
            removeNull(categorias);
            // implementar função para buscar especificacoes
            res.status(200).json(categorias);
        }).catch((err: any) => {
            console.error(err);
            res.status(500).send({message: `falha ao listar categorias`});
        });
    }

    /**
    * Cadastra categoria.
    *
    * @method POST
    * @param nome
    * @param tipo
    * @return (200) - message
    * @return (405) - dados solicitados não recebido da forma correta
    * @return (422) - já existe no banco de dados e não pode repetir
    * @return (500) - erro interno servidor
    * 
    * caso não receber os dados solicitador irá retornar 405
    * caso contrário irá criar var para o select e executar, se o numero do categoria já se encontrar na base de dados irá retornar 422
    * caso contrário irá executar o insert e retornar 200, caso der erro irá retornar 500
    */
    static cadastrarCategoria = (req: any, res: any) => {
        let objCat = new Categoria(1);
        objCat.setNome(req.body.nome);
        objCat.setTipo(req.body.tipo);
        let atributos = [
            req.body.atrib1_cat,
            req.body.atrib2_cat,
            req.body.atrib3_cat,
            req.body.atrib4_cat,
            req.body.atrib5_cat,
            req.body.atrib6_cat
        ];
        objCat.setAtributos(atributos);
        
        countCategoria(objCat).then((isCadastrado: number) => {
            if(isCadastrado > 0) {
                res.status(422).send({message: `${objCat.getNome()} já esta cadastrado`});
            }else {
                cadastrarCategoria(objCat).then(() => {
                    res.status(200).send({message: `${objCat.getNome()} cadastrado com sucesso`, objCat})
                }).catch(((err: any) => {
                    console.error(err);
                    res.status(500).send({message: `falha ao cadastrar categoria`});
                }));
            }
        }).catch(((err: any) => {
            console.error(err);
            res.status(500).send({message: `falha ao listar para cadastra categoria`});
        }));
    }

    /**
    * Desativar categoria.
    *
    * @method DELETE
    * @param id
    * @return (200) - message
    * @return (404) - NOT FOUND / Valor solicitado não encotrado
    * @return (405) - message
    * @return (500) - erro interno servidor
    * 
    * irá fazer o select para verificar se a atributo informado via GET existe
    * caso não existir ira retornar 404 caso contrário irá verificar se a atributo já se encontra desativado caso a atributo estar inativo irá retornar 405
    * caso passar por todas etapas irá criar variavel de update enviando o valor caso ok retorna 200 caso contrário 500
    */
     static desativarCategoria = (req: any, res: any) => {
        let objCat = new Categoria(1);
        objCat.setId(req.params.id);

        listarCategorias(objCat).then((categoria: any) => {// é para retornar objeto
            // se a categoria nao existir vai entrar no if
            if(categoria.length == 0) {
                res.status(404).json("Categoria não existe");
            }else if(categoria[0].is_active == false) {
                res.status(405).json("Categoria já esta desativada");
            }else {
                // caso passar por todos os if ira desativar a categoria
                desativarCategoria(objCat.getId(), false).then(() => {
                    res.status(200).json(`${categoria[0].nome} desativado(a) com sucesso`);
                }).catch((err: any) => {
                    console.log(err);
                    res.status(500).send({message: `falha ao desativar categoria`});
                });
            }
        });
    }
}

export default CategoriasController;