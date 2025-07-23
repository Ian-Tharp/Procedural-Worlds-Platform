import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, map } from 'rxjs';
import { 
  ConsciousnessParameters, 
  EmotionalTone,
  ConsciousnessSeedType,
  MoodBoardItem 
} from '../../models/mood-board.model';
import { 
  ConsciousnessPattern, 
  PatternType,
  PatternAnalysis,
  ComplexityMeasures,
  InformationMeasures,
  DynamicMeasures,
  ConsciousnessMeasures
} from '../../models/consciousness-patterns.model';

@Injectable({
  providedIn: 'root'
})
export class ConsciousnessMappingService {
  
  // Color to consciousness mapping
  private colorConsciousnessMap = new Map<string, Partial<ConsciousnessParameters>>([
    // Warm colors - higher energy, integration
    ['#FF0000', { integration: 0.8, recursion: 0.6, coherence: 0.7 }], // Red
    ['#FFA500', { integration: 0.7, emergence: 0.8, coherence: 0.6 }], // Orange
    ['#FFFF00', { integration: 0.6, awareness: 0.9, coherence: 0.7 }], // Yellow
    
    // Cool colors - higher differentiation, contemplation
    ['#0000FF', { differentiation: 0.8, recursion: 0.9, coherence: 0.8 }], // Blue
    ['#4B0082', { differentiation: 0.9, emergence: 0.7, awareness: 0.8 }], // Indigo
    ['#9400D3', { differentiation: 0.7, recursion: 0.8, emergence: 0.9 }], // Violet
    
    // Neutral colors - balance
    ['#808080', { integration: 0.5, differentiation: 0.5, coherence: 0.6 }], // Gray
    ['#FFFFFF', { awareness: 0.9, coherence: 0.9, integration: 0.7 }], // White
    ['#000000', { recursion: 0.9, differentiation: 0.8, emergence: 0.5 }], // Black
  ]);

  // Pattern complexity to consciousness mapping
  private complexityThresholds = {
    low: { min: 0, max: 0.3 },
    medium: { min: 0.3, max: 0.7 },
    high: { min: 0.7, max: 1 }
  };

  // Emotional tone mappings
  private emotionalConsciousnessMap = new Map<string, Partial<ConsciousnessParameters>>([
    ['peaceful', { coherence: 0.9, integration: 0.7, awareness: 0.8 }],
    ['energetic', { integration: 0.8, emergence: 0.9, coherence: 0.6 }],
    ['mysterious', { recursion: 0.9, differentiation: 0.8, emergence: 0.7 }],
    ['chaotic', { differentiation: 0.9, emergence: 0.8, coherence: 0.3 }],
    ['harmonious', { integration: 0.9, coherence: 0.9, awareness: 0.7 }],
    ['melancholic', { recursion: 0.8, differentiation: 0.7, awareness: 0.6 }],
    ['transcendent', { awareness: 0.9, emergence: 0.9, integration: 0.8 }],
    ['grounded', { coherence: 0.8, integration: 0.6, recursion: 0.5 }]
  ]);

  /**
   * Map visual properties to consciousness parameters
   */
  public mapVisualToConsciousness(item: MoodBoardItem): ConsciousnessParameters {
    const baseParams = this.getBaseParameters(item.type);
    const colorParams = this.mapColorsToConsciousness(item.metadata.dominantColors || []);
    const complexityParams = this.mapComplexityToConsciousness(item.metadata.visualComplexity || 0.5);
    const emotionalParams = this.mapEmotionalToConsciousness(item.metadata.emotionalTone);
    
    // Combine all parameter sources with weighted averaging
    return this.combineConsciousnessParameters([
      { params: baseParams, weight: 0.25 },
      { params: colorParams, weight: 0.35 },
      { params: complexityParams, weight: 0.2 },
      { params: emotionalParams, weight: 0.2 }
    ]);
  }

