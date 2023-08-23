import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuthor, Author } from 'app/shared/model/author.model';
import { AuthorService } from './author.service';

@Component({
  selector: 'jhi-author-update',
  templateUrl: './author-update.component.html',
})
export class AuthorUpdateComponent {
  formData = {
    name: '',
    image: null as File | null
  };


  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.formData.image = event.target.files[0] as File;
    }
    else {
      this.formData.image = null; // Reset the image if no file is selected
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.formData.name);
    if (this.formData.image) {
      formData.append('image', this.formData.image);
    }
    this.http.post('http://localhost:8080/api/saave', formData)
        .subscribe(
            response => {
              console.log('Image uploaded successfully');
            },
            error => {
              console.error('Error uploading image');
            }
        );
  }





  previousState(): void {
    window.history.back();
  }










}
