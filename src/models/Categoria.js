import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function listarCategorias(params) {
    let whereClause = {
        is_active: params && params.is_active,
        nome: {
            contains: params && { equals: params.nome }
        },
        tipo: {
            contains: params && { equals: params.tipo }
        }
    };

    const id = parseInt(params.id); // Converter para inteiro

    // Verificar se o valor de id é válido (não é NaN)
    if (!isNaN(id)) {
        whereClause = { id:  id };
    }

    const categorias = await prisma.categoria.findMany({
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
        where: whereClause
    });

    await prisma.$disconnect();
    return categorias;
}

export const countCategoria = async(params) => {
    const count = await prisma.categoria.count({
        where: {
            AND: {
                is_active: true,
                nome: params && params.nome,
                tipo: params && params.tipo
            }
        }
    });

    await prisma.$disconnect();
    return count;
}
export const cadastrarCategoria = async(param) => {
    await prisma.categoria.create({ data: param });
    await prisma.$disconnect();
}

export const desativarCategoria = async(id) => {
    await prisma.categoria.update({
        where: {
            id: id
        },
        data: {
            is_active: false
        }
    });

  await prisma.$disconnect();
}

// não utilizado
//export const alterarQuantidade = async(id, qnt) => {
//  return await conn.where({id: id}).update({qnt: qnt}).table('categorias');
//}