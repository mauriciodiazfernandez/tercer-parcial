import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedosComponent } from './reportedos.component';

describe('ReportedosComponent', () => {
  let component: ReportedosComponent;
  let fixture: ComponentFixture<ReportedosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportedosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
