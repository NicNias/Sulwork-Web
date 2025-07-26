import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

interface Colaborador {
  id?: string;
  nome: string;
  cpf: string;
  data_cafe: string;
  itens: string[];
  entregue: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SulworkService {
  private apiUrl = `${environment.apiUrl}/colaborador`;

  constructor(private http: HttpClient) { }

  getTodosColaboradores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/findall`);
  }

  createColaborador(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(`${this.apiUrl}/create`, colaborador);
  }

  patchAtualizarColaborador(id: string, dados: Partial<Colaborador>): Observable<Colaborador> {
    return this.http.patch<Colaborador>(`${this.apiUrl}/colaborador/${id}`, dados);
  }

  patchStatusCafe(id: string, entregue: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/cafe/status/${id}`, { entregue }, { responseType: 'text' as 'json' });
  }

  patchAdicionarItens(id: string, itens: string[]): Observable<Colaborador> {
    return this.http.patch<Colaborador>(
      `${this.apiUrl}/cafe/adicionar-itens/${id}`,
      { itens }
    );
  }

  deleteColaborador(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
