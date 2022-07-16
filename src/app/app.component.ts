import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface dataFromForm {
  image: File,
  url: string,
  animation: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formData!: FormGroup;
  dataFromForm!: dataFromForm;
  animations = ['sdfsdf', 'sdfsdfdsf', 'sdfsdfsdf']
  show = false;
  
  constructor() {}

  ngOnInit(): void {
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
      this.dataFromForm = this.formData.value;
      this.show = true;
      
    }
  }


}
