import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaporlarComponent } from './raporlar.component';

describe('RaporlarComponent', () => {
  let component: RaporlarComponent;
  let fixture: ComponentFixture<RaporlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaporlarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaporlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
