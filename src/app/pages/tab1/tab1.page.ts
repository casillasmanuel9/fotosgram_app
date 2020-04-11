import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  post: Post[] = [];

  habiliditado = true;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.siguientes();
    this.postService.nuevoPost.subscribe( post => {
      this.post.unshift(post);
    });
  }

  siguientes(event?, pull:boolean = false) {
    this.postService.getPost(pull).subscribe(res => {
      this.post.push(...res.post);
      if(event) {
        event.target.complete();
        if(res.post.length === 0) {
          this.habiliditado = false;
        }
      }
    });
  }

  recargar(event) {
    this.siguientes(event, true);
    this.post = [];
    this.habiliditado = true;
  }

}
