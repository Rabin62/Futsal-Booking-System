import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {IStudent, Student} from 'app/shared/model/student.model';
import { FormArray, FormBuilder } from '@angular/forms';
import {IBookLending} from "../../shared/model/book-lending.model";
import {StudentService} from "./student.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BookLendingService} from "../book-lending/book-lending.service";
import {DATE_TIME_FORMAT} from "../../shared/constants/input.constants";
import * as moment from 'moment';



@Component({
  selector: 'jhi-student-detail',
  templateUrl: './student-detail.component.html',
})
export class StudentDetailComponent implements OnInit {
  student: IStudent | any=new Student();
  isSaving = false;
bookLending?: IBookLending;
  closeResult?: string;
  id?: number;
  note?: string;
  isDisabled = false;
  constructor(protected activatedRoute: ActivatedRoute, protected modalService: NgbModal,
              protected studentService: StudentService,
                protected bookLendingService: BookLendingService ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ student }) => {
      this.student = student;
    });
  }
  reset(): void {
    this.modalService.dismissAll();
  }
  openReturnPopup(content: any, bookLending: IBookLending): void {
    this.bookLending=bookLending;
    this.modalService.open(content, { ariaLabelledBy: 'bill-proceed-title' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  approve(): void {
    this.bookLending!.note = this.note;
    this.subscribeToSaveResponse(this.bookLendingService.approve(this.bookLending!));
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.reset();
    window.location.reload();
  }

  protected onSaveError(): void {
    this.reset();
    this.isSaving = false;
  }
  previousState(): void {
    window.history.back();
  }
}
