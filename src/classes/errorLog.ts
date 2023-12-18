import fs from 'fs';
import Usuario from './Usuario';

class ErrorLog {
    private logFilePath: string;
    //private usuario: Usuario;

    constructor(logFilePath: string) {
        //this.usuario = new Usuario();
        this.logFilePath = logFilePath;
    }

    public saveLog(log: any, userId: number, userName: string): void {
        const logs = this.getLogs();
        const newLog = {
            log: log,
            timestamp: new Date().toISOString(), // Adicionar timestamp ao log
            user: {
                id: userId, // Adicionar usuário ao log
                username: userName // Adicionar usuário ao log
            }
        };
    
        logs.push(newLog);
        /* console.log(logs); */
        fs.writeFileSync(this.logFilePath, JSON.stringify(logs, null, 2)); // Update the log file with formatted JSON content
    }

    private getLogs(): any[] {
        try {
            const fileContent = fs.readFileSync(this.logFilePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            return [];
        }
    }
}

export default ErrorLog;
