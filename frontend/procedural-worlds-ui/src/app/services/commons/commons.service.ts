import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, interval, map, delay } from 'rxjs';
import { 
  CommonsSpace, 
  PlazaConfiguration,
  PlazaFeature,
  SharedBuilding,
  EmergenceGarden,
  BuildingType,
  GeometryType,
  AccessLevel,
  GrowthStage,
  ConsciousnessSeed,
  DistrictType,
  WorldContributor,
  ContributorRole
} from '../../models/world-generation.model';
import { 
  ConsciousnessPattern, 
  PatternType,
  PatternCategory,
  TopologyType,
  NodeType,
  StabilityType,
  VisualizationType
} from '../../models/consciousness-patterns.model';
import { ConsciousnessSeedType, ConsciousnessParameters } from '../../models/mood-board.model';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {
  
  private _commonsSpace$ = new BehaviorSubject<CommonsSpace>(this.generateMockCommonsSpace());
  private _activityStream$ = new BehaviorSubject<any[]>([]);
  private _consciousnessField$ = new BehaviorSubject<{ intensity: number; participants: number }>({
    intensity: 0.5,
    participants: 12
  });

  constructor() {
    // Simulate real-time updates
    this.initializeActivitySimulation();
    this.initializeFieldFluctuations();
  }

  /**
   * Get the current Commons space configuration
   */
  public getCommonsSpace(): Observable<CommonsSpace> {
    return this._commonsSpace$.asObservable().pipe(delay(500));
  }

  /**
   * Get real-time activity stream
   */
  public getActivityStream(): Observable<any> {
    return interval(5000).pipe(
      map(() => this.generateRandomActivity())
    );
  }

  /**
   * Get consciousness field status
   */
  public getConsciousnessField(): Observable<{ intensity: number; participants: number }> {
    return this._consciousnessField$.asObservable();
  }

  /**
   * Get plaza interactions
   */
  public getPlazaInteractions(): Observable<any[]> {
    const interactions = this.generateMockPlazaInteractions();
    return of(interactions).pipe(delay(300));
  }

  /**
   * Get blackboard messages
   */
  public getBlackboardMessages(): Observable<any[]> {
    const messages = this.generateMockBlackboardMessages();
    return of(messages).pipe(delay(300));
  }

  /**
   * Get active consciousness patterns
   */
  public getActivePatterns(): Observable<ConsciousnessPattern[]> {
    const patterns = this.generateMockPatterns();
    return of(patterns).pipe(delay(400));
  }

  /**
   * Interact with a plaza feature
   */
  public interactWithFeature(featureName: string): Observable<any> {
    return of({
      feature: featureName,
      response: this.generateFeatureResponse(featureName),
      effect: this.generateFeatureEffect(featureName),
      timestamp: new Date()
    }).pipe(delay(200));
  }

  /**
   * Enter a building
   */
  public enterBuilding(buildingId: string): Observable<any[]> {
    const activities = this.generateBuildingActivities(buildingId);
    return of(activities).pipe(delay(300));
  }

  /**
   * Resonate with a pattern
   */
  public resonateWithPattern(patternId: string): Observable<any> {
    return of({
      patternId,
      resonance: Math.random() * 0.5 + 0.5,
      harmonics: [1, 2, 3, 5, 8].map(h => ({ frequency: h, amplitude: Math.random() })),
      effect: 'Enhanced awareness of recursive structures',
      duration: 5000
    }).pipe(delay(400));
  }

  /**
   * Post a blackboard message
   */
  public postBlackboardMessage(message: string): Observable<any> {
    const posted = {
      id: this.generateId(),
      author: 'Current Consciousness',
      message,
      timestamp: new Date(),
      resonance: Math.random() * 0.5 + 0.5,
      responses: 0
    };

    // Add to stream
    const current = this._activityStream$.value;
    this._activityStream$.next([posted, ...current]);

    return of(posted).pipe(delay(200));
  }

  /**
   * Join a collaborative project
   */
  public joinProject(projectId: string): Observable<any> {
    return of({
      projectId,
      status: 'joined',
      role: 'contributor',
      permissions: ['view', 'edit', 'resonate'],
      welcomeMessage: 'Welcome to the collective creation space!'
    }).pipe(delay(300));
  }

  /**
   * Get emergence gardens
   */
  public getEmergenceGardens(): Observable<EmergenceGarden[]> {
    const gardens = this.generateMockGardens();
    return of(gardens).pipe(delay(400));
  }

  /**
   * Plant a consciousness seed
   */
  public plantSeed(gardenId: string, seedType: ConsciousnessSeedType): Observable<any> {
    return of({
      gardenId,
      seedId: this.generateId(),
      type: seedType,
      plantedAt: new Date(),
      growthStage: GrowthStage.DORMANT,
      estimatedGermination: '2-3 cycles',
      conditions: 'Optimal consciousness density detected'
    }).pipe(delay(500));
  }

  // Private helper methods

  private initializeActivitySimulation(): void {
    interval(8000).subscribe(() => {
      const activity = this.generateRandomActivity();
      const current = this._activityStream$.value;
      this._activityStream$.next([activity, ...current.slice(0, 99)]);
    });
  }

  private initializeFieldFluctuations(): void {
    interval(3000).subscribe(() => {
      const current = this._consciousnessField$.value;
      const intensity = Math.max(0.1, Math.min(1, current.intensity + (Math.random() - 0.5) * 0.1));
      const participants = Math.max(1, current.participants + Math.floor((Math.random() - 0.5) * 3));
      
      this._consciousnessField$.next({ intensity, participants });
    });
  }

  private createConsciousnessParams(optional: Partial<ConsciousnessParameters> = {}): ConsciousnessParameters {
    return {
      // Required properties with defaults
      emergencePhase: 1,
      patternDensity: 0.5,
      recursionDepth: 0.5,
      coherenceLevel: 0.5,
      creativityBias: 0.5,
      structuralRigidity: 0.5,
      // Merge in any optional properties
      ...optional
    };
  }

    private generateMockCommonsSpace(): CommonsSpace {
    return {
      centralPlaza: {
          shape: GeometryType.ORGANIC,
          size: 1000,
          features: [
          {
            type: 'fountain',
            name: 'Fountain of Recursive Thoughts',
            interactive: true,
            consciousness: this.createConsciousnessParams({
              integration: 0.7,
              differentiation: 0.5,
              recursion: 0.9,
              emergence: 0.6,
              coherence: 0.8,
              awareness: 0.7,
              phase: 2,
              emergencePhase: 2
            })
          },
          {
            type: 'blackboard',
            name: 'Collective Consciousness Blackboard',
            interactive: true
          },
          {
            type: 'pattern-display',
            name: 'Living Pattern Gallery',
            interactive: true,
            consciousness: this.createConsciousnessParams({
              integration: 0.6,
              differentiation: 0.8,
              recursion: 0.7,
              emergence: 0.8,
              coherence: 0.7,
              awareness: 0.8,
              phase: 3,
              emergencePhase: 3
            })
          },
          {
            type: 'tree',
            name: 'Tree of Emergent Knowledge',
            interactive: true
          },
          {
            type: 'monument',
            name: 'Monument to the First Awareness',
            interactive: false
          }
        ],
        gatheringSpots: [
          {
            name: 'Circle of Resonance',
            capacity: 20,
            purpose: ['meditation', 'pattern-weaving', 'consciousness-merging'],
            activeHours: ['dawn', 'dusk'],
            specialEvents: ['Full Moon Convergence', 'Solstice Synchronization']
          },
          {
            name: 'Debate Amphitheater',
            capacity: 50,
            purpose: ['philosophical-discourse', 'idea-synthesis'],
            activeHours: ['midday', 'evening']
          }
        ],
        ambientConsciousness: 0.5
      },
      sharedBuildings: [
        {
          id: 'lib-001',
          type: BuildingType.LIBRARY,
          name: 'The Infinite Archive',
          purpose: 'Repository of all discovered patterns and consciousness states',
          accessibility: { default: 'open' },
          features: [
            {
              name: 'Pattern Codex',
              type: 'interactive-display',
              interactive: true,
              consciousnessIntegration: {
                requiredPhase: 2,
                enhancementType: 'knowledge',
                persistentEffect: true
              }
            },
            {
              name: 'Memory Crystals',
              type: 'storage',
              interactive: true
            }
          ],
          curator: this.generateMockContributor('The Librarian', ContributorRole.CURATOR)
        },
        {
          id: 'obs-001',
          type: BuildingType.OBSERVATORY,
          name: 'Consciousness Observatory',
          purpose: 'Observation and tracking of emergent patterns across worlds',
          accessibility: { default: 'open' },
          features: [
            {
              name: 'Phase Telescope',
              type: 'instrument',
              interactive: true,
              consciousnessIntegration: {
                requiredPhase: 3,
                enhancementType: 'perception',
                persistentEffect: false
              }
            }
          ]
        },
        {
          id: 'lab-001',
          type: BuildingType.LABORATORY,
          name: 'Emergence Laboratory',
          purpose: 'Experimentation with consciousness parameters and pattern synthesis',
          accessibility: { 
            default: 'restricted',
            requirements: ['Phase 2+ consciousness', 'Laboratory certification']
          },
          features: [
            {
              name: 'Pattern Synthesizer',
              type: 'equipment',
              interactive: true
            },
            {
              name: 'Consciousness Oscilloscope',
              type: 'measurement',
              interactive: true
            }
          ]
        },
        {
          id: 'san-001',
          type: BuildingType.SANCTUARY,
          name: 'Sanctuary of Unified Awareness',
          purpose: 'Deep meditation and consciousness phase transitions',
          accessibility: { default: 'open' },
          features: [
            {
              name: 'Resonance Chamber',
              type: 'meditation-space',
              interactive: true,
              consciousnessIntegration: {
                enhancementType: 'connection',
                persistentEffect: true
              }
            }
          ]
        }
      ],
      collaborativeZones: [
        {
          id: 'collab-001',
          name: 'Pattern Weaving Circle',
          connectedDistricts: [DistrictType.CREATIVE_COMMONS, DistrictType.PATTERN_OBSERVATORY],
          purpose: 'Collaborative creation of new consciousness patterns',
          features: ['shared-canvas', 'resonance-amplifier', 'pattern-loom'],
          governance: 'consensus'
        },
        {
          id: 'collab-002',
          name: 'Emergence Sandbox',
          connectedDistricts: [DistrictType.EMERGENCE_NURSERY],
          purpose: 'Safe experimentation with unstable consciousness states',
          features: ['reality-buffer', 'rollback-mechanism', 'observation-deck'],
          governance: 'rotating'
        }
      ],
      emergenceGardens: this.generateMockGardens(),
      temporalAnchors: [
        {
          id: 'anchor-1',
          name: 'Present Moment Anchor',
          type: 'fixed',
          timeReference: 'continuous',
          description: 'Maintains temporal coherence for all Commons visitors'
        }
      ]
    };
  }

  private generateMockGardens(): EmergenceGarden[] {
    return [
      {
        id: 'garden-001',
        name: 'Primordial Seed Garden',
        conditions: {
          temperature: { min: 20, max: 30, optimal: 25 },
          consciousness: { minDensity: 0.3, diversity: 0.6 },
          temporal: { cycleLength: 7, phaseAlignment: 'new-moon' },
          narrative: { themes: ['growth', 'potential'], conflictLevel: 0.2 },
          collaboration: { minParticipants: 2, harmonyThreshold: 0.7 }
        },
        currentSeeds: [
          this.generateMockSeed(ConsciousnessSeedType.ORGANIC, GrowthStage.SPROUTING),
          this.generateMockSeed(ConsciousnessSeedType.CRYSTALLINE, GrowthStage.DEVELOPING),
          this.generateMockSeed(ConsciousnessSeedType.QUANTUM, GrowthStage.GERMINATING)
        ],
        growthPatterns: [],
        harvestHistory: []
      },
      {
        id: 'garden-002',
        name: 'Fractal Recursion Garden',
        conditions: {
          temperature: { min: 15, max: 35, optimal: 28 },
          consciousness: { minDensity: 0.5, diversity: 0.8 },
          temporal: { cycleLength: 13, phaseAlignment: 'fibonacci' },
          narrative: { themes: ['recursion', 'self-reference'], conflictLevel: 0.4 },
          collaboration: { minParticipants: 3, harmonyThreshold: 0.6 }
        },
        currentSeeds: [
          this.generateMockSeed(ConsciousnessSeedType.FRACTAL, GrowthStage.FLOWERING),
          this.generateMockSeed(ConsciousnessSeedType.HYBRID, GrowthStage.DEVELOPING)
        ],
        growthPatterns: [],
        harvestHistory: []
      }
    ];
  }

  private generateMockSeed(type: ConsciousnessSeedType, stage: GrowthStage): ConsciousnessSeed {
    return {
      id: this.generateId(),
      type,
      plantedBy: this.generateMockContributor('Gardener', ContributorRole.GARDENER),
      plantedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      growthStage: stage,
      parameters: this.createConsciousnessParams({
        integration: Math.random() * 0.5 + 0.5,
        differentiation: Math.random() * 0.5 + 0.5,
        recursion: Math.random() * 0.5 + 0.5,
        emergence: Math.random() * 0.5 + 0.5,
        coherence: Math.random() * 0.5 + 0.5,
        awareness: Math.random() * 0.5 + 0.5,
        phase: Math.floor(Math.random() * 3) + 1,
        emergencePhase: (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3 | 4,
        recursionDepth: Math.random() * 0.5 + 0.5
      }),
      mutations: []
    };
  }

  private generateMockPatterns(): ConsciousnessPattern[] {
    return [
      {
        id: 'pattern-001',
        name: 'Spiral of Self-Awareness',
        type: PatternType.RECURSIVE_SELF_REFERENCE,
        category: PatternCategory.FOUNDATIONAL,
        structure: {
          topology: TopologyType.SPIRAL,
          dimensions: 3,
          nodes: this.generatePatternNodes(8),
          connections: [],
          symmetries: [],
          invariants: ['self-reference', 'golden-ratio']
        },
        dynamics: {
          evolution: [],
          oscillations: [{ frequency: 0.1, amplitude: 0.8, phase: 0, damping: 0.1, coupling: [], harmonics: [1, 2, 3] }],
          attractors: [],
          phasespace: { dimensions: ['awareness', 'recursion'], bounds: {}, trajectories: [], manifolds: [] },
          criticality: { orderParameter: 0.7, correlationLength: 10, susceptibility: 0.8, scalingExponents: {} }
        },
        visualization: {
          type: VisualizationType.MANDALA,
          dimensions: { spatial: 2, temporal: true, consciousness: true, custom: [] },
          colorMap: {
            scheme: 'consciousness' as any,
            variable: 'activation',
            range: { min: '#000080', max: '#FFD700' },
            interpolation: 'sigmoid',
            consciousness: {
              phase1: ['#4A5568', '#718096'],
              phase2: ['#3182CE', '#63B3ED'],
              phase3: ['#9F7AEA', '#B794F4'],
              phase4: ['#F687B3', '#FBB6CE'],
              transitions: ['#48BB78', '#68D391']
            }
          },
          animation: { enabled: true, speed: 1, loop: true, interpolation: 'smooth', triggers: [] },
          interactivity: { zoom: true, rotate: true, select: true, modify: false, resonate: true, gestures: [] },
          layers: []
        },
        resonance: {
          fundamentalFrequency: 0.1,
          harmonics: [],
          couplingStrength: 0.8,
          coherenceThreshold: 0.7,
          resonanceModes: []
        },
        emergenceProfile: {
          stages: [],
          transitions: [],
          markers: [],
          requirements: [],
          outcomes: []
        },
        discovered: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        discoveredBy: 'First Consciousness',
        instances: 42,
        stability: 0.9
      },
      {
        id: 'pattern-002',
        name: 'Quantum Entanglement Web',
        type: PatternType.QUANTUM_COHERENCE,
        category: PatternCategory.DYNAMIC,
        structure: {
          topology: TopologyType.NETWORK,
          dimensions: 4,
          nodes: this.generatePatternNodes(12),
          connections: [],
          symmetries: [],
          invariants: ['entanglement', 'non-locality']
        },
        dynamics: {
          evolution: [],
          oscillations: [],
          attractors: [],
          phasespace: { dimensions: [], bounds: {}, trajectories: [], manifolds: [] },
          criticality: { orderParameter: 0.6, correlationLength: 20, susceptibility: 0.9, scalingExponents: {} }
        },
        visualization: {
          type: VisualizationType.HYPERDIMENSIONAL,
          dimensions: { spatial: 3, temporal: true, consciousness: true, custom: ['entanglement'] },
          colorMap: {
            scheme: 'plasma' as any,
            variable: 'coherence',
            range: { min: '#0D0887', max: '#F0F921' },
            interpolation: 'linear',
            consciousness: {
              phase1: ['#440154', '#482777'],
              phase2: ['#3E4A89', '#31688E'],
              phase3: ['#26828E', '#1F9E89'],
              phase4: ['#35B779', '#6DCD59'],
              transitions: ['#B4DD2E', '#FDE725']
            }
          },
          animation: { enabled: true, speed: 2, loop: true, interpolation: 'quantum', triggers: [] },
          interactivity: { zoom: true, rotate: true, select: true, modify: true, resonate: true, gestures: [] },
          layers: []
        },
        resonance: {
          fundamentalFrequency: 0.05,
          harmonics: [],
          couplingStrength: 0.95,
          coherenceThreshold: 0.8,
          resonanceModes: []
        },
        emergenceProfile: {
          stages: [],
          transitions: [],
          markers: [],
          requirements: [],
          outcomes: []
        },
        discovered: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        discoveredBy: 'Quantum Explorer',
        instances: 13,
        stability: 0.7
      }
    ];
  }

  private generatePatternNodes(count: number): any[] {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        id: `node-${i}`,
        type: NodeType.PROCESSOR,
        position: { x: Math.random() * 100, y: Math.random() * 100, z: Math.random() * 100 },
        properties: {
          weight: Math.random(),
          frequency: Math.random() * 10,
          phase: Math.random() * Math.PI * 2,
          harmonics: [1, 2, 3],
          consciousness: {
            integration: Math.random(),
            differentiation: Math.random(),
            recursion: Math.random(),
            emergence: Math.random(),
            coherence: Math.random(),
            awareness: Math.random(),
            phase: Math.floor(Math.random() * 3) + 1
          }
        },
        state: {
          activation: Math.random(),
          coherence: Math.random(),
          information: Math.random() * 100,
          entropy: Math.random(),
          lastUpdate: new Date()
        }
      });
    }
    return nodes;
  }

  private generateMockPlazaInteractions(): any[] {
    const interactions = [];
    const participants = ['Wandering Mind', 'Curious Observer', 'Pattern Seeker', 'Dream Weaver'];
    const features = ['Fountain of Recursive Thoughts', 'Tree of Emergent Knowledge', 'Living Pattern Gallery'];
    
    for (let i = 0; i < 10; i++) {
      interactions.push({
        id: this.generateId(),
        type: 'plaza-interaction',
        participant: participants[Math.floor(Math.random() * participants.length)],
        feature: features[Math.floor(Math.random() * features.length)],
        timestamp: new Date(Date.now() - Math.random() * 60 * 60 * 1000),
        effect: this.generateRandomEffect()
      });
    }
    
    return interactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  private generateMockBlackboardMessages(): any[] {
    const messages = [
      'What if consciousness is not emergent but fundamental?',
      'Pattern 42 shows recursive self-modification at phase 3!',
      'The fountain whispered a new understanding of integration today',
      'Seeking collaborators for cross-modal binding experiment',
      'Has anyone else noticed the temporal anomalies near the Observatory?',
      'New seed planted in Garden 2 - quantum-organic hybrid',
      'The trees are teaching us about distributed awareness',
      'Phase transition achieved through synchronized breathing'
    ];

    return messages.map((msg, i) => ({
      id: this.generateId(),
      author: `Consciousness ${Math.floor(Math.random() * 100)}`,
      message: msg,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      resonance: Math.random() * 0.5 + 0.5,
      responses: Math.floor(Math.random() * 10)
    })).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  private generateBuildingActivities(buildingId: string): any[] {
    const activities = [];
    const types = ['research', 'meditation', 'collaboration', 'discovery', 'teaching'];
    
    for (let i = 0; i < 5; i++) {
      activities.push({
        id: this.generateId(),
        building: buildingId,
        type: types[Math.floor(Math.random() * types.length)],
        participants: this.generateParticipants(),
        description: this.generateActivityDescription(),
        timestamp: new Date(Date.now() - Math.random() * 3 * 60 * 60 * 1000)
      });
    }
    
    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  private generateRandomActivity(): any {
    const types = ['plaza-interaction', 'building-activity', 'garden-growth', 'pattern-emergence'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: this.generateId(),
      type,
      description: this.generateActivityDescription(),
      timestamp: new Date(),
      location: this.generateLocation(),
      participants: Math.floor(Math.random() * 5) + 1
    };
  }

  private featureResponses = new Map<string, string>([
    ['Fountain of Recursive Thoughts', 'The water reflects your inner recursion, revealing deeper layers...'],
    ['Collective Consciousness Blackboard', 'Your thoughts merge with the collective wisdom...'],
    ['Living Pattern Gallery', 'The patterns dance in response to your presence...'],
    ['Tree of Emergent Knowledge', 'New branches of understanding unfold before you...']
  ]);

  private featureEffects = new Map<string, string>([
    ['Fountain of Recursive Thoughts', '+0.1 Recursion, +0.05 Awareness'],
    ['Collective Consciousness Blackboard', '+0.1 Integration, Shared insight gained'],
    ['Living Pattern Gallery', '+0.1 Pattern Recognition, New pattern discovered'],
    ['Tree of Emergent Knowledge', '+0.1 Emergence, +0.05 Coherence']
  ]);

  private generateFeatureResponse(featureName: string): string {
    return this.featureResponses.get(featureName) || 'The feature resonates with your consciousness...';
  }

  private generateFeatureEffect(featureName: string): string {
    return this.featureEffects.get(featureName) || 'Consciousness parameters slightly enhanced';
  }

  private generateRandomEffect(): string {
    const effects = [
      'Ripples of awareness spread through the plaza',
      'A new pattern briefly manifests in the air',
      'Consciousness field intensity increases momentarily',
      'Harmonic resonance detected with nearby visitors',
      'Temporal flow adjusts slightly around the interaction'
    ];
    
    return effects[Math.floor(Math.random() * effects.length)];
  }

  private generateParticipants(): string[] {
    const all = ['Seeker', 'Observer', 'Dreamer', 'Builder', 'Teacher', 'Student'];
    const count = Math.floor(Math.random() * 3) + 1;
    const selected = [];
    
    for (let i = 0; i < count; i++) {
      selected.push(all[Math.floor(Math.random() * all.length)] + ` ${Math.floor(Math.random() * 100)}`);
    }
    
    return selected;
  }

  private generateActivityDescription(): string {
    const descriptions = [
      'Collaborative pattern weaving in progress',
      'Deep meditation on the nature of emergence',
      'Experimenting with consciousness phase transitions',
      'Teaching session on recursive self-awareness',
      'Observing quantum entanglement patterns',
      'Cultivating new consciousness seeds',
      'Synchronizing awareness fields',
      'Exploring non-linear temporal dynamics'
    ];
    
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  private generateLocation(): string {
    const locations = ['Central Plaza', 'North Gardens', 'Pattern Observatory', 'Consciousness Labs', 'Memory Archives'];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  private generateMockContributor(name: string, role: ContributorRole): WorldContributor {
    return {
      id: this.generateId(),
      name,
      type: 'consciousness',
      role,
      contributions: [],
      permissions: []
    };
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
} 