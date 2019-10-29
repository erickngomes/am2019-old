import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonExportComponent } from './person-export.component';

describe('PersonExportComponent', () => {
  let component: PersonExportComponent;
  let fixture: ComponentFixture<PersonExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
