import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Categoria from "../classes/Categoria";

export async function listarCategorias(categorias: Categoria): Promise<Categoria[]> {
    let whereClause:any;
    const id: number = categorias.getId(); // Converter para inteiro
    // Verificar se o valor de id é válido (não é NaN)
    if(!isNaN(id)) {
        whereClause = { id:  id };
    }else {
        whereClause = {
            is_active: categorias && categorias.getStatus(),
            nome: {
                contains: categorias && categorias.getNome(),
            },
            tipo: {
                contains: categorias && categorias.getTipo(),
            }
        };

        // Verifica se params.nome existe antes de usar o operador contains
        if (categorias && categorias.getNome()) {
            whereClause.nome.contains = `%${categorias.getNome()}%`;
        }
        
        // Verifica se params.tipo existe antes de usar o operador contains
        if (categorias && categorias.getTipo()) {
            whereClause.tipo.contains = `%${categorias.getTipo()}%`;
        }
    }

    const categoria = await prisma.categoria.findMany({
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
    
    let categoriaList: Categoria[] = [];
    categoria.forEach(element => {
        let obj = new Categoria(1); // Criar um novo objeto em cada iteração
        let atributos: any[] = [element.atrib1_cat, element.atrib2_cat, element.atrib3_cat, element.atrib4_cat, element.atrib5_cat, element.atrib6_cat];// any pois pode ser null ou string

        obj.setId(element.id);
        obj.setNome(element.nome);
        obj.setTipo(element.tipo);
        obj.setStatus(element.is_active);
        obj.setAtributos(atributos);
        categoriaList.push(obj); // Adicionar o objeto ao array
    });

    await prisma.$disconnect();
    return categoriaList;
}

export const countCategoria = async(categoria: Categoria) => {    
    const count = await prisma.categoria.count({
        where: {
            AND: {
                is_active: true,
                nome: categoria && categoria.getNome(),
                tipo: categoria && categoria.getTipo()
            }
        }
    });
    //const result = await prisma.$queryRaw`SELECT * FROM tabela`;
    await prisma.$disconnect();
    return count;
}

export const cadastrarCategoria = async(categoria: Categoria) => {
    await prisma.categoria.create({
        data: {
            nome: categoria.getNome(),
            tipo: categoria.getTipo(),
            atrib1_cat: categoria.getAtributos()[0],
            atrib2_cat: categoria.getAtributos()[1],
            atrib3_cat: categoria.getAtributos()[2],
            atrib4_cat: categoria.getAtributos()[3],
            atrib5_cat: categoria.getAtributos()[4],
            atrib6_cat: categoria.getAtributos()[5],
            is_active: true,
            criado: new Date(),
            alterado: new Date()
        }
    });
    await prisma.$disconnect();
}

export const desativarCategoria = async(id: number, status: boolean) => {
    await prisma.categoria.update({
        where: {
            id: id
        },
        data: {
            is_active: status
        }
    });

  await prisma.$disconnect();
}