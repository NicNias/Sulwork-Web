import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SulworkService {
  private apiUrl = 'http://localhost:8080/contato';

  constructor(private http: HttpClient) { }
}
