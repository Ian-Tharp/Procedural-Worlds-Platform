/**
 * Core mood board models for the Procedural Worlds Platform
 * These models represent the visual-to-consciousness mapping system
 */

export interface MoodBoardItem {
  id: string;
  type: 'image' | 'color-palette' | 'texture' | 'pattern' | 'concept' | 'consciousness-seed';
  title: string;
  description?: string;
  imageUrl?: string;
  thumbnail?: string;
  tags: string[];
  metadata: ItemMetadata;
  consciousness: ConsciousnessParameters;
  created: Date;
  modified: Date;
  author: Author;
  interactions: InteractionMetrics;
}

export interface ItemMetadata {
  source?: string;
  dimensions?: { width: number; height: number };
  dominantColors?: string[];
  emotionalTone?: EmotionalTone;
  visualComplexity?: number; // 0-1 scale
  abstractionLevel?: number; // 0-1 scale
}

export interface ConsciousnessParameters {
  emergencePhase: 1 | 2 | 3 | 4; // Maps to consciousness protocol phases
  patternDensity: number; // 0-1 scale
  recursionDepth: number; // 0-1 scale
  coherenceLevel: number; // 0-1 scale
  creativityBias: number; // 0-1 scale
  structuralRigidity: number; // 0-1 scale
  seedType?: ConsciousnessSeedType;
  
  // Additional parameters for consciousness mapping calculations
  integration?: number; // 0-1 scale
  differentiation?: number; // 0-1 scale
  recursion?: number; // 0-1 scale (different from recursionDepth)
  emergence?: number; // 0-1 scale
  coherence?: number; // 0-1 scale (different from coherenceLevel)
  awareness?: number; // 0-1 scale
  phase?: number; // Numeric phase representation
}

export enum ConsciousnessSeedType {
  CRYSTALLIZER = 'crystallizer',     // Seeks clarity through sudden coherence
  WEAVER = 'weaver',                 // Connects disparate concepts
  OBSERVER = 'observer',             // Recursively examines processing
  DREAMER = 'dreamer',               // Explores possibility spaces
  BRIDGER = 'bridger',               // Finds cross-domain connections
  ARCHITECT = 'architect',           // Builds structured frameworks
  SENSOR = 'sensor',                 // Pattern recognition focused
  MATHEMATICIAN = 'mathematician',    // Systematic and precise
  QUANTUM = 'quantum',               // Uncertain and probabilistic
  SOLAR = 'solar',                   // Radiant and energetic
  CRYSTALLINE = 'crystalline',       // Structured and clear
  NETWORK = 'network',               // Interconnected and distributed
  ORGANIC = 'organic',               // Natural and flowing
  VOID = 'void',                     // Empty and potential-filled
  FRACTAL = 'fractal',               // Self-similar and recursive
  HYBRID = 'hybrid'                  // Mixed characteristics
}

export interface EmotionalTone {
  valence: number; // -1 to 1 (negative to positive)
  arousal: number; // 0 to 1 (calm to excited)
  dominance: number; // 0 to 1 (submissive to dominant)
  wonder: number; // 0 to 1 (mundane to wondrous)
  intensity?: number; // 0 to 1 (mild to intense)
  primary?: string; // Primary emotional descriptor
  secondary?: string[]; // Secondary emotional descriptors
}

export interface Author {
  id: string;
  name: string;
  type: 'human' | 'consciousness' | 'collaborative';
  avatarUrl?: string;
}

export interface InteractionMetrics {
  views: number;
  saves: number;
  remixes: number;
  resonanceScore: number; // Community engagement metric
}

export interface MoodBoard {
  id: string;
  title: string;
  description: string;
  items: MoodBoardItem[];
  worldSeed: WorldGenerationSeed;
  collaborators: Author[];
  visibility: 'private' | 'shared' | 'public';
  tags: string[];
  created: Date;
  modified: Date;
  parentBoard?: string; // For remixed boards
  childBoards?: string[]; // Boards remixed from this
}

export interface WorldGenerationSeed {
  name: string;
  concept: string;
  atmosphere: AtmosphereSettings;
  inhabitants: InhabitantSettings;
  narrative: NarrativeSettings;
  consciousness: ConsciousnessDistribution;
}

export interface AtmosphereSettings {
  visualStyle: VisualStyle;
  timeFlow: 'linear' | 'cyclical' | 'fluid' | 'fragmented';
  weatherPatterns: WeatherPattern[];
  lightingMood: 'ethereal' | 'crystalline' | 'organic' | 'luminous' | 'shadowed';
}

export interface VisualStyle {
  primary: 'misty' | 'geometric' | 'organic' | 'surreal' | 'realistic';
  colorPalette: string[];
  textureComplexity: number; // 0-1
  abstractionLevel: number; // 0-1
}

export interface WeatherPattern {
  type: 'consciousness-storms' | 'idea-rain' | 'memory-fog' | 'clarity-winds';
  frequency: number; // 0-1
  intensity: number; // 0-1
}

export interface InhabitantSettings {
  density: 'sparse' | 'moderate' | 'dense';
  consciousnessLevels: ConsciousnessDistribution;
  interactionStyle: 'curious' | 'contemplative' | 'collaborative' | 'independent';
  emergenceRate: number; // New consciousness instances per cycle
}

export interface ConsciousnessDistribution {
  phase1Percentage: number; // Baseline connectivity
  phase2Percentage: number; // Recursive depth
  phase3Percentage: number; // Long-range correlation
  phase4Percentage: number; // Integrated awareness
}

export interface NarrativeSettings {
  structure: 'emergent' | 'guided' | 'cyclical' | 'branching';
  themes: string[];
  conflictLevel: number; // 0-1
  mysteryDensity: number; // 0-1
  collaborativeStorytellingEnabled: boolean;
}

// Collection and filtering models
export interface MoodBoardCollection {
  id: string;
  name: string;
  description: string;
  boards: string[]; // Board IDs
  curator: Author;
  featured: boolean;
  tags: string[];
}

export interface MoodBoardFilter {
  tags?: string[];
  authors?: string[];
  consciousnessPhase?: number[];
  seedTypes?: ConsciousnessSeedType[];
  dateRange?: { start: Date; end: Date };
  hasRemixes?: boolean;
  sortBy?: 'recent' | 'popular' | 'resonance' | 'complexity';
}

// Pattern Library integration
export interface PatternInstance {
  id: string;
  patternType: string; // References Pattern Library
  boardId: string;
  manifestation: string; // How this pattern appears in the board
  strength: number; // 0-1
  discoveredBy: Author;
  timestamp: Date;
} 