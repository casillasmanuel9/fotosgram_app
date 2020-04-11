import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  paginaPost = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,private usuarioService: UsuarioService) { }

  getPost(pull:boolean = false) {
    if(pull === true) this.paginaPost = 0;
    this.paginaPost ++;
    return this.http.get<RespuestaPosts>(`${URL}/post/?pagina=${this.paginaPost}`);
  }

  crearPost(post:Post) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    return new Promise((resolve,reject) => {
      this.http.post(`${URL}/post/`, post, {headers}).subscribe(res => {
        this.nuevoPost.emit(res['post']);
        resolve(true);
      });
    });
  }
}
