import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentsListPage } from './residents-list-page';

describe('ResidentsListPage', () => {
  let component: ResidentsListPage;
  let fixture: ComponentFixture<ResidentsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentsListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
