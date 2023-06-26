import Categoria from "./Categoria.js";
class Especificacao{
    id
    #saldo
    #is_active
    #marca
    #modelo
    #atrib1
    #atrib2
    #atrib3
    #atrib4
    #atrib5
    #atrib6
    #sku
    #fk_categorias_id
    categoria
    constructor(status) {
        this.#is_active = status;
    }
    
    setId(id) {
        this.#id = parseInt(id);
    }
    getId() {
        return this.#id;
    }

    setSaldo(saldo) {
        this.#saldo = saldo;
    }
    getSaldo() {
        return this.#saldo;
    }

    setIsActive(is_active) {
        this.#is_active = is_active;
    }
    getIsActive() {
        return this.#is_active;
    }

    setMarca(marca) {
        this.#marca = marca;
    }
    getMarca() {
        return this.#marca;
    }

    setModelo(modelo) {
        this.#modelo = modelo;
    }
    getModelo() {
        return this.#modelo;
    }

    setAtrib1(atrib1) {
        this.#atrib1 = atrib1;
    }
    getAtrib1() {
        return this.#atrib1;
    }

    setAtrib2(atrib2) {
        this.#atrib2 = atrib2;
    }
    getAtrib2() {
        return this.#atrib2;
    }

    setAtrib3(atrib3) {
        this.#atrib3 = atrib3;
    }
    getAtrib3() {
        return this.#atrib3;
    }

    setAtrib4(atrib4) {
        this.#atrib4 = atrib4;
    }
    getAtrib4() {
        return this.#atrib4;
    }

    setAtrib5(atrib5) {
        this.#atrib5 = atrib5;
    }
    getAtrib5() {
        return this.#atrib5;
    }

    setAtrib6(atrib6) {
        this.#atrib6 = atrib6;
    }
    getAtrib6() {
        return this.#atrib6;
    }

    setStatus(status) {
        this.#is_active = status;
    }
    getStatus() {
        return this.#is_active;
    }

    setSku(sku) {
        this._sku = sku;
    }
    getSku() {
        return this.#sku;
    }

    setFkCategoriasId(fk_categorias_id) {
        this.#fk_categorias_id = fk_categorias_id;
    }
    getFkCategoriasId() {
        return this.#fk_categorias_id;
    }

    getCategoria() {
        console.log(this.categoria)
        return this.categoria;
    }
    setCategoria(categoria) {
        this.categoria = new Categoria(categoria);
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