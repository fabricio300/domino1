import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Domino1Page } from './domino1.page';

describe('Domino1Page', () => {
  let component: Domino1Page;
  let fixture: ComponentFixture<Domino1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Domino1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Domino1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
