class Categoria{
    #id
    #idUsuario
    #tipo
    #valor
    #atrib1
    #atrib2
    #atrib3
    #is_active
    #data
    #Especificacao
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
    constructor(id, idUsuario, tipo) {
        this.#id = id;
        this.#idUsuario = idUsuario;
        this.#tipo = tipo;
    }

    setId(id) {
        this.#id = id;
    }
    getId() {
        return this.#id;
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
    setIsActive(is_active) {
        this.#is_active = is_active;
    }
    getIsActive() {
        return this.#is_active;
    }
    setData() {
        this.#data = data;
    }
    getData() {
        return this.#data;
    }
    setValor(valor) {
        this.#valor = valor;
    }

    getTipo() {
        return this.#tipo;
    }
    setTipo(tipo) {
        this.#tipo = tipo;
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

export default Categoria;