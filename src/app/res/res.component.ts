import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

interface dataFromForm {
  image: File,
  url: string,
  animation: string,
}

@Component({
  selector: 'app-res',
  templateUrl: './res.component.html',
  styleUrls: ['./res.component.scss'],
  animations: [
    trigger('imageAnimation', [
      state('from_left', style({
        left: '-300px'
      })),
      state('from_right', style({
        left: '300px'
      })),
      state('from_up', style({
        top: '-300px'
      })),
      state('from_down', style({
        top: '300px'
      })),
      state('scale', style({
        transform: 'scale(0)'
      })),
      state('end', style({
        left: '0',
        top: '0',
        transform: 'scale(1)'
      })),
      transition('from_left => end', animate(1000)),
      transition('from_right => end', animate(1000)),
      transition('from_up => end', animate(1000)),
      transition('from_down => end', animate(1000)),
      transition('scale => end', animate(1000))
    ])
  ]
})

export class ResComponent implements OnInit, OnChanges {
  @Input() dataFromForm!: dataFromForm;
  imagePreview: any;
  animationState = '';
  select = ['px', '%', 'rem', 'vh', 'vw'];
  left_sel = 'px';
  top_sel = 'px';
  width_sel = 'px';
  height_sel = 'px';
  radius_sel = 'px';
  left!: FormControl;
  top!: FormControl;
  width!: FormControl;
  height!: FormControl;
  radius!: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.left = new FormControl(0);
    this.top = new FormControl(0);
    this.width = new FormControl(320);
    this.height = new FormControl(320);
    this.radius = new FormControl(4);
  }

  ngOnChanges() {
    if (this.dataFromForm) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(this.dataFromForm.image);
    }
    this.animationReset();
  }

  animationReset() {
    this.animationState = this.dataFromForm.animation;
    setTimeout(() => {
      this.animationState = 'end';
    }, 1);
  }
  
  transformImage() {
    const image = document.getElementById('image');
    const box = document.getElementById('box');
    if(image) {
      image.style.left = this.left.value + this.left_sel;
      image.style.top = this.top.value + this.top_sel;
    }
    if(box) {
      box.style.width = this.width.value + this.width_sel;
      box.style.height = this.height.value + this.height_sel;
      box.style.borderRadius = this.radius.value + this.radius_sel;
    }
  }

  scaleImage(event: any) {
    const image = document.getElementById('image');
    if(image) {
      image.style.transform = 'scale('+event.target.value/10+')';
    }
  }

  selectWs(event: any) {
    this.width_sel = event.target.value;
    this.transformImage();
  }

  selectHs(event: any) {
    this.height_sel = event.target.value;
    this.transformImage();
  }

  selectLs(event: any) {
    this.left_sel = event.target.value;
    this.transformImage();
  }

  selectTs(event: any) {
    this.top_sel = event.target.value;
    this.transformImage();
  }

  selectRs(event: any) {
    this.radius_sel = event.target.value;
    this.transformImage();
  }

  generateFile() {
    const res = document.getElementById('res');
    if(res) {
      console.log(res.innerHTML);
    }
    
  }
}
