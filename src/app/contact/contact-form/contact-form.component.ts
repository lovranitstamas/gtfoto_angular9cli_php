import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emailFormatValidator} from './contact.validators';
import {ContactService} from '../../shared/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  submitSuccessAlert = false;
  submitErrorAlert = false;
  inactiveStateOfSendButton = false;

  constructor(
    private fb: FormBuilder,
    private _contactService: ContactService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        sender: [null, Validators.required],
        email: [null,
          Validators.compose(
            [
              Validators.required,
              emailFormatValidator()
            ]
          )],
        subject: [null, Validators.required],
        message: [null, Validators.required]
      }
    );
  }

  sendMessage(form) {
    this.submitted = true;
    this.submitSuccessAlert = false;
    this.submitErrorAlert = false;


    if (this.form.valid) {
      this.inactiveStateOfSendButton = true;

      this.form.get('sender').disable();
      this.form.get('email').disable();
      this.form.get('subject').disable();
      this.form.get('message').disable();

      this._contactService.sendMessage(
        form.value
      ).subscribe(
        (response) => {
          switch (response.status_code_header) {
            case 404:
              // HTTP/1.1 404 Not Found
              console.log(response.status_code_header);
              this.submitErrorAlert = true;
              this.enableMessageForm();
              break;

            case 422:
              // HTTP/1.1 422 Unprocessable Entity
              console.log(response.status_code_header);
              this.submitErrorAlert = true;
              this.enableMessageForm();
              break;

            case 200:

              // console.log(response.body['message']);
              console.log(response.status_code_header);
              this.submitted = false;
              this.submitSuccessAlert = true;
              this.enableMessageForm();
              break;

          }
        },
        err => {
          console.error(err);
          // notification user
          this.submitErrorAlert = true;


        }
      );
    }
  }

  enableMessageForm() {

    setTimeout(() => {
      this.submitted = false;
      this.form.reset({
        sender: null,
        email: null,
        subject: null,
        message: null
      });

      // notification user
      this.submitSuccessAlert = false;
      this.submitErrorAlert = false;

      this.inactiveStateOfSendButton = false;

      this.form.get('sender').enable();
      this.form.get('email').enable();
      this.form.get('subject').enable();
      this.form.get('message').enable();
    }, 5000);
  }
}
