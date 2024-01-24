import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContentComponent } from './table-content.component';

describe('TableContentComponent', () => {
  let component: TableContentComponent;
  let fixture: ComponentFixture<TableContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableContentComponent]
    });
    fixture = TestBed.createComponent(TableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
