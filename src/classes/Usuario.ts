import { Md5 } from "ts-md5";

class Usuario {
    private id: number;
    private nome: string;
    private senha: string;
    private criado: Date;
    private alterado: Date;
    private is_active: boolean;

    constructor(nomeUsuario: string, senha: string) {
        this.id = NaN;
        this.nome = nomeUsuario;
        this.senha = senha;
        this.is_active = true;
        this.criado = new Date();
        this.alterado = new Date();
    }

    getId(): number {
        return this.id;
    }
    setId(id: number): void {
        this.id = id;
    }

    getNome(): string {
        return this.nome;
    }
    
    getSenha(): string {
        return this.senha;
    }

    getCriado(): Date {
        return this.criado;
    }
    setCriado(criado: Date): void {
        this.criado = criado;
    }

    public loginUsuario() {
        
        /* if(this.validatePassword(this.senha)) { */
            this.senha = Md5.hashStr(this.senha);
        /* } else {
            throw new Error("Senha inválida!");
        } */
    }
    private validateUsername = (username: string): boolean => {
        // Regex para validar o usuário:
        // O usuário deve conter apenas letras minúsculas, números, pontos e underscores
        // Deve ter no mínimo 3 caracteres e no máximo 20 caracteres
        const regex = /^[a-z0-9._]{3,20}$/;
        return regex.test(username);
    };

    private validatePassword = (password: string): boolean => {
        // Regex para validar a senha de acordo com a política de senha do Windows:
        // A senha deve conter pelo menos 8 caracteres
        // Deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial
        // Não pode conter o nome de usuário ou partes do nome completo do usuário
        // Não pode ser uma senha comumente usada
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
   
}

export default Usuario;