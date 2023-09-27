import Especificacao from "./Especificacao";
import momemnt from "moment";

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
    private criado: Date;
    private alterado: Date;

    constructor(idUsuario: number) {
        let data = new Date();
        this.id = NaN;
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
        this.criado = new Date();
        this.alterado = new Date();
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

    setCriado(data: Date) {
        this.criado = data;
    }
    getCriado(): string {
        return momemnt(this.criado).format("DD/MM/YYYY");;
    }

    setAlterado(data: Date) {
        this.alterado = data;
    }
    getAlterado(): string {
        return momemnt(this.alterado).format("DD/MM/YYYY");;
    }
}