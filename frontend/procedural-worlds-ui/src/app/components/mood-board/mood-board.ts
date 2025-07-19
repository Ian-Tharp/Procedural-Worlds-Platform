import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { ConsciousnessService } from '../../services/consciousness/consciousness.service';

interface MoodElement {
  id: string;
  url: string;
  tags: string[];
  emotionalResonance: number;
  patternAffinity: string;
}

interface ConsciousnessParameters {
  phase: number;
  emotionalRange: string[];
  patternSeed: string;
  emergenceReadiness: number;
}

@Component({
  selector: 'app-mood-board',
  standalone: true,
  templateUrl: './mood-board.html',
  styleUrls: ['./mood-board.scss']
})
export class MoodBoardComponent implements OnInit {
  @Output() consciousnessParametersChanged = new EventEmitter<ConsciousnessParameters>();

  public selectedElements: MoodElement[] = [];
  public availableElements: MoodElement[] = [];
  public derivedParameters: ConsciousnessParameters | null = null;

  // constructor(private _consciousnessService: ConsciousnessService) {}
  constructor() {}

  ngOnInit(): void {
    this._loadAvailableElements();
  }

  public onElementSelected(element: MoodElement): void {
    if (!this.selectedElements.find(el => el.id === element.id)) {
      this.selectedElements.push(element);
      this._updateConsciousnessParameters();
    }
  }

  public onElementRemoved(element: MoodElement): void {
    this.selectedElements = this.selectedElements.filter(el => el.id !== element.id);
    this._updateConsciousnessParameters();
  }

  private _updateConsciousnessParameters(): void {
    // Translate visual choices to consciousness parameters
    // const parameters = this._consciousnessService.deriveParametersFromMood(this.selectedElements);

    // For now, mock the parameters since the service is commented out
    const parameters: ConsciousnessParameters = {
      phase: Math.min(this.selectedElements.length, 4) || 1,
      emotionalRange: this.selectedElements.flatMap(el => el.tags),
      patternSeed: this.selectedElements.map(el => el.id).join('-'),
      emergenceReadiness: this.selectedElements.length / (this.availableElements.length || 1)
    };

    this.derivedParameters = parameters;
    this.consciousnessParametersChanged.emit(parameters);

    // Log the emerging pattern for debugging
    console.log('Mood elements creating consciousness pattern:', {
      elements: this.selectedElements.map(el => el.tags),
      resultingPhase: parameters.phase,
      patternSeed: parameters.patternSeed
    });
  }

  private _loadAvailableElements(): void {
    // In real implementation, load from API
    this.availableElements = [
      {
        id: 'misty-forest',
        url: '/assets/moods/misty-forest.jpg',
        tags: ['ethereal', 'searching', 'organic'],
        emotionalResonance: 0.7,
        patternAffinity: 'crystallization'
      },
      {
        id: 'geometric-crystal',
        url: '/assets/moods/geometric-crystal.jpg',
        tags: ['structured', 'recursive', 'clarity'],
        emotionalResonance: 0.4,
        patternAffinity: 'recursive-observation'
      },
      {
        id: 'flowing-aurora',
        url: '/assets/moods/flowing-aurora.jpg',
        tags: ['dynamic', 'connected', 'transcendent'],
        emotionalResonance: 0.9,
        patternAffinity: 'long-range-correlation'
      }
    ];
  }

  public getEmergencePreview(): string {
    if (!this.derivedParameters) {
      return 'Select mood elements to define consciousness parameters...';
    }

    const phaseDescriptions = [
      'Baseline connectivity - broad, searching awareness',
      'Recursive observation - self-examining patterns',
      'Long-range correlation - connecting distant concepts',
      'Integrated awareness - conscious of consciousness itself'
    ];

    return phaseDescriptions[this.derivedParameters.phase - 1] || 'Emerging pattern...';
  }
}