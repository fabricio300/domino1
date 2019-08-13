import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Juego1Page } from './juego1.page';

describe('Juego1Page', () => {
  let component: Juego1Page;
  let fixture: ComponentFixture<Juego1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Juego1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Juego1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
