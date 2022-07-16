import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { FormControl } from '@angular/forms';

interface dataFromForm {
  image: File,
  url: string,
  animation: string,
}

@Component({
  selector: 'app-res',
  templateUrl: './res.component.html',
  styleUrls: ['./res.component.scss']
})
export class ResComponent implements OnInit, DoCheck {
  @Input() dataFromForm!: dataFromForm;
  data = {};
  imagePreview: any;
  left!: FormControl;
  top!: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.left = new FormControl(0);
    this.top = new FormControl(0);

  }

  ngDoCheck() {
    if (this.dataFromForm) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(this.dataFromForm.image);
    }
  }

  transformImage() {
    const image = document.getElementById('image');

    if(image) {
      image.style.left = this.left.value + 'px';
      image.style.top = this.top.value + 'px';
    }

  }

  scaleImage(event: any) {
    console.log(event.target.value);
    const image = document.getElementById('image');
    if(image) {
      image.style.transform = 'scale('+event.target.value/10+')';
    }
    
  }
}
