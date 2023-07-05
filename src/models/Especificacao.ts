//import conn from "../config/dbConnect.js";
import Especificacao from "../classes/Especificacao";
import Categoria from "../classes/Categoria";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function listarEspecificacoes(especificacao: Especificacao) {
    let whereClause:any;
    const id = especificacao.getId();
    const objEspecificacoes: Especificacao[] = [];

    // Verificar se o valor de id é válido (não é NaN)
    if (!isNaN(id)) {
        whereClause = { id:  id };
    }else {
        if(especificacao.getMarca()){
            whereClause.nome = {contains: especificacao.getMarca()};
        }
        if(especificacao.getModelo()){
            whereClause.nome = {contains: especificacao.getModelo()};
        }
        if(especificacao.getStatus()){
            whereClause.nome = {contains: especificacao.getStatus()};
        }
        if(especificacao.getSaldo()){
            whereClause.nome = {contains: especificacao.getSaldo()};
        }
        /*
            for (const key in params) {
                if(key === "is_active") {
                    whereClause[key] = params && params[key];
                } else if(key === "saldo"){
                    params.saldo = parseInt(params.saldo);
                    whereClause[key] = params && params[key];
                }else {
                    whereClause[key] = {contains: params && params[key]};
                    // Verifica se params.nome existe antes de usar o operador contains
                    if (params && params[key]) {
                        whereClause[key].contains = `%${params[key]}%`;
                    }
                }
            }
        */
    }

    const especificacoes =  await prisma.especificacao.findMany({
        select: {
            id: true,
            saldo: true,
            is_active: true,
            marca: true,
            modelo: true,
            atrib1: true,
            atrib2: true,
            atrib3: true,
            atrib4: true,
            atrib5: true,
            atrib6: true,
            sku: true,
            fk_categorias_id: true,
            categoria: true
        },
        where: whereClause
    });

    especificacoes.forEach((especificacao) => {
        const objCat: Categoria = new Categoria(1);
        objCat.setId(especificacao.categoria.id);
        objCat.setStatus(especificacao.categoria.is_active);
      
        const obj: Especificacao = new Especificacao(objCat, especificacao.is_active);
        obj.setCategoria(objCat);
        obj.setId(especificacao.id);
        obj.setAtrib1(especificacao.atrib1);
        obj.setAtrib2(especificacao.atrib2);
        obj.setAtrib3(especificacao.atrib3);
        obj.setAtrib4(especificacao.atrib4);
        obj.setAtrib5(especificacao.atrib5);
        obj.setAtrib6(especificacao.atrib6);
      
        objEspecificacoes.push(obj);
      });
    //Especificacao.setId(especificacao[0].id);
    //dd(objEspecificacoes[1].getId())


    await prisma.$disconnect();
    return objEspecificacoes;
}

// function que faz a consulta de todos pecas


/*
    export const listarEspecificacoes = async(params) => {
    if(params == undefined){
        return await conn.select('*').table('especificacoes');
    }else {
        return await conn
        .select('*')
        .table('especificacoes')
        .where('especificacoes.is_active', params.is_active)
        .innerJoin('categorias', 'especificacoes.fk_categorias_id', 'categorias.id');
    }
    }

    export const BuscaEspespecificacao = async(query) => {
    return await conn
    .select('marca', 'modelo', 'is_active', 'saldo')
    .table('especificacoes')
    .where(query);
    }

    export const especificacao = async(id) => {
    return await conn.select('marca', 'modelo', 'is_active', 'saldo').table('especificacoes').where('id', id);
    }


    export const cadastrarEspecificacao = async(dados) => {
    return await conn
    .insert(dados)
    .into('especificacoes')
    }

    export const alterarQuantidade = async(id, value) => {
        return await conn.update({ saldo: value }).where({id: id}).table('especificacoes');
    }

    export const desativarEspecificacao = async(id) => {
        return await conn.where({ id: id }).update({ is_active: false }).table('especificacoes');
    }

*/