//import conn from "../config/dbConnect.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { dd } from "../controllers/functions.js";


export async function listarEspecificacoes(params) {
    let whereClause = {};
    const id = parseInt(params.id); // Converter para inteiro

    // Verificar se o valor de id é válido (não é NaN)
    if (!isNaN(id)) {
        whereClause = { id:  id };
    }else {
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
    }

    const especificacao = await prisma.especificacao.findMany({
        select: {
            id: true,
            saldo: true,
            is_active: true,
            marca: true,
            modelo: true,
            saldo: true,
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

    await prisma.$disconnect();
    return especificacao;
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