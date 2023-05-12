import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import conn from "../config/dbConnect.js";

export async function listarCategorias(params) {
  const sql = await prisma.categoria.findMany({
    select: {
      id: true,
      nome: true,
      tipo: true,
      is_active: true,
      marca_cat: true,
      atrib1_cat: true,
      atrib2_cat: true,
      atrib3_cat: true,
      atrib4_cat: true,
      modelo_cat: true,
      atrib5_cat: true,
      atrib6_cat: true
    },
    where: {
      is_active: params && params.is_active,
      nome: {
        contains: params && params.nome
      },
      tipo: {
        contains: params && params.tipo
      }
    }
  });

  prisma.$disconnect();
  return sql;
}



// function que faz a consulta de todos pecas
/*export const listarCategorias = async(params) => {
  if(params == undefined){
    return await conn.select('*').table('categorias');
  }else {
    return await conn.select('*').table('categorias').where(params);
  }
}*/

export const cadastrarCategoria = async(dados) => {
  return await conn.insert(dados).into('categorias');
}

export const alterarQuantidade = async(id, qnt) => {
  return await conn.where({id: id}).update({qnt: qnt}).table('categorias');
}

export const desativarCategoria = async(id, status) => {
  return await conn.where({id: id}).update({is_active: status}).table('categorias');
}
