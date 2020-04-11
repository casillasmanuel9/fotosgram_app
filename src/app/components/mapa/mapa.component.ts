import { Component, OnInit, Input, ViewChild } from "@angular/core";

declare var mapboxgl;

@Component({
  selector: "app-mapa",
  templateUrl: "./mapa.component.html",
  styleUrls: ["./mapa.component.scss"],
})
export class MapaComponent implements OnInit {
  @Input() coords: string;
  @ViewChild('mapa',{static: true}) mapa;

  constructor() {}

  ngOnInit() {
    console.log(this.coords);

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFudWVsMjM5IiwiYSI6ImNrNXp2cG91dzAwZzgzbm41OGs5ZDN4MnUifQ.W3AnP6aCJY1RT5qHqG0VLA";
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng,lat],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker()
    .setLngLat([lng,lat])
    .addTo(map);
  }
}