  /**
   * Analyze a pattern and generate consciousness parameters
   */
  public analyzePattern(pattern: ConsciousnessPattern): PatternAnalysis {
    const complexity = this.calculateComplexityMeasures(pattern);
    const information = this.calculateInformationMeasures(pattern);
    const dynamics = this.calculateDynamicMeasures(pattern);
    const consciousness = this.calculateConsciousnessMeasures(pattern);

    return {
      complexity,
      information,
      dynamics,
      consciousness
    };
  }

  /**
   * Generate consciousness seeds from mood board items
   */
  public generateConsciousnessSeed(items: MoodBoardItem[]): Observable<ConsciousnessSeedType> {
    // Analyze collective properties
    const dominantColors = this.extractDominantColors(items);
    const averageComplexity = this.calculateAverageComplexity(items);
    const emotionalSignature = this.aggregateEmotionalTone(items);
    
          // Map to seed type based on characteristics
      const seedType = this.determineSeedType([emotionalSignature], dominantColors, averageComplexity);

    return of(seedType).pipe(
      // Simulate processing time
      map(seed => {
        console.log('Generated consciousness seed:', seed);
        return seed;
      })
    );
  }

  /**
   * Create a mapping between visual patterns and consciousness patterns
   */
  public mapVisualPatternToConsciousness(
    visualPattern: string,
    intensity = 0.5
  ): PatternType {
    const patternMap = new Map<string, PatternType>([
      ['spiral', PatternType.RECURSIVE_SELF_REFERENCE],
      ['fractal', PatternType.FRACTAL_AWARENESS],
      ['grid', PatternType.PATTERN_RECOGNITION_CASCADE],
      ['flow', PatternType.TEMPORAL_INTEGRATION],
      ['constellation', PatternType.CROSS_MODAL_BINDING],
      ['web', PatternType.COLLECTIVE_RESONANCE],
      ['vortex', PatternType.PHASE_TRANSITION],
      ['crystal', PatternType.QUANTUM_COHERENCE],
      ['organic', PatternType.EMERGENT_NARRATIVE]
    ]);

    return patternMap.get(visualPattern.toLowerCase()) || PatternType.EMERGENT_NARRATIVE;
  }

  /**
   * Calculate visual-consciousness resonance
   */
  public calculateResonance(
    visual: MoodBoardItem,
    consciousness: ConsciousnessParameters
  ): number {
    const visualParams = this.mapVisualToConsciousness(visual);
    
    // Calculate similarity between parameter sets
    const dimensions = ['integration', 'differentiation', 'recursion', 'emergence', 'coherence', 'awareness'];
    
    let totalDifference = 0;
    dimensions.forEach(dim => {
      const diff = Math.abs((visualParams as any)[dim] - (consciousness as any)[dim]);
      totalDifference += diff;
    });

    // Convert to resonance score (0-1, where 1 is perfect resonance)
    const resonance = 1 - (totalDifference / dimensions.length);
    return Math.max(0, Math.min(1, resonance));
  }

  /**
   * Generate parameter evolution trajectory
   */
  public generateEvolutionTrajectory(
    start: ConsciousnessParameters,
    end: ConsciousnessParameters,
    steps = 10
  ): ConsciousnessParameters[] {
    const trajectory: ConsciousnessParameters[] = [];
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const params: ConsciousnessParameters = {
        // Required properties
        emergencePhase: this.interpolatePhase(start.emergencePhase, end.emergencePhase, t) as 1 | 2 | 3 | 4,
        patternDensity: this.lerp(start.patternDensity, end.patternDensity, t),
        recursionDepth: this.lerp(start.recursionDepth, end.recursionDepth, t),
        coherenceLevel: this.lerp(start.coherenceLevel, end.coherenceLevel, t),
        creativityBias: this.lerp(start.creativityBias, end.creativityBias, t),
        structuralRigidity: this.lerp(start.structuralRigidity, end.structuralRigidity, t),
        seedType: t < 0.5 ? start.seedType : end.seedType,
        // Optional properties
        integration: this.lerp(start.integration || 0, end.integration || 0, t),
        differentiation: this.lerp(start.differentiation || 0, end.differentiation || 0, t),
        recursion: this.lerp(start.recursion || 0, end.recursion || 0, t),
        emergence: this.lerp(start.emergence || 0, end.emergence || 0, t),
        coherence: this.lerp(start.coherence || 0, end.coherence || 0, t),
        awareness: this.lerp(start.awareness || 0, end.awareness || 0, t),
        phase: this.interpolatePhase(start.phase || 1, end.phase || 1, t)
      };
      trajectory.push(params);
    }

