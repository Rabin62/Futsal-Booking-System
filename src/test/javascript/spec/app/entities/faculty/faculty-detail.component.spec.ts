import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LmsTestModule } from '../../../test.module';
import { FacultyDetailComponent } from 'app/entities/faculty/faculty-detail.component';
import { Faculty } from 'app/shared/model/faculty.model';

describe('Component Tests', () => {
  describe('Faculty Management Detail Component', () => {
    let comp: FacultyDetailComponent;
    let fixture: ComponentFixture<FacultyDetailComponent>;
    const route = ({ data: of({ faculty: new Faculty(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LmsTestModule],
        declarations: [FacultyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FacultyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacultyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load faculty on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.faculty).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
