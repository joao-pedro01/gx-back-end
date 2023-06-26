class Usuario {
    #id = null;
    #nome = null;
    #senha = null;
    #criado = null;
    #alterado = null;
    #is_active = null;

    constructor(nomeUsuario, senha) {
        this.#id = 0;
        this.#nome = nomeUsuario;
        this.#senha = senha;
    }

    // function que retorna os usuarios
    
    /*static listarUsuarios = (req, res) => {
        listarUsuarios().then((usuarios) => {
            //res.status(200).json(usuarios);
        });
    }*/

    getId() {
        return this.#id;
    }
    setId(id) {
        this.#id = id;
    }

    getNome() {
        return this.#nome;
    }
    
    getSenha() {
        return this.#senha;
    }

    getCriado() {
        return this.#criado;
    }
    setCriado(criado) {
        this.#criado = criado;
    }
}

export default Usuario;