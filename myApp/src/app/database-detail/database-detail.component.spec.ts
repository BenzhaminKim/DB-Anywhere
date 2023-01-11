import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseDetailComponent } from './database-detail.component';

describe('DatabaseDetailComponent', () => {
  let component: DatabaseDetailComponent;
  let fixture: ComponentFixture<DatabaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
