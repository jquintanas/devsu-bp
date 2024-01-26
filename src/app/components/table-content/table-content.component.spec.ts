import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContentComponent } from './table-content.component';
import { HttpClientModule } from '@angular/common/http';

describe('TableContentComponent', () => {
  let component: TableContentComponent;
  let fixture: ComponentFixture<TableContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableContentComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(TableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
