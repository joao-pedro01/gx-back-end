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
    if(isNaN(id) || id != 0) {
        whereClause = { id:  id };
    }else {
        
        //if(especificacao.getSku()){
        //    console.log( JSON.stringify(especificacao) );
        //    console.log('sku: ' + especificacao.getSku());
        //    whereClause.sku = { contains: especificacao.getSku().toString() }; // Correção aqui
        //    console.log(whereClause);
        //    process.exit();
        //}else {
//
        //    if(especificacao.getMarca()){
        //        console.log(especificacao.getMarca())
        //        whereClause.marca = {contains: especificacao.getMarca()};
        //    }
        //    if(especificacao.getModelo()){
        //        whereClause.modelo = {contains: especificacao.getModelo()};
        //    }
        //    if(especificacao.getStatus()){
        //        whereClause.is_active = {contains: especificacao.getStatus()};
        //    }
        //    if(especificacao.getSaldo()){
        //        whereClause.saldo = especificacao.getSaldo();
        //    }
        //}
        //
        
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
        where: {
            //OR: [
            //    { marca: { contains: especificacao.getMarca() || undefined } },
            //    { modelo: { contains: especificacao.getModelo() || undefined } },
            //    { saldo: especificacao.getSaldo() || undefined },
            //],
            AND: [
                { is_active: especificacao.getStatus() || undefined },
                { sku: especificacao.getSku() || undefined },
                { id: especificacao.getId() || undefined },
            ],
        },
    });
    especificacoes.forEach((especificacao) => {
        let objCat: Categoria = new Categoria(1);
        objCat.setId(especificacao.categoria.id);
        objCat.setStatus(especificacao.categoria.is_active);
        objCat.setNome(especificacao.categoria.nome);
        objCat.setTipo(especificacao.categoria.tipo);
        //objCat.setData(especificacao.categoria.data);
        let atributos_cat: any[] = [especificacao.categoria.atrib1_cat, especificacao.categoria.atrib2_cat, especificacao.categoria.atrib3_cat, especificacao.categoria.atrib4_cat, especificacao.categoria.atrib5_cat, especificacao.categoria.atrib6_cat];// any pois pode ser null ou string
        objCat.setAtributos(atributos_cat);
        /*
            "id": 1,
            "idUsuario": 1,
            "nome": "",
            "tipo": "",
            "valor": 0,
            "atrib1": "",
            "atrib2": "",
            "atrib3": "",
            "atrib4": "",
            "atrib5": "",
            "atrib6": "",
            "is_active": false,
            "data": "19/7/2023",
            "Especificacao": []
        */
      
        let obj: Especificacao = new Especificacao();
        let atributos: any[] = [especificacao.atrib1, especificacao.atrib2, especificacao.atrib3, especificacao.atrib4, especificacao.atrib5, especificacao.atrib6];// any pois pode ser null ou string
        obj.setCategoria(objCat);
        obj.setId(especificacao.id);
        obj.setStatus(especificacao.is_active);
        obj.setMarca(especificacao.marca);
        obj.setModelo(especificacao.modelo);
        obj.setSaldo(especificacao.saldo, "undefined");
        obj.setAtributos(atributos);
        obj.setSku(especificacao.sku);
        obj.setFkCategoriasId(especificacao.fk_categorias_id);
        objEspecificacoes.push(obj);
    });

    await prisma.$disconnect();
    return objEspecificacoes;
}

export const cadastrarEspecificacao = async(especificacao: Especificacao) => {
    await prisma.especificacao.create({
        data: {
            marca: especificacao.getMarca(),
            modelo: especificacao.getModelo(),
            atrib1: especificacao.getAtributos()[0],
            atrib2: especificacao.getAtributos()[1],
            atrib3: especificacao.getAtributos()[2],
            atrib4: especificacao.getAtributos()[3],
            atrib5: especificacao.getAtributos()[4],
            atrib6: especificacao.getAtributos()[5],
            sku: especificacao.getSku(),
            fk_categorias_id: especificacao.getFkCategoriasId(),
            is_active: true
        }
    });
    await prisma.$disconnect();
}

export const alterarQuantidade = async(especificacao: Especificacao) => {
    await prisma.especificacao.update({
        where: {
            id: especificacao.getId(),
            is_active: true
        },
        data: {
            saldo: especificacao.getSaldo()
        }
    });
    await prisma.$disconnect();
}

export const desativarEspecificacao = async(id: number) => {
    await prisma.especificacao.update({
        where: {
            id: id,
        },
        data: {
            is_active: false
        }
    });
}
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