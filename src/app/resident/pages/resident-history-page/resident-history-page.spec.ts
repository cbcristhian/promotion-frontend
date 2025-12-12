import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentHistoryPage } from './resident-history-page';

describe('ResidentHistoryPage', () => {
  let component: ResidentHistoryPage;
  let fixture: ComponentFixture<ResidentHistoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentHistoryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
