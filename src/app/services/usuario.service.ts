import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const { Storage } = Plugins;
const URL = environment.url;

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  token: string = null;
  usuario: Usuario = {};

  constructor(private http: HttpClient, private navCrtl: NavController) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const data = { email, password };
      this.http.post(`${URL}/user/login`, data).subscribe((res) => {
        console.log(res);
        if (res["ok"] === true) {
          this.guardarToken(res["token"]);
          resolve(true)
        } else {
          this.token = null;
          Storage.clear();
          resolve(false)
        }
      });
    });
  }

  registro(usuario: Usuario) {
    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/user/create`, usuario).subscribe(res => {
        console.log(res);
        if (res["ok"] === true) {
          console.log('ok');
          this.guardarToken(res["token"]);
          resolve(true);
        } else {
          this.token = null;
          Storage.clear();
          resolve(false)
        }
      });
    });
  }

  actualizarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    return new Promise((resolve,reject) => {
      this.http.post(`${URL}/user/update`, usuario, {headers}).subscribe(res => {
        if(res['ok'] === true) {
          this.guardarToken(res['toke']);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  getUsuario() {
    if(!this.usuario._id) this.validaToken();
    return {...this.usuario};
  }

  async guardarToken(token: string) {
    this.token = token;
    await Storage.set({
      key: "token",
      value: token,
    });
  }

  async obtenerToken() {
    const { value } = await Storage.get({ key: "token" });
    this.token = value;
  }


  async validaToken(): Promise<boolean> {
    await this.obtenerToken();
    if(!this.token) {
      this.navCrtl.navigateRoot(['/login']);
      return Promise.resolve(false);
    }
    
    return new Promise((resolve,reject) => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user/`, {headers}).subscribe(res => {
        if (res["ok"] === true) {
          this.usuario = res['usuario'];
          resolve(true);
        } else {
          this.navCrtl.navigateRoot(['/login']);
          resolve(false);
        }
      })
    });
  }
}
