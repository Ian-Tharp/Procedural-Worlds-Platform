import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodBoard } from './mood-board';

describe('MoodBoard', () => {
  let component: MoodBoard;
  let fixture: ComponentFixture<MoodBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