    return trajectory;
  }

  /**
   * Map texture patterns to consciousness parameters
   */
  public mapTextureToConsciousness(texture: string): Partial<ConsciousnessParameters> {
    const textureMap = new Map<string, Partial<ConsciousnessParameters>>([
      ['smooth', { coherence: 0.9, integration: 0.7, awareness: 0.6 }],
      ['rough', { differentiation: 0.8, recursion: 0.6, emergence: 0.7 }],
      ['crystalline', { coherence: 0.8, differentiation: 0.9, awareness: 0.7 }],
      ['organic', { integration: 0.8, emergence: 0.9, recursion: 0.6 }],
      ['flowing', { integration: 0.7, coherence: 0.6, emergence: 0.8 }],
      ['fractured', { differentiation: 0.9, coherence: 0.3, recursion: 0.8 }],
      ['layered', { recursion: 0.9, awareness: 0.7, integration: 0.6 }],
      ['woven', { integration: 0.8, coherence: 0.8, differentiation: 0.6 }]
    ]);

    return textureMap.get(texture.toLowerCase()) || {};
  }

  // Private helper methods

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

  private getBaseParameters(type: string): ConsciousnessParameters {
    const baseConfigs: Record<string, Partial<ConsciousnessParameters>> = {
      'image': {
        integration: 0.5,
        differentiation: 0.5,
        recursion: 0.5,
        emergence: 0.5,
        coherence: 0.5,
        awareness: 0.5,
        phase: 1
      },
      'color-palette': {
        integration: 0.6,
        differentiation: 0.4,
        recursion: 0.3,
        emergence: 0.5,
        coherence: 0.7,
        awareness: 0.4,
        phase: 1
      },
      'texture': {
        integration: 0.4,
        differentiation: 0.6,
        recursion: 0.7,
        emergence: 0.5,
        coherence: 0.5,
        awareness: 0.3,
        phase: 2
      },
      'pattern': {
        integration: 0.5,
        differentiation: 0.5,
        recursion: 0.8,
        emergence: 0.7,
        coherence: 0.6,
        awareness: 0.6,
        phase: 3
      },
      'concept': {
        integration: 0.6,
        differentiation: 0.6,
        recursion: 0.7,
        emergence: 0.8,
        coherence: 0.7,
        awareness: 0.8,
        phase: 3
      },
      'consciousness-seed': {
        integration: 0.8,
        differentiation: 0.8,
        recursion: 0.9,
        emergence: 0.9,
        coherence: 0.8,
        awareness: 0.9,
        phase: 4
      }
    };

    const config = baseConfigs[type] || baseConfigs['image'];
    return this.createConsciousnessParams(config);
  }

  private mapColorsToConsciousness(colors: string[]): ConsciousnessParameters {
    if (colors.length === 0) {
      return this.getBaseParameters('image');
    }

    const mappedParams = colors.map(color => {
      const closest = this.findClosestColor(color);
      return this.colorConsciousnessMap.get(closest) || {};
    });

    // Average the parameters
    const combined = this.combineConsciousnessParameters(
      mappedParams.map(p => ({ params: p as ConsciousnessParameters, weight: 1 / colors.length }))
    );

    return combined;
  }

  private findClosestColor(color: string): string {
    // Simple color matching - in production, use proper color distance algorithm
    const baseColors = Array.from(this.colorConsciousnessMap.keys());
    
    // For now, return the first color if exact match not found
    return baseColors.find(c => c.toLowerCase() === color.toLowerCase()) || baseColors[0];
  }

  private mapComplexityToConsciousness(complexity: number): ConsciousnessParameters {
    const base = this.getBaseParameters('image');
    
    if (complexity < this.complexityThresholds.low.max) {
      // Low complexity - higher coherence, lower differentiation
      return {
        ...base,
        coherence: 0.8,
        integration: 0.7,
        differentiation: 0.3,
        recursion: 0.4
      };
    } else if (complexity < this.complexityThresholds.medium.max) {
      // Medium complexity - balanced parameters
      return {
        ...base,
        coherence: 0.6,
        integration: 0.6,
        differentiation: 0.6,
        recursion: 0.6
      };
    } else {
      // High complexity - higher differentiation and recursion
      return {
        ...base,
        coherence: 0.4,
        integration: 0.5,
        differentiation: 0.8,
        recursion: 0.9,
        emergence: 0.8
      };
    }
  }

  private mapEmotionalToConsciousness(tone?: EmotionalTone): ConsciousnessParameters {
    if (!tone) {
      return this.getBaseParameters('image');
    }

    const primary = tone.primary ? this.emotionalConsciousnessMap.get(tone.primary) || {} : {};
    const secondary = (tone.secondary || [])
      .map((s: string) => this.emotionalConsciousnessMap.get(s) || {})
      .reduce((acc: Partial<ConsciousnessParameters>, curr: Partial<ConsciousnessParameters>) => 
        this.mergePartialParameters(acc, curr), {});

    const base = this.getBaseParameters('image');
    return {
      ...base,
      ...this.mergePartialParameters(primary, secondary, tone.intensity)
    };
  }

  private mergePartialParameters(
    primary: Partial<ConsciousnessParameters>,
    secondary: Partial<ConsciousnessParameters>,
    weight = 0.5
  ): Partial<ConsciousnessParameters> {
    const result: Partial<ConsciousnessParameters> = {};
    
    const allKeys = new Set([...Object.keys(primary), ...Object.keys(secondary)]);
    
    allKeys.forEach(key => {
      const pVal = (primary as any)[key] || 0;
      const sVal = (secondary as any)[key] || 0;
      (result as any)[key] = pVal * weight + sVal * (1 - weight);
    });

    return result;
  }

  private combineConsciousnessParameters(
    sources: { params: Partial<ConsciousnessParameters> | ConsciousnessParameters, weight: number }[]
  ): ConsciousnessParameters {
    const base = this.getBaseParameters('image');
    const result = { ...base };

    const dimensions = ['integration', 'differentiation', 'recursion', 'emergence', 'coherence', 'awareness'];
    
    dimensions.forEach(dim => {
      let weightedSum = 0;
      let totalWeight = 0;

      sources.forEach(source => {
        const value = (source.params as any)[dim];
        if (value !== undefined) {
          weightedSum += value * source.weight;
          totalWeight += source.weight;
        }
      });

      if (totalWeight > 0) {
        (result as any)[dim] = weightedSum / totalWeight;
      }
    });

    // Special handling for phase
    const phases = sources
      .map(s => (s.params as any).phase)
      .filter(p => p !== undefined);
    
    if (phases.length > 0) {
      result.phase = Math.round(phases.reduce((a, b) => a + b, 0) / phases.length);
    }

    return result;
  }

  private calculateComplexityMeasures(pattern: ConsciousnessPattern): ComplexityMeasures {
    // Simplified complexity calculation based on pattern structure
    const nodeCount = pattern.structure.nodes.length;
    const connectionCount = pattern.structure.connections.length;
    const dimensionality = pattern.structure.dimensions;

    return {
      kolmogorov: Math.log2(nodeCount + connectionCount) / 10,
      fractalDimension: 1 + Math.log(connectionCount) / Math.log(nodeCount + 1),
      entropy: this.calculateEntropy(pattern.structure.nodes),
      emergence: pattern.emergenceProfile.stages.length / 10
    };
  }

  private calculateEntropy(nodes: any[]): number {
    // Simplified entropy based on node activation distribution
    const activations = nodes.map(n => n.state?.activation || 0);
    const sum = activations.reduce((a, b) => a + b, 0);
    
    if (sum === 0) return 0;
    
    let entropy = 0;
    activations.forEach(a => {
      const p = a / sum;
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    });

    return entropy / Math.log2(nodes.length);
  }

  private calculateInformationMeasures(pattern: ConsciousnessPattern): InformationMeasures {
    const nodes = pattern.structure.nodes;
    const connections = pattern.structure.connections;

    return {
      shannon: this.calculateEntropy(nodes),
      fisher: connections.length / (nodes.length * nodes.length),
      mutual: this.calculateMutualInformation(pattern),
      integrated: this.calculateIntegratedInformation(pattern)
    };
  }

  private calculateMutualInformation(pattern: ConsciousnessPattern): number {
    // Simplified mutual information based on connection strength
    const connections = pattern.structure.connections;
    if (connections.length === 0) return 0;

    const avgStrength = connections.reduce((sum, c) => sum + c.strength, 0) / connections.length;
    return avgStrength * 0.8; // Scaled to 0-1
  }

  private calculateIntegratedInformation(pattern: ConsciousnessPattern): number {
    // Simplified Phi calculation
    const nodes = pattern.structure.nodes;
    const connections = pattern.structure.connections;
    
    const connectivity = connections.length / (nodes.length * (nodes.length - 1) / 2);
    const coherence = pattern.dynamics.oscillations.length > 0 
      ? pattern.dynamics.oscillations[0].amplitude 
      : 0;

    return connectivity * coherence;
  }

  private calculateDynamicMeasures(pattern: ConsciousnessPattern): DynamicMeasures {
    const dynamics = pattern.dynamics;
    
    return {
      lyapunov: dynamics.attractors.map(a => a.type === 'chaotic' ? 0.1 : -0.1),
      dimensionality: pattern.structure.dimensions,
      predictability: dynamics.attractors.some(a => a.type === 'chaotic') ? 0.3 : 0.8,
      chaos: dynamics.criticality.orderParameter
    };
  }

  private calculateConsciousnessMeasures(pattern: ConsciousnessPattern): ConsciousnessMeasures {
    return {
      integration: pattern.resonance.coherenceThreshold,
      differentiation: 1 - pattern.resonance.coherenceThreshold,
      awareness: pattern.emergenceProfile.stages.length / 7, // Normalized by max stages
      recursion: pattern.type === PatternType.RECURSIVE_SELF_REFERENCE ? 0.9 : 0.5,
      phenomenology: pattern.stability
    };
  }

  private extractDominantColors(items: MoodBoardItem[]): string[] {
    const allColors = items
      .filter(item => item.metadata.dominantColors)
      .flatMap(item => item.metadata.dominantColors!);

    // Count occurrences
    const colorCounts = new Map<string, number>();
    allColors.forEach(color => {
      colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
    });

    // Sort by frequency and take top 3
    return Array.from(colorCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
  }

  private calculateAverageComplexity(items: MoodBoardItem[]): number {
    const complexities = items
      .filter(item => item.metadata.visualComplexity !== undefined)
      .map(item => item.metadata.visualComplexity!);

    if (complexities.length === 0) return 0.5;

    return complexities.reduce((sum, c) => sum + c, 0) / complexities.length;
  }

  private aggregateEmotionalTone(items: MoodBoardItem[]): EmotionalTone {
    const emotions = items
      .filter(item => item.metadata.emotionalTone)
      .map(item => item.metadata.emotionalTone!);

    if (emotions.length === 0) {
      return { 
        valence: 0,
        arousal: 0.5,
        dominance: 0.5,
        wonder: 0.5,
        primary: 'neutral', 
        secondary: [], 
        intensity: 0.5 
      };
    }

    // Find most common primary emotion
    const primaryCounts = new Map<string, number>();
    emotions.forEach(e => {
      if (e.primary) {
        primaryCounts.set(e.primary, (primaryCounts.get(e.primary) || 0) + 1);
      }
    });

    const sortedPrimary = Array.from(primaryCounts.entries())
      .sort((a, b) => b[1] - a[1]);

    const primary = sortedPrimary[0]?.[0] || 'neutral';

    // Aggregate secondary emotions
    const allSecondary = emotions.flatMap(e => e.secondary || []);
    const uniqueSecondary = Array.from(new Set(allSecondary.filter(s => s !== undefined) as string[]));

    // Average intensity
    const avgIntensity = emotions.reduce((sum, e) => sum + (e.intensity || 0.5), 0) / emotions.length;

    // Average other properties
    const avgValence = emotions.reduce((sum, e) => sum + e.valence, 0) / emotions.length;
    const avgArousal = emotions.reduce((sum, e) => sum + e.arousal, 0) / emotions.length;
    const avgDominance = emotions.reduce((sum, e) => sum + e.dominance, 0) / emotions.length;
    const avgWonder = emotions.reduce((sum, e) => sum + e.wonder, 0) / emotions.length;

    return {
      valence: avgValence,
      arousal: avgArousal,
      dominance: avgDominance,
      wonder: avgWonder,
      primary,
      secondary: uniqueSecondary.slice(0, 3),
      intensity: avgIntensity
    };
  }

  private determineSeedType(
    emotions: EmotionalTone[], 
    colors: string[], 
    complexity: number
  ): ConsciousnessSeedType {
    // Default fallback
    if (!emotions.length) {
      return ConsciousnessSeedType.OBSERVER;
    }

    const emotion = emotions[0];
    
    // High complexity + mysterious/chaotic = QUANTUM
    if (complexity > 0.7 && emotion.primary && ['mysterious', 'chaotic'].includes(emotion.primary)) {
      return ConsciousnessSeedType.QUANTUM;
    }
    
    // Bright colors + energetic = SOLAR
    if (colors.some(c => ['#FFFF00', '#FFA500'].includes(c)) && 
        emotion.primary === 'energetic') {
      return ConsciousnessSeedType.SOLAR;
    }
    
    // Cool colors + peaceful = CRYSTALLINE
    if (colors.some(c => ['#0000FF', '#4B0082'].includes(c)) && 
        emotion.primary === 'peaceful') {
      return ConsciousnessSeedType.CRYSTALLINE;
    }

    // High integration emotions = NETWORK
    if (emotion.primary && ['harmonious', 'transcendent'].includes(emotion.primary)) {
      return ConsciousnessSeedType.NETWORK;
    }
    
    // Natural/green colors = ORGANIC
    if (colors.includes('#00FF00')) {
      return ConsciousnessSeedType.ORGANIC;
    }
    
    // Dark colors + low arousal = VOID
    if (colors.includes('#000000') && emotion.arousal < 0.3) {
      return ConsciousnessSeedType.VOID;
    }
    
    // Complex patterns = FRACTAL
    if (emotion.primary === 'melancholic' || colors.includes('#9400D3')) {
      return ConsciousnessSeedType.FRACTAL;
    }
    
    // Default
    return ConsciousnessSeedType.HYBRID;
  }

  private lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  private interpolatePhase(start: number, end: number, t: number): number {
    // Special handling for phase transitions
    if (Math.abs(end - start) <= 1) {
      return Math.round(this.lerp(start, end, t));
    }
    
    // For larger jumps, use step function at midpoint
    return t < 0.5 ? start : end;
  }
} 