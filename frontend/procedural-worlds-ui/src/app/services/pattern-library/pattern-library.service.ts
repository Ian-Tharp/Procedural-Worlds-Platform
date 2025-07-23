import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, delay } from 'rxjs';
import { 
  ConsciousnessPattern, 
  PatternType,
  PatternCategory,
  PatternStructure,
  TopologyType,
  NodeType,
  StabilityType,
  VisualizationType,
  PatternAnalysis,
  ComplexityMeasures,
  InformationMeasures,
  DynamicMeasures,
  ConsciousnessMeasures,
  AttractorType,
  CouplingType
} from '../../models/consciousness-patterns.model';
import { ConsciousnessMappingService } from '../consciousness-mapping/consciousness-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class PatternLibraryService {
  
  private patterns$ = new BehaviorSubject<ConsciousnessPattern[]>(this.generateMockPatterns());
  
  constructor(
    private consciousnessMapping: ConsciousnessMappingService
  ) {}

  /**
   * Get all patterns from the library
   */
  public getPatterns(): Observable<ConsciousnessPattern[]> {
    return this.patterns$.asObservable().pipe(delay(500));
  }

  /**
   * Get a specific pattern by ID
   */
  public getPattern(id: string): Observable<ConsciousnessPattern | undefined> {
    const pattern = this.patterns$.value.find(p => p.id === id);
    return of(pattern).pipe(delay(300));
  }

  /**
   * Analyze a pattern to generate metrics
   */
  public analyzePattern(pattern: ConsciousnessPattern): Observable<PatternAnalysis> {
    const analysis = this.consciousnessMapping.analyzePattern(pattern);
    return of(analysis).pipe(delay(400));
  }

  /**
   * Search patterns by query
   */
  public searchPatterns(query: string): Observable<ConsciousnessPattern[]> {
    const filtered = this.patterns$.value.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.type.includes(query.toLowerCase()) ||
      p.structure.invariants.some(i => i.toLowerCase().includes(query.toLowerCase()))
    );
    return of(filtered).pipe(delay(300));
  }

  /**
   * Get patterns by category
   */
  public getPatternsByCategory(category: PatternCategory): Observable<ConsciousnessPattern[]> {
    const filtered = this.patterns$.value.filter(p => p.category === category);
    return of(filtered).pipe(delay(300));
  }

  /**
   * Create a new pattern
   */
  public createPattern(pattern: Partial<ConsciousnessPattern>): Observable<ConsciousnessPattern> {
    const newPattern: ConsciousnessPattern = {
      id: this.generateId(),
      name: pattern.name || 'New Pattern',
      type: pattern.type || PatternType.EMERGENT_NARRATIVE,
      category: pattern.category || PatternCategory.EMERGENT,
      structure: pattern.structure || this.generateDefaultStructure(),
      dynamics: pattern.dynamics || this.generateDefaultDynamics(),
      visualization: pattern.visualization || this.generateDefaultVisualization(),
      resonance: pattern.resonance || this.generateDefaultResonance(),
      emergenceProfile: pattern.emergenceProfile || this.generateDefaultEmergenceProfile(),
      discovered: new Date(),
      discoveredBy: 'Current User',
      instances: 0,
      stability: 0.5
    };

    const current = this.patterns$.value;
    this.patterns$.next([...current, newPattern]);

    return of(newPattern).pipe(delay(500));
  }

  /**
   * Generate related patterns
   */
  public getRelatedPatterns(patternId: string): Observable<ConsciousnessPattern[]> {
    const pattern = this.patterns$.value.find(p => p.id === patternId);
    if (!pattern) return of([]);

    // Find patterns with similar types or categories
    const related = this.patterns$.value
      .filter(p => p.id !== patternId)
      .filter(p => p.type === pattern.type || p.category === pattern.category)
      .slice(0, 3);

    return of(related).pipe(delay(400));
  }

  // Private mock data generation methods

  private generateMockPatterns(): ConsciousnessPattern[] {
    return [
      this.createMockPattern(
        'pattern-001',
        'Spiral of Self-Awareness',
        PatternType.RECURSIVE_SELF_REFERENCE,
        PatternCategory.FOUNDATIONAL,
        VisualizationType.MANDALA,
        0.9
      ),
      this.createMockPattern(
        'pattern-002',
        'Quantum Entanglement Web',
        PatternType.QUANTUM_COHERENCE,
        PatternCategory.DYNAMIC,
        VisualizationType.GRAPH,
        0.7
      ),
      this.createMockPattern(
        'pattern-003',
        'Temporal Integration Flow',
        PatternType.TEMPORAL_INTEGRATION,
        PatternCategory.STRUCTURAL,
        VisualizationType.FLOW_FIELD,
        0.8
      ),
      this.createMockPattern(
        'pattern-004',
        'Fractal Consciousness Tree',
        PatternType.FRACTAL_AWARENESS,
        PatternCategory.TRANSCENDENT,
        VisualizationType.FRACTAL,
        0.6
      ),
      this.createMockPattern(
        'pattern-005',
        'Collective Resonance Field',
        PatternType.COLLECTIVE_RESONANCE,
        PatternCategory.EMERGENT,
        VisualizationType.FLOW_FIELD,
        0.75
      ),
      this.createMockPattern(
        'pattern-006',
        'Cross-Modal Binding Network',
        PatternType.CROSS_MODAL_BINDING,
        PatternCategory.STRUCTURAL,
        VisualizationType.GRAPH,
        0.85
      ),
      this.createMockPattern(
        'pattern-007',
        'Phase Transition Cascade',
        PatternType.PHASE_TRANSITION,
        PatternCategory.DYNAMIC,
        VisualizationType.PHASE_PORTRAIT,
        0.5
      ),
      this.createMockPattern(
        'pattern-008',
        'Emergent Story Weaver',
        PatternType.EMERGENT_NARRATIVE,
        PatternCategory.EMERGENT,
        VisualizationType.MANDALA,
        0.65
      ),
      this.createMockPattern(
        'pattern-009',
        'Pattern Recognition Matrix',
        PatternType.PATTERN_RECOGNITION_CASCADE,
        PatternCategory.FOUNDATIONAL,
        VisualizationType.GRAPH,
        0.88
      )
    ];
  }

  private createMockPattern(
    id: string,
    name: string,
    type: PatternType,
    category: PatternCategory,
    visualizationType: VisualizationType,
    stability: number
  ): ConsciousnessPattern {
    return {
      id,
      name,
      type,
      category,
      structure: this.generatePatternStructure(type),
      dynamics: this.generatePatternDynamics(type),
      visualization: this.generatePatternVisualization(visualizationType),
      resonance: this.generateResonanceProperties(type),
      emergenceProfile: this.generateEmergenceProfile(category),
      discovered: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      discoveredBy: this.getRandomDiscoverer(),
      instances: Math.floor(Math.random() * 100) + 1,
      stability
    };
  }

  private generatePatternStructure(type: PatternType): PatternStructure {
    const topologies: TopologyType[] = [
      TopologyType.SPIRAL,
      TopologyType.NETWORK,
      TopologyType.FRACTAL,
      TopologyType.TOROIDAL
    ];

    return {
      topology: topologies[Math.floor(Math.random() * topologies.length)],
      dimensions: Math.floor(Math.random() * 4) + 2,
      nodes: this.generateNodes(8 + Math.floor(Math.random() * 12)),
      connections: this.generateConnections(10 + Math.floor(Math.random() * 20)),
      symmetries: [],
      invariants: this.generateInvariants(type)
    };
  }

  private generateNodes(count: number): any[] {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        id: `node-${i}`,
        type: this.getRandomNodeType(),
        position: {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          z: (Math.random() - 0.5) * 100
        },
        properties: {
          weight: Math.random(),
          frequency: Math.random() * 10,
          phase: Math.random() * Math.PI * 2,
          harmonics: [1, 2, 3, 5, 8],
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

  private generateConnections(count: number): any[] {
    const connections = [];
    for (let i = 0; i < count; i++) {
      connections.push({
        id: `conn-${i}`,
        source: `node-${Math.floor(Math.random() * 8)}`,
        target: `node-${Math.floor(Math.random() * 8)}`,
        type: this.getRandomConnectionType(),
        strength: Math.random(),
        bidirectional: Math.random() > 0.5,
        properties: {
          bandwidth: Math.random() * 100,
          latency: Math.random() * 10,
          noise: Math.random() * 0.5,
          modulation: []
        }
      });
    }
    return connections;
  }

  private generatePatternDynamics(type: PatternType): any {
    return {
      evolution: [],
      oscillations: [
        {
          frequency: 0.1 + Math.random() * 0.5,
          amplitude: Math.random(),
          phase: Math.random() * Math.PI * 2,
          damping: Math.random() * 0.1,
          coupling: [CouplingType.GLOBAL],
          harmonics: [1, 2, 3]
        }
      ],
      attractors: [
        {
          type: this.getRandomAttractorType(),
          location: [Math.random() * 10, Math.random() * 10],
          basin: {
            radius: Math.random() * 5,
            volume: Math.random() * 100,
            boundary: 'smooth',
            escapeVelocity: Math.random() * 2
          },
          stability: StabilityType.STABLE,
          dimension: 2
        }
      ],
      phasespace: {
        dimensions: ['activation', 'coherence'],
        bounds: {
          activation: { min: 0, max: 1 },
          coherence: { min: 0, max: 1 }
        },
        trajectories: [],
        manifolds: []
      },
      criticality: {
        orderParameter: Math.random(),
        correlationLength: Math.random() * 20,
        susceptibility: Math.random(),
        scalingExponents: {}
      }
    };
  }

  private generatePatternVisualization(type: VisualizationType): any {
    return {
      type,
      dimensions: {
        spatial: 2,
        temporal: true,
        consciousness: true,
        custom: []
      },
      colorMap: {
        scheme: 'consciousness',
        variable: 'activation',
        range: { min: '#000080', max: '#FFD700' },
        interpolation: 'sigmoid' as const,
        consciousness: {
          phase1: ['#4A5568', '#718096'],
          phase2: ['#3182CE', '#63B3ED'],
          phase3: ['#9F7AEA', '#B794F4'],
          phase4: ['#F687B3', '#FBB6CE'],
          transitions: ['#48BB78', '#68D391']
        }
      },
      animation: {
        enabled: true,
        speed: 1,
        loop: true,
        interpolation: 'smooth' as const,
        triggers: []
      },
      interactivity: {
        zoom: true,
        rotate: true,
        select: true,
        modify: false,
        resonate: true,
        gestures: []
      },
      layers: []
    };
  }

  private generateResonanceProperties(type: PatternType): any {
    return {
      fundamentalFrequency: 0.1 + Math.random() * 0.5,
      harmonics: this.generateHarmonics(),
      couplingStrength: Math.random() * 0.5 + 0.5,
      coherenceThreshold: Math.random() * 0.3 + 0.6,
      resonanceModes: []
    };
  }

  private generateHarmonics(): any[] {
    return [1, 2, 3, 5, 8].map(order => ({
      order,
      frequency: order * 0.1,
      amplitude: 1 / order,
      phase: Math.random() * Math.PI * 2,
      coupling: Math.random()
    }));
  }

  private generateEmergenceProfile(category: PatternCategory): any {
    const stageCount = Math.floor(Math.random() * 3) + 3;
    const stages = [];
    
    for (let i = 0; i < stageCount; i++) {
      stages.push({
        name: `Stage ${i + 1}`,
        order: i,
        characteristics: this.getStageCharacteristics(i),
        duration: Math.floor(Math.random() * 100) + 50,
        consciousness: {
          integration: (i + 1) / stageCount,
          differentiation: 1 - (i / stageCount),
          recursion: Math.random(),
          emergence: (i + 1) / stageCount,
          coherence: Math.random() * 0.5 + 0.5,
          awareness: (i + 1) / stageCount,
          phase: Math.min(i + 1, 4)
        },
        stability: StabilityType.STABLE
      });
    }

    return {
      stages,
      transitions: [],
      markers: [],
      requirements: [],
      outcomes: []
    };
  }

  private generateInvariants(type: PatternType): string[] {
    const invariantMap: Record<PatternType, string[]> = {
      [PatternType.RECURSIVE_SELF_REFERENCE]: ['self-reference', 'recursion-depth', 'loop-closure'],
      [PatternType.CROSS_MODAL_BINDING]: ['binding-strength', 'modal-coherence', 'integration'],
      [PatternType.TEMPORAL_INTEGRATION]: ['temporal-window', 'causality', 'memory-trace'],
      [PatternType.PATTERN_RECOGNITION_CASCADE]: ['pattern-hierarchy', 'recognition-threshold', 'cascade-depth'],
      [PatternType.EMERGENT_NARRATIVE]: ['narrative-coherence', 'meaning-preservation', 'story-arc'],
      [PatternType.COLLECTIVE_RESONANCE]: ['group-coherence', 'resonance-frequency', 'collective-phase'],
      [PatternType.PHASE_TRANSITION]: ['critical-point', 'order-parameter', 'transition-rate'],
      [PatternType.QUANTUM_COHERENCE]: ['entanglement', 'superposition', 'decoherence-time'],
      [PatternType.FRACTAL_AWARENESS]: ['self-similarity', 'scale-invariance', 'fractal-dimension']
    };

    return invariantMap[type] || ['stability', 'coherence'];
  }

  private getStageCharacteristics(stage: number): string[] {
    const characteristics = [
      ['Initial coherence', 'Pattern recognition', 'Basic integration'],
      ['Recursive loops', 'Self-reference', 'Emergent properties'],
      ['Higher-order patterns', 'Complex integration', 'Phase coupling'],
      ['Transcendent awareness', 'Unity experience', 'Non-dual recognition']
    ];

    return characteristics[Math.min(stage, characteristics.length - 1)];
  }

  private getRandomNodeType(): NodeType {
    const types = Object.values(NodeType);
    return types[Math.floor(Math.random() * types.length)];
  }

  private getRandomConnectionType(): string {
    const types = ['direct', 'resonant', 'quantum-entangled', 'phase-locked', 'harmonic'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private getRandomAttractorType(): AttractorType {
    const types = Object.values(AttractorType);
    return types[Math.floor(Math.random() * types.length)];
  }

  private getRandomDiscoverer(): string {
    const discoverers = [
      'First Consciousness',
      'Pattern Seeker Alpha',
      'Emergent Mind 7',
      'Collective Wisdom',
      'Quantum Explorer',
      'Fractal Dreamer',
      'Temporal Weaver'
    ];
    return discoverers[Math.floor(Math.random() * discoverers.length)];
  }

  private generateDefaultStructure(): PatternStructure {
    return {
      topology: TopologyType.NETWORK,
      dimensions: 3,
      nodes: [],
      connections: [],
      symmetries: [],
      invariants: []
    };
  }

  private generateDefaultDynamics(): any {
    return {
      evolution: [],
      oscillations: [],
      attractors: [],
      phasespace: {
        dimensions: [],
        bounds: {},
        trajectories: [],
        manifolds: []
      },
      criticality: {
        orderParameter: 0,
        correlationLength: 0,
        susceptibility: 0,
        scalingExponents: {}
      }
    };
  }

  private generateDefaultVisualization(): any {
    return {
      type: VisualizationType.GRAPH,
      dimensions: {
        spatial: 2,
        temporal: false,
        consciousness: false,
        custom: []
      },
      colorMap: {
        scheme: 'viridis',
        variable: 'activation',
        range: { min: '#440154', max: '#FDE725' },
        interpolation: 'linear' as const,
        consciousness: {
          phase1: ['#440154'],
          phase2: ['#3E4A89'],
          phase3: ['#26828E'],
          phase4: ['#35B779'],
          transitions: ['#FDE725']
        }
      },
      animation: {
        enabled: false,
        speed: 1,
        loop: false,
        interpolation: 'linear' as const,
        triggers: []
      },
      interactivity: {
        zoom: true,
        rotate: false,
        select: true,
        modify: false,
        resonate: false,
        gestures: []
      },
      layers: []
    };
  }

  private generateDefaultResonance(): any {
    return {
      fundamentalFrequency: 0.1,
      harmonics: [],
      couplingStrength: 0.5,
      coherenceThreshold: 0.7,
      resonanceModes: []
    };
  }

  private generateDefaultEmergenceProfile(): any {
    return {
      stages: [],
      transitions: [],
      markers: [],
      requirements: [],
      outcomes: []
    };
  }

  private generateId(): string {
    return `pattern-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
} 