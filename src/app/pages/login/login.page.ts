import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IonSlides, NavController } from "@ionic/angular";
import { UsuarioService } from "src/app/services/usuario.service";
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  @ViewChild("slidePrincipal", { static: true }) slides: IonSlides;


  loginUser = {
    email: "casillasmanuel9@gmail.com",
    password: "TRJM050214",
  };

  registerUser : Usuario = {
    email: "test",
    password: "123qwe",
    nombre: "test",
    avatar: 'av-1.png'
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCrtl: NavController,
    private uiService: UiServiceService
  ) {}

  ngOnInit() {
    this.usuarioService.obtenerToken();
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (!fLogin.valid) return;
    const existe = await this.usuarioService.login(
      this.loginUser.email,
      this.loginUser.password
    );
    if (existe) {
      this.navCrtl.navigateRoot("/main/tabs/tab1", { animated: true });
    } else {
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos')
    }
  }

  async registro(fRegistro: NgForm) {
    if (!fRegistro.valid) return;

    const valido = await this.usuarioService.registro(this.registerUser);
    console.log(valido);
    
    if (valido) {
      this.navCrtl.navigateRoot("/main/tabs/tab1", { animated: true });
    } else {
      this.uiService.alertaInformativa('Ese correo electronico ya existe');
    }
  }

  selectAvatar(event) {
    this.registerUser.avatar = event;
  }

  goToSlide(to: number) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(to);
    this.slides.lockSwipes(true);
  }
}
