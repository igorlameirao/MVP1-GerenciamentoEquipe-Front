import { api } from './_base'
import axios, { AxiosInstance } from 'axios';


export class Service {
    private nomeController = "equipes";

    public CriarTime(data: any) {
        return api.post(`${this.nomeController}`,  data);
    }

    public list() {
        return api.get(`${this.nomeController}`);
    }

    public getById(id) {
        return api.get(`${this.nomeController}`, {
            params: { id }
        });
    }

    public alterar(data: any) {
        return api.put(`${this.nomeController}`, data);
    }

    public excluir(id): Promise<any> {
        return api.delete(`${this.nomeController}`, {
            params: { id }
        });
    }
}

