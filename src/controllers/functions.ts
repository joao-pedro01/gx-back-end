//import var_dump from "var_dump";
import jwt from "jsonwebtoken";

export function removeNull(obj: any): void {
    if (!obj) return;

    Object.keys(obj).forEach((key) => {
        if (obj[key] === null) {
            delete obj[key];
        } else if(typeof obj[key] === 'object') {
            removeNull(obj[key]); // Chamada recursiva para objetos filhos
        }
    });
}
  

export function removeUndefined(obj: any) {
    Object.keys(obj).forEach(key => {
        if(obj[key] === undefined) {
            delete obj[key];
        };
    });
};

export function copiarObjecto(obj: any) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    var temp = obj.constructor();
    for (var key in obj) {
        temp[key] = copiarObjecto(obj[key]);
    }
    return temp;
}

export function verifyJWT(req: any, res: any, next: any){
    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    /*jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });*/
}

/* https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript */
export function stringRamdom(tamanho: number) {
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}