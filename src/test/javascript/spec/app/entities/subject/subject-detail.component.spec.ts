import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LmsTestModule } from '../../../test.module';
import { SubjectDetailComponent } from 'app/entities/subject/subject-detail.component';
import { Subject } from 'app/shared/model/subject.model';

describe('Component Tests', () => {
  describe('Subject Management Detail Component', () => {
    let comp: SubjectDetailComponent;
    let fixture: ComponentFixture<SubjectDetailComponent>;
    const route = ({ data: of({ subject: new Subject(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LmsTestModule],
        declarations: [SubjectDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SubjectDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubjectDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load subject on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subject).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
