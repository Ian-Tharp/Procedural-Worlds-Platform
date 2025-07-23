import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldBuilderComponent } from './world-builder';

describe('WorldBuilder', () => {
  let component: WorldBuilderComponent;
  let fixture: ComponentFixture<WorldBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
