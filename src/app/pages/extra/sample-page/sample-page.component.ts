import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrl: './sample-page.component.scss'
})
export class AppSamplePageComponent implements OnInit {
  donationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.donationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      amount: ['', Validators.required],
      message: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.donationForm.valid) {
      // Handle form submission
      console.log(this.donationForm.value);
    }
  }
}
