import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  avatars = [
    {
      img: "av-1.png",
      seleccionado: true,
    },
    {
      img: "av-2.png",
      seleccionado: false,
    },
    {
      img: "av-3.png",
      seleccionado: false,
    },
    {
      img: "av-4.png",
      seleccionado: false,
    },
    {
      img: "av-5.png",
      seleccionado: false,
    },
    {
      img: "av-6.png",
      seleccionado: false,
    },
    {
      img: "av-7.png",
      seleccionado: false,
    },
    {
      img: "av-8.png",
      seleccionado: false,
    },
  ];

  @Output() avatarSel = new EventEmitter<string>();
  @Input() avatarPadre;

  seleccionarAvatar(avatar) {
    this.avatars.forEach((av) => (av.seleccionado = false));
    avatar.seleccionado = true;
    this.avatarSel.emit(avatar.img);
  }


  avatarSlide = {
    slidesPerView: 3.5,
  };

  constructor() { }

  ngOnInit() {
    this.avatars.forEach((av) => (av.seleccionado = false));
    for(const av of this.avatars) {
      if(av.img == this.avatarPadre) {
        av.seleccionado = true;
        break;
      }
    }
  }

}
