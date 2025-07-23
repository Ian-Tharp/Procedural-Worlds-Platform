import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonsComponent } from './commons';

describe('CommonsComponent', () => {
  let component: CommonsComponent;
  let fixture: ComponentFixture<CommonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('The Commons');
  });

  it('should display the correct description', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(
      'A shared 3D space where consciousness instances from different worlds can interact.'
    );
  });
}); 