import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCreateComponent } from './database-create.component';

describe('DatabaseCreateComponent', () => {
  let component: DatabaseCreateComponent;
  let fixture: ComponentFixture<DatabaseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
