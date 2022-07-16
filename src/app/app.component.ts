import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formData!: FormGroup;
  animations = ['sdfsdf', 'sdfsdfdsf', 'sdfsdfsdf']
  imagePreview: any;
  show = false;
  left!: FormControl;
  top!: FormControl;
  
  constructor() {}

  transformImage() {
    console.log(this.left.value);
    console.log(this.top.value);

    const image = document.getElementById('image');
    if(image) {
      image.style.left = this.left.value + 'px';
      image.style.top = this.top.value + 'px';
    }

  }

f(event: any) {
  console.log(event.target.value);
  const image = document.getElementById('image');
  if(image) {
    image.style.transform = 'scale('+event.target.value/10+')';
  }
  
}
  ngOnInit(): void {
    this.left = new FormControl(0);
    this.top = new FormControl(0);


    this.formData = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      url: new FormControl('', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]),
      animation: new FormControl('', [Validators.required]),
    })
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.formData.patchValue({image: file});
    this.formData.get('image')?.updateValueAndValidity();
  }

  submitedForm() {
    if (this.formData.valid) {
      this.show = true;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(this.formData.value.image);
    }
  }


}
