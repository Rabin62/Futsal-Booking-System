import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LmsSharedModule } from 'app/shared/shared.module';
import { BookLendingComponent } from './book-lending.component';
import { BookLendingDetailComponent } from './book-lending-detail.component';
import { BookLendingUpdateComponent } from './book-lending-update.component';
import { BookLendingDeleteDialogComponent } from './book-lending-delete-dialog.component';
import { bookLendingRoute } from './book-lending.route';

@NgModule({
  imports: [LmsSharedModule, RouterModule.forChild(bookLendingRoute)],
  declarations: [BookLendingComponent, BookLendingDetailComponent, BookLendingUpdateComponent, BookLendingDeleteDialogComponent],
  entryComponents: [BookLendingDeleteDialogComponent],
})
export class LmsBookLendingModule {}
