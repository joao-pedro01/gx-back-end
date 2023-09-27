import Categoria from "./Categoria";

class Especificacao{
    private id: number;
    private idUsuario: number;
    private saldo: number;
    private is_active: boolean;
    private marca: string;
    private modelo: string;
    private atrib1: string;
    private atrib2: string;
    private atrib3: string;
    private atrib4: string;
    private atrib5: string;
    private atrib6: string;
    private sku: string;
    private fk_categorias_id: number;
    private categoria: Categoria;
    constructor() {
        this.id = 0;
        this.saldo = 0;
        this.is_active = false;
        this.marca = '';
        this.modelo = '';
        this.atrib1 = '';
        this.atrib2 = '';
        this.atrib3 = '';
        this.atrib4 = '';
        this.atrib5 = '';
        this.atrib6 = '';
        this.sku = '';
        this.fk_categorias_id = 0;
        this.idUsuario = 0;
        this.categoria = new Categoria(this.idUsuario);
    }
    
    setId(id: any) {
        this.id = parseInt(id);
    }
    getId() {
        return this.id;
    }

    setSaldo(valor: number | null, operador: string) {
        if(valor == null) {
            valor = 0;
        } else if(operador == "undefined") {
            this.saldo = valor;
        } else {
            //valor = parseInt(valor.toString());
            if(this.saldo + valor >= 0) {
                this.saldo += valor;
            }
        }
    }
    getSaldo(): number {
        return this.saldo;
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

    setMarca(marca: string) {
        this.marca = marca;
    }
    getMarca() {
        return this.marca;
    }

    setModelo(modelo: string) {
        this.modelo = modelo;
    }
    getModelo() {
        return this.modelo;
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

    setSku(sku: string) {
        this.sku = sku;
    }
    getSku(): string {
        return this.sku;
    }
    
    GerarSku() {
        if(this.atrib4 == null) {
            this.atrib4 = '000';
        }
        if(this.atrib5 == null) {
            this.atrib5 = '000';
        }
        if(this.atrib6 == null) {
            this.atrib6 = '000';
        }
        
        this.sku = this.marca.substring(0, 3) + this.modelo.substring(0, 3) + this.atrib1.substring(0, 3) + this.atrib2.substring(0, 3) + this.atrib3.substring(0, 3) + this.atrib4.substring(0, 3) + this.atrib5.substring(0, 3);

        if(this.sku.length < 21) {
            for (let i = 0; i < (21 - this.sku.length); i++) {
                this.sku = '0' + this.sku;
            }
        }
        this.sku = this.sku.toUpperCase();
        console.log(this.sku);
    }

    setFkCategoriasId(fk_categorias_id: number) {
        this.fk_categorias_id = fk_categorias_id;
    }
    getFkCategoriasId() {
        return this.fk_categorias_id;
    }

    getCategoria() {
        console.log(this.categoria)
        return this.categoria;
    }
    setCategoria(categoria: Categoria) {
        this.categoria = categoria;
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

export default Especificacao;