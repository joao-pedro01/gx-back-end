import Especificacao from "./Especificacao";

export default class Categoria{
    private id: number;
    private idUsuario: number;
    private nome: string;
    private tipo: string;
    private valor: number;
    private atrib1: string;
    private atrib2: string;
    private atrib3: string;
    private atrib4: string;
    private atrib5: string;
    private atrib6: string;
    private is_active: boolean;
    private data: string;
    /*
        id           Int       @id @default(autoincrement())
        idUsuario    Int
        idPeca       Int?
        idEquipamento Int?
        tipo         String
        valor        String
        data         DateTime @default(now())
        usuario      Usuario  @relation(fields: [idUsuario], references: [id])
        peca         Peca?    @relation(fields: [idPeca], references: [id])
        equipamento  Equipamento? @relation(fields: [idEquipamento], references: [id])
    */
    constructor(idUsuario: number) {
        let data = new Date();
        this.id = 0;
        this.idUsuario = idUsuario;
        this.nome = '';
        this.tipo = '';
        this.valor = 0;
        this.atrib1 = '';
        this.atrib2 = '';
        this.atrib3 = '';
        this.atrib4 = '';
        this.atrib5 = '';
        this.atrib6 = '';
        this.is_active = true;
        this.data =  ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()
    }

    setId(id: any): void {
        this.id = parseInt(id);
    }
    getId(): number{
        return this.id;
    }

    setNome(nome: string) {
        this.nome = nome;
    }
    getNome(): string {
        return this.nome;
    }

    setAtributos(atrib: string[]): void {
        this.atrib1 = atrib[0];
        this.atrib2 = atrib[1];
        this.atrib3 = atrib[2];
        this.atrib4 = atrib[3];
        this.atrib5 = atrib[4];
        this.atrib6 = atrib[5];
    }
    getAtributos(): string[] {
        return [this.atrib1, this.atrib2, this.atrib3, this.atrib4, this.atrib5, this.atrib6];
    }


    setStatus(is_active: any) {
        if(is_active == "false") {
            is_active = false;
        }

        if(is_active == "all") {
            is_active = undefined;
        }

        if(is_active == "true") {
            is_active = true;
        }
        
        this.is_active = is_active;
    }
    getStatus(): boolean {
        return this.is_active;
    }

    setData(data: string) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
    
    setValor(valor: number) {
        this.valor = valor;
    }
    getValor(): number {
        return this.valor;
    }

    getTipo(): string {
        return this.tipo;
    }
    setTipo(tipo: string) {
        this.tipo = tipo;
    }
}
/*
  id          Int      @id @default(autoincrement())
  saldo       Int?
  is_active    Boolean  @default(true)
  marca       String
  modelo      String
  atrib1      String
  atrib2      String
  atrib3      String
  atrib4      String?
  atrib5      String?
  atrib6      String?
  sku         String
  categoria   Categoria @relation(fields: [fk_categorias_id], references: [id])
  fk_categorias_id Int
*/