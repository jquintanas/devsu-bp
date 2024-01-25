import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextualMenuComponent } from './contextual-menu.component';

describe('ContextualMenuComponent', () => {
  let component: ContextualMenuComponent;
  let fixture: ComponentFixture<ContextualMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContextualMenuComponent]
    });
    fixture = TestBed.createComponent(ContextualMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click editar', () => {
    let value = false;
    component.editarEvent.subscribe(val => value = val);
    component.editarRegistro();
    expect(value).toBe(true);
  });

  it('click eliminar', () => {
    let value = false;
    component.eliminarEvent.subscribe(val => value = val);
    component.deleteRegistro();
    expect(value).toBe(true);
  });
});
