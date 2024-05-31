import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteunoComponent } from './reporteuno.component';

describe('ReporteunoComponent', () => {
  let component: ReporteunoComponent;
  let fixture: ComponentFixture<ReporteunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteunoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
