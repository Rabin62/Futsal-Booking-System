import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from './subject.service';

@Component({
  templateUrl: './subject-delete-dialog.component.html',
})
export class SubjectDeleteDialogComponent {
  subject?: ISubject;

  constructor(protected subjectService: SubjectService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subjectService.delete(id).subscribe(() => {
      this.eventManager.broadcast('subjectListModification');
      this.activeModal.close();
    });
  }
}
