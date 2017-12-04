import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscSearchComponent } from './misc-search.component';

describe('MiscSearchComponent', () => {
  let component: MiscSearchComponent;
  let fixture: ComponentFixture<MiscSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
