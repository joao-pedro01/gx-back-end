import { PrismaClient } from "@prisma/client";
import Usuario from "../classes/Usuario";
const prisma = new PrismaClient();
export async function listarUsuarios(): Promise<Usuario[]> {
    let objUsuarios: Usuario[] = [];
    const usuarios =  await prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            senha: true,
            criado: true,
            is_active: true,
            alterado: true,
        },
        where: { is_active: true }
    });

    usuarios.forEach((usuario) => {
        let objUsuario: Usuario = new Usuario(usuario.nome, usuario.senha);
        objUsuario.setId(usuario.id);

        objUsuarios.push(objUsuario);
    });

    return objUsuarios;
}

export async function buscaUsuario(usuario: Usuario): Promise<Usuario | boolean> {
    const usuarioBuscado = await prisma.usuario.findFirst({
        where: {
            nome: usuario.getNome(),
        }
    });

    if (usuarioBuscado) {
        const objUsuario: Usuario = new Usuario(usuarioBuscado.nome, usuarioBuscado.senha);
        return objUsuario;
    }

    return false;
}

export async function cadastrarUsuario(usuario: Usuario): Promise<Usuario> {
    const usuarioCadastrado = await prisma.usuario.create({
        data: {
            nome: usuario.getNome(),
            senha: usuario.getSenha(),
            criado: new Date(),
            is_active: true,
            alterado: new Date(),
        }
    });

    let objUsuario: Usuario = new Usuario(usuarioCadastrado.nome, usuarioCadastrado.senha);
    objUsuario.setId(usuarioCadastrado.id);

    return objUsuario;
}

/* export const listarUsuarios = async() => {
  return await conn.select('*').table('usuarios').where({'is_active': true});
}

export const cadastrarUsuario = async(dados) => {
  return await conn.insert(dados).into('usuarios');
}

export const loginUsuario = async(usuario) => {
  return await conn.select('id', 'nome', 'criado', 'is_active').table('usuarios').first().where(usuario);
}

export const buscaUsuario = async(usuario) => {
  return await conn.select('*').table('usuarios').first().where(usuario);
} */