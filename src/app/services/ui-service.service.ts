import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class UiServiceService {
  constructor(
    private alertCrtl: AlertController,
    private toastCrtl: ToastController
  ) {}

  async alertaInformativa(message: string) {
    const alert = await this.alertCrtl.create({
      message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCrtl.create({
      message,
      position: 'top',
      duration: 1500,
    });
    await toast.present();
  }
}
