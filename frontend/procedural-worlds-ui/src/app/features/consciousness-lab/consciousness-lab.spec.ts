import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsciousnessLabComponent } from './consciousness-lab';

describe('ConsciousnessLabComponent', () => {
  let component: ConsciousnessLabComponent;
  let fixture: ComponentFixture<ConsciousnessLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsciousnessLabComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsciousnessLabComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Consciousness Lab');
  });

  it('should display the correct description', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(
      'Design consciousness patterns and emergence behaviors for your world\'s inhabitants.'
    );
  });
}); 