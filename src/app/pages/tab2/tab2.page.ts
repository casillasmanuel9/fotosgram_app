import { Component } from "@angular/core";
import { Post } from "src/app/interfaces/interfaces";
import { PostService } from "src/app/services/post.service";
import { Router } from "@angular/router";

import {
  Plugins,
  CameraResultType,
  CameraSource,
  CameraOptions,
} from "@capacitor/core";

const { Geolocation, Camera } = Plugins;
declare var window: any;

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  post: Post = {
    mensaje: "",
    coords: null,
  };

  position = false;
  cargandoLocalizacion = false;

  tempImages = [];

  constructor(private postService: PostService, private route: Router) {}

  async crearPost() {
    console.log(this.post);
    const creado = await this.postService.crearPost(this.post);

    this.post = {
      mensaje: "",
      coords: null,
    };

    this.tempImages = [];

    this.route.navigateByUrl("/main/tabs/tab1");
  }

  getGeo() {
    if (!this.position) {
      this.post.coords = null;
      return;
    }

    this.cargandoLocalizacion = true;
    Geolocation.getCurrentPosition()
      .then((coordinates) => {
        this.cargandoLocalizacion = false;
        const coords = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
        this.post.coords = coords;
      })
      .catch((err) => {
        this.cargandoLocalizacion = false;
      });
  }

  async takePhoto() {
    this.procesarImagen({
      quality: 90,
      resultType: CameraResultType.Uri,
      correctOrientation: true,
      source: CameraSource.Camera,
    });
  }

  async libreria() {
    this.procesarImagen({
      quality: 90,
      resultType: CameraResultType.Uri,
      correctOrientation: true,
      source: CameraSource.Photos,
    });
  }

  async procesarImagen(options: CameraOptions) {
    const image = await Camera.getPhoto(options);
    var imageUrl = image.webPath;
    const img = window.Ionic.WebView.convertFileSrc(imageUrl);
    console.log(img);

    this.postService.subirImagen(image.path);
    this.tempImages.push(img);
  }
}
