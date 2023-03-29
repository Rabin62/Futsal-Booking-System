import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LmsSharedModule } from 'app/shared/shared.module';
import { LibrarianComponent } from './librarian.component';
import { LibrarianDetailComponent } from './librarian-detail.component';
import { LibrarianUpdateComponent } from './librarian-update.component';
import { LibrarianDeleteDialogComponent } from './librarian-delete-dialog.component';
import { librarianRoute } from './librarian.route';

@NgModule({
  imports: [LmsSharedModule, RouterModule.forChild(librarianRoute)],
  declarations: [LibrarianComponent, LibrarianDetailComponent, LibrarianUpdateComponent, LibrarianDeleteDialogComponent],
  entryComponents: [LibrarianDeleteDialogComponent],
})
export class LmsLibrarianModule {}
