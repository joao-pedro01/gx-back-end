// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    await clearAllData();
    let categorias = [
        {
            nome: 'Processador',
            tipo: 'P',
            atrib1_cat: 'Núcleos e Threads',
            atrib2_cat: 'Frequência de Clock',
            atrib3_cat: 'Arquitetura',
            atrib4_cat: 'Gráficos Integrados',
            atrib5_cat: 'Socket',
            atrib6_cat: '',
            is_active: true
        },
        {
            nome: 'Memória Ram',
            tipo: 'P',
            atrib1_cat: 'Capacidade',
            atrib2_cat: 'Frequência',
            atrib3_cat: 'Tipo',
        }
    ];
    let especificacoes = [
        {
            marca: 'Intel',
            modelo: 'Core i5-9400F',
            atrib1: '6/6',
            atrib2: '2.9GHz',
            atrib3: '14nm',
            atrib4: 'Não',
            atrib5: 'LGA 1151',
            atrib6: '',
            sku: '',
            fk_categorias_id: 1,
            is_active: true
        },
        {
            marca: 'Intel',
            modelo: 'Core i3-9400F',
            atrib1: '4/4',
            atrib2: '2.9GHz',
            atrib3: '14nm',
            atrib4: 'Não',
            atrib5: 'LGA 1151',
            atrib6: '',
            sku: '',
            fk_categorias_id: 1,
            is_active: true
        },
        {
            marca: 'Intel',
            modelo: 'Core i7-9400F',
            atrib1: '8/8',
            atrib2: '2.9GHz',
            atrib3: '14nm',
            atrib4: 'Não',
            atrib5: 'LGA 1151',
            atrib6: '',
            sku: '',
            fk_categorias_id: 1,
            is_active: false
        },
        {
            marca: 'Kingston',
            modelo: 'HyperX Fury',
            atrib1: '8GB',
            atrib2: '2666MHz',
            atrib3: 'DDR4',
            sku: 'KINHYP8GB266DDR000000',
            fk_categorias_id: 2,
            is_active: true
        },
        {
            marca: 'Kingston',
            modelo: 'HyperX Fury',
            atrib1: '16GB',
            atrib2: '2666MHz',
            atrib3: 'DDR4',
            sku: 'KINHYP16G266DDR000000',
            fk_categorias_id: 2,
            is_active: false
        },

    ];
    // Exemplo de criação de um registro na tabela "categoria"
    await prisma.categoria.createMany({
      data: categorias
    });
    await prisma.especificacao.createMany({
        data: especificacoes
    });

    console.log('Seed concluído.');
  } catch (error) {
    console.error('Erro durante o seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function clearAllData() {
  try {
    // Limpa os dados da tabela Especificacao
    await prisma.especificacao.deleteMany({});

    // Limpa os dados da tabela Categoria
    await prisma.categoria.deleteMany({});
    await prisma.$queryRaw`ALTER TABLE Categoria AUTO_INCREMENT = 1;`;
    await prisma.$queryRaw`ALTER TABLE Especificacao AUTO_INCREMENT = 1;`;
    console.log('Todos os dados foram excluídos com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}
seed();
