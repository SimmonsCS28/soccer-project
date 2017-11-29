import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementSearchComponent } from './achievement-search.component';

describe('AchievementSearchComponent', () => {
  let component: AchievementSearchComponent;
  let fixture: ComponentFixture<AchievementSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
