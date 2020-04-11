import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  usuario: Usuario = {}

  constructor(private usuarioService:UsuarioService, private uiService: UiServiceService) {}

  logout() {

  }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  async actualizar(fActualiza: NgForm) {
    if(fActualiza.invalid) return;

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
    console.log(actualizado);
    if(actualizado) {
      this.uiService.presentToast('Registro actualizado');
    } else {
      this.uiService.presentToast('No se pudo actualizar');
    }

  }

}
