import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  paginaPost = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,private usuarioService: UsuarioService, private fileTransfer: FileTransfer) { }

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

  subirImagen(img: string) {
    const options : FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTrans : FileTransferObject = this.fileTransfer.create();

    fileTrans.upload(img, `${URL}/post/upload`, options).then(data => {
      console.log(data);
    }).catch(err => {
      console.log('Error en data', err);
    });
  }
}
