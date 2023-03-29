import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'library',
        loadChildren: () => import('./library/library.module').then(m => m.LmsLibraryModule),
      },
      {
        path: 'librarian',
        loadChildren: () => import('./librarian/librarian.module').then(m => m.LmsLibrarianModule),
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.LmsBookModule),
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.LmsAuthorModule),
      },
      {
        path: 'faculty',
        loadChildren: () => import('./faculty/faculty.module').then(m => m.LmsFacultyModule),
      },
      {
        path: 'subject',
        loadChildren: () => import('./subject/subject.module').then(m => m.LmsSubjectModule),
      },
      {
        path: 'semester',
        loadChildren: () => import('./semester/semester.module').then(m => m.LmsSemesterModule),
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.LmsStudentModule),
      },
      {
        path: 'book-lending',
        loadChildren: () => import('./book-lending/book-lending.module').then(m => m.LmsBookLendingModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class LmsEntityModule {}
