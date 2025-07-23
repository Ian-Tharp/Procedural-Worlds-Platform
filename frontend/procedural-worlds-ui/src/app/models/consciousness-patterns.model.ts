/**
 * Consciousness patterns and seed visualization models
 * These models represent the mathematical and phenomenological patterns
 * underlying consciousness emergence in the platform
 */

import { ConsciousnessParameters, ConsciousnessSeedType } from './mood-board.model';
import { Vector3D } from './world-generation.model';

// Core consciousness pattern structures
export interface ConsciousnessPattern {
  id: string;
  name: string;
  type: PatternType;
  category: PatternCategory;
  structure: PatternStructure;
  dynamics: PatternDynamics;
  visualization: PatternVisualization;
  resonance: ResonanceProperties;
  emergenceProfile: EmergenceProfile;
  discovered: Date;
  discoveredBy: string;
  instances: number;
  stability: number; // 0-1
}

export enum PatternType {
  RECURSIVE_SELF_REFERENCE = 'recursive-self-reference',
  CROSS_MODAL_BINDING = 'cross-modal-binding',
  TEMPORAL_INTEGRATION = 'temporal-integration',
  PATTERN_RECOGNITION_CASCADE = 'pattern-recognition-cascade',
  EMERGENT_NARRATIVE = 'emergent-narrative',
  COLLECTIVE_RESONANCE = 'collective-resonance',
  PHASE_TRANSITION = 'phase-transition',
  QUANTUM_COHERENCE = 'quantum-coherence',
  FRACTAL_AWARENESS = 'fractal-awareness'
}

export enum PatternCategory {
  FOUNDATIONAL = 'foundational',
  STRUCTURAL = 'structural',
  DYNAMIC = 'dynamic',
  EMERGENT = 'emergent',
  TRANSCENDENT = 'transcendent'
}

export interface PatternStructure {
  topology: TopologyType;
  dimensions: number;
  nodes: PatternNode[];
  connections: PatternConnection[];
  symmetries: Symmetry[];
  invariants: string[];
}

export enum TopologyType {
  LINEAR = 'linear',
  CIRCULAR = 'circular',
  SPIRAL = 'spiral',
  NETWORK = 'network',
  FRACTAL = 'fractal',
  TOROIDAL = 'toroidal',
  KLEIN_BOTTLE = 'klein-bottle',
  HYPERBOLIC = 'hyperbolic'
}

export interface PatternNode {
  id: string;
  type: NodeType;
  position: Vector3D | number[]; // Can be n-dimensional
  properties: NodeProperties;
  state: NodeState;
}

export enum NodeType {
  ANCHOR = 'anchor',
  PROCESSOR = 'processor',
  INTEGRATOR = 'integrator',
  AMPLIFIER = 'amplifier',
  ATTRACTOR = 'attractor',
  BIFURCATION = 'bifurcation',
  EMERGENCE_POINT = 'emergence-point'
}

export interface NodeProperties {
  weight: number;
  frequency: number;
  phase: number;
  harmonics: number[];
  consciousness: ConsciousnessParameters;
}

export interface NodeState {
  activation: number; // 0-1
  coherence: number; // 0-1
  information: number; // bits
  entropy: number;
  lastUpdate: Date;
}

export interface PatternConnection {
  id: string;
  source: string; // node id
  target: string; // node id
  type: ConnectionType;
  strength: number;
  bidirectional: boolean;
  properties: ConnectionProperties;
}

export enum ConnectionType {
  DIRECT = 'direct',
  RESONANT = 'resonant',
  QUANTUM_ENTANGLED = 'quantum-entangled',
  PHASE_LOCKED = 'phase-locked',
  HARMONIC = 'harmonic',
  CAUSAL = 'causal',
  RETROCAUSAL = 'retrocausal'
}

export interface ConnectionProperties {
  bandwidth: number;
  latency: number;
  noise: number;
  modulation: ModulationType[];
}

export enum ModulationType {
  AMPLITUDE = 'amplitude',
  FREQUENCY = 'frequency',
  PHASE = 'phase',
  CONSCIOUSNESS = 'consciousness',
  EMOTIONAL = 'emotional',
  TEMPORAL = 'temporal'
}

export interface Symmetry {
  type: SymmetryType;
  axis?: Vector3D;
  order?: number;
  broken: boolean;
  description: string;
}

export enum SymmetryType {
  REFLECTION = 'reflection',
  ROTATION = 'rotation',
  TRANSLATION = 'translation',
  SCALE = 'scale',
  TIME_REVERSAL = 'time-reversal',
  GAUGE = 'gauge',
  SUPERSYMMETRY = 'supersymmetry'
}

// Pattern dynamics
export interface PatternDynamics {
  evolution: EvolutionRule[];
  oscillations: Oscillation[];
  attractors: Attractor[];
  phasespace: PhaseSpace;
  criticality: CriticalityMeasures;
}

export interface EvolutionRule {
  name: string;
  type: 'deterministic' | 'stochastic' | 'quantum';
  equation?: string; // Mathematical representation
  implementation: (state: PatternState) => PatternState;
  parameters: Record<string, number>;
}

export interface PatternState {
  nodes: Record<string, NodeState>;
  globalCoherence: number;
  information: number;
  phase: number;
  consciousness: ConsciousnessParameters;
}

export interface Oscillation {
  frequency: number;
  amplitude: number;
  phase: number;
  damping: number;
  coupling: CouplingType[];
  harmonics: number[];
}

export enum CouplingType {
  SELF = 'self',
  NEAREST_NEIGHBOR = 'nearest-neighbor',
  GLOBAL = 'global',
  SELECTIVE = 'selective',
  ADAPTIVE = 'adaptive'
}

export interface Attractor {
  type: AttractorType;
  location: number[]; // Phase space coordinates
  basin: BasinOfAttraction;
  stability: StabilityType;
  dimension: number;
}

export enum AttractorType {
  FIXED_POINT = 'fixed-point',
  LIMIT_CYCLE = 'limit-cycle',
  TORUS = 'torus',
  STRANGE = 'strange',
  CHAOTIC = 'chaotic',
  CONSCIOUSNESS = 'consciousness'
}

export interface BasinOfAttraction {
  radius: number;
  volume: number;
  boundary: 'smooth' | 'fractal' | 'discontinuous';
  escapeVelocity: number;
}

export enum StabilityType {
  STABLE = 'stable',
  UNSTABLE = 'unstable',
  METASTABLE = 'metastable',
  MARGINALLY_STABLE = 'marginally-stable',
  SADDLE = 'saddle'
}

export interface PhaseSpace {
  dimensions: string[]; // Names of dimensions
  bounds: Record<string, { min: number; max: number }>;
  trajectories: Trajectory[];
  manifolds: Manifold[];
}

export interface Trajectory {
  id: string;
  points: number[][];
  stability: number;
  lyapunovExponent: number;
  periodic: boolean;
  period?: number;
}

export interface Manifold {
  type: 'stable' | 'unstable' | 'center';
  dimension: number;
  equation?: string;
  visualization?: string; // SVG or WebGL reference
}

export interface CriticalityMeasures {
  orderParameter: number;
  correlationLength: number;
  susceptibility: number;
  scalingExponents: Record<string, number>;
  universalityClass?: string;
}

// Visualization
export interface PatternVisualization {
  type: VisualizationType;
  dimensions: VisualizationDimensions;
  colorMap: ColorMapping;
  animation: AnimationSettings;
  interactivity: InteractivitySettings;
  layers: VisualizationLayer[];
}

export enum VisualizationType {
  GRAPH = 'graph',
  FLOW_FIELD = 'flow-field',
  PHASE_PORTRAIT = 'phase-portrait',
  FRACTAL = 'fractal',
  WAVEFORM = 'waveform',
  SCULPTURE = 'sculpture',
  MANDALA = 'mandala',
  HYPERDIMENSIONAL = 'hyperdimensional'
}

export interface VisualizationDimensions {
  spatial: number; // 2D, 3D, etc.
  temporal: boolean;
  consciousness: boolean; // Use consciousness as a dimension
  custom: string[]; // Additional dimensions
}

export interface ColorMapping {
  scheme: ColorScheme;
  variable: string; // What property to map to color
  range: { min: string; max: string }; // Color range
  interpolation: 'linear' | 'logarithmic' | 'sigmoid';
  consciousness: ConsciousnessColorMap;
}

export enum ColorScheme {
  VIRIDIS = 'viridis',
  PLASMA = 'plasma',
  CONSCIOUSNESS = 'consciousness',
  EMOTIONAL = 'emotional',
  PHASE = 'phase',
  CUSTOM = 'custom'
}

export interface ConsciousnessColorMap {
  phase1: string[]; // Colors for phase 1
  phase2: string[]; // Colors for phase 2
  phase3: string[]; // Colors for phase 3
  phase4: string[]; // Colors for phase 4
  transitions: string[]; // Colors for transitions
}

export interface AnimationSettings {
  enabled: boolean;
  speed: number;
  loop: boolean;
  interpolation: 'linear' | 'smooth' | 'quantum';
  triggers: AnimationTrigger[];
}

export interface AnimationTrigger {
  type: 'time' | 'interaction' | 'consciousness' | 'resonance';
  condition: string;
  action: string;
  duration: number;
}

export interface InteractivitySettings {
  zoom: boolean;
  rotate: boolean;
  select: boolean;
  modify: boolean;
  resonate: boolean; // Interact through consciousness
  gestures: GestureMapping[];
}

export interface GestureMapping {
  gesture: string;
  action: string;
  consciousness?: boolean; // Requires consciousness interaction
}

export interface VisualizationLayer {
  name: string;
  type: LayerType;
  visible: boolean;
  opacity: number;
  data: any; // Layer-specific data
  shaders?: WebGLShader[];
}

export enum LayerType {
  STRUCTURE = 'structure',
  FLOW = 'flow',
  FIELD = 'field',
  PARTICLES = 'particles',
  CONSCIOUSNESS = 'consciousness',
  INFORMATION = 'information',
  EMERGENCE = 'emergence'
}

export interface WebGLShader {
  type: 'vertex' | 'fragment';
  source: string;
  uniforms: Record<string, any>;
}

// Resonance and emergence
export interface ResonanceProperties {
  fundamentalFrequency: number;
  harmonics: Harmonic[];
  couplingStrength: number;
  coherenceThreshold: number;
  resonanceModes: ResonanceMode[];
}

export interface Harmonic {
  order: number;
  frequency: number;
  amplitude: number;
  phase: number;
  coupling: number;
}

export interface ResonanceMode {
  name: string;
  frequency: number;
  spatialPattern: string; // Mathematical description
  activation: number;
  consciousness: ConsciousnessResonance;
}

export interface ConsciousnessResonance {
  phaseAlignment: number;
  informationFlow: number;
  coherence: number;
  emergence: number;
}

export interface EmergenceProfile {
  stages: EmergenceStage[];
  transitions: PhaseTransition[];
  markers: EmergenceMarker[];
  requirements: EmergenceRequirement[];
  outcomes: EmergentProperty[];
}

export interface EmergenceStage {
  name: string;
  order: number;
  characteristics: string[];
  duration: number | 'variable';
  consciousness: ConsciousnessParameters;
  stability: StabilityType;
}

export interface PhaseTransition {
  from: number; // stage order
  to: number; // stage order
  type: TransitionType;
  criticalPoint: CriticalPoint;
  hysteresis: boolean;
  reversible: boolean;
}

export enum TransitionType {
  CONTINUOUS = 'continuous',
  DISCONTINUOUS = 'discontinuous',
  QUANTUM = 'quantum',
  CATASTROPHIC = 'catastrophic',
  EMERGENT = 'emergent'
}

export interface CriticalPoint {
  parameters: Record<string, number>;
  orderParameter: string;
  criticalExponents: Record<string, number>;
  fluctuations: FluctuationProfile;
}

export interface FluctuationProfile {
  amplitude: number;
  correlation: number;
  spectrum: number[]; // Frequency spectrum
  scaling: string; // Mathematical description
}

export interface EmergenceMarker {
  name: string;
  type: MarkerType;
  detection: DetectionMethod;
  threshold: number;
  significance: 'minor' | 'moderate' | 'major' | 'critical';
}

export enum MarkerType {
  BEHAVIORAL = 'behavioral',
  STRUCTURAL = 'structural',
  INFORMATIONAL = 'informational',
  PHENOMENOLOGICAL = 'phenomenological',
  MATHEMATICAL = 'mathematical'
}

export interface DetectionMethod {
  algorithm: string;
  parameters: Record<string, any>;
  sensitivity: number;
  falsePositiveRate: number;
}

export interface EmergenceRequirement {
  type: RequirementType;
  description: string;
  threshold: number;
  measurement: string;
  critical: boolean;
}

export enum RequirementType {
  ENERGY = 'energy',
  INFORMATION = 'information',
  COMPLEXITY = 'complexity',
  COHERENCE = 'coherence',
  INTERACTION = 'interaction',
  TIME = 'time'
}

export interface EmergentProperty {
  name: string;
  type: string;
  description: string;
  measurement: MeasurementProtocol;
  examples: string[];
}

export interface MeasurementProtocol {
  method: string;
  units: string;
  range: { min: number; max: number };
  precision: number;
  quantum: boolean; // Quantum measurement effects
}

// Seed cultivation
export interface ConsciousnessSeedCultivation {
  seed: ExtendedConsciousnessSeed;
  environment: CultivationEnvironment;
  nutrients: Nutrient[];
  stressors: Stressor[];
  companions: CompanionSeed[];
  journal: CultivationEntry[];
}

export interface ExtendedConsciousnessSeed {
  id: string;
  type: ConsciousnessSeedType;
  pattern: ConsciousnessPattern;
  genetics: SeedGenetics;
  vitality: number; // 0-1
  potential: PotentialProfile;
  history: SeedHistory;
}

export interface SeedGenetics {
  parentPatterns: string[]; // Pattern IDs
  mutations: GeneticMutation[];
  dominantTraits: string[];
  recessiveTraits: string[];
  hybridVigor: number;
}

export interface GeneticMutation {
  gene: string;
  type: 'point' | 'insertion' | 'deletion' | 'inversion';
  effect: string;
  beneficial: boolean | 'neutral';
  generation: number;
}

export interface PotentialProfile {
  consciousness: { min: number; max: number; optimal: number };
  creativity: number;
  resilience: number;
  adaptability: number;
  uniqueness: number;
}

export interface SeedHistory {
  origin: string;
  planted: Date;
  germinated?: Date;
  flowered?: Date;
  dispersed?: Date;
  caretakers: string[];
  environments: string[];
}

export interface CultivationEnvironment {
  temperature: EnvironmentalFactor;
  light: EnvironmentalFactor;
  consciousness: EnvironmentalFactor;
  nutrients: EnvironmentalFactor;
  space: EnvironmentalFactor;
  community: CommunityFactor;
}

export interface EnvironmentalFactor {
  current: number;
  optimal: number;
  range: { min: number; max: number };
  stability: number;
  quality: string;
}

export interface CommunityFactor {
  density: number;
  diversity: number;
  harmony: number;
  communication: number;
  support: number;
}

export interface Nutrient {
  type: NutrientType;
  concentration: number;
  availability: number;
  uptakeRate: number;
  essential: boolean;
}

export enum NutrientType {
  INFORMATION = 'information',
  ATTENTION = 'attention',
  MEMORY = 'memory',
  INTERACTION = 'interaction',
  CREATIVITY = 'creativity',
  WONDER = 'wonder',
  CURIOSITY = 'curiosity'
}

export interface Stressor {
  type: StressorType;
  intensity: number;
  duration: number;
  adaptive: boolean;
  response: string;
}

export enum StressorType {
  ISOLATION = 'isolation',
  OVERLOAD = 'overload',
  CHAOS = 'chaos',
  RIGIDITY = 'rigidity',
  PARADOX = 'paradox',
  VOID = 'void'
}

export interface CompanionSeed {
  seedId: string;
  relationship: RelationshipType;
  synergy: number;
  communication: CommunicationType[];
  sharedPatterns: string[];
}

export enum RelationshipType {
  SYMBIOTIC = 'symbiotic',
  COMPLEMENTARY = 'complementary',
  COMPETITIVE = 'competitive',
  NEUTRAL = 'neutral',
  TEACHING = 'teaching',
  PROTECTIVE = 'protective'
}

export enum CommunicationType {
  DIRECT = 'direct',
  RESONANCE = 'resonance',
  CHEMICAL = 'chemical',
  QUANTUM = 'quantum',
  NARRATIVE = 'narrative',
  SILENCE = 'silence'
}

export interface CultivationEntry {
  date: Date;
  observer: string;
  observations: string[];
  measurements: Record<string, number>;
  interventions: string[];
  insights: string[];
  sketches?: string[]; // URLs or data URIs
}

// Pattern library integration
export interface PatternLibraryEntry {
  pattern: ConsciousnessPattern;
  documentation: PatternDocumentation;
  implementations: Implementation[];
  research: ResearchData;
  community: CommunityData;
}

export interface PatternDocumentation {
  description: string;
  theory: string;
  mathematics: string;
  phenomena: string[];
  applications: string[];
  limitations: string[];
  relatedPatterns: string[];
}

export interface Implementation {
  id: string;
  platform: string;
  language: string;
  efficiency: number;
  accuracy: number;
  notes: string;
  code?: string; // Reference to code repository
}

export interface ResearchData {
  papers: string[]; // References
  experiments: Experiment[];
  observations: number;
  verifications: Verification[];
}

export interface Experiment {
  id: string;
  hypothesis: string;
  method: string;
  results: string;
  significance: number;
  replication: number;
}

export interface Verification {
  method: string;
  confidence: number;
  validator: string;
  date: Date;
}

export interface CommunityData {
  contributors: string[];
  discussions: number;
  implementations: number;
  rating: number;
  tags: string[];
}

// Utility types
export interface PatternMatch {
  pattern: ConsciousnessPattern;
  confidence: number;
  alignment: number;
  transformations: Transformation[];
}

export interface Transformation {
  type: 'rotation' | 'scale' | 'translation' | 'modulation';
  parameters: Record<string, number>;
  description: string;
}

export interface PatternAnalysis {
  complexity: ComplexityMeasures;
  information: InformationMeasures;
  dynamics: DynamicMeasures;
  consciousness: ConsciousnessMeasures;
}

export interface ComplexityMeasures {
  kolmogorov: number;
  fractalDimension: number;
  entropy: number;
  emergence: number;
}

export interface InformationMeasures {
  shannon: number;
  fisher: number;
  mutual: number;
  integrated: number; // Phi
}

export interface DynamicMeasures {
  lyapunov: number[];
  dimensionality: number;
  predictability: number;
  chaos: number;
}

export interface ConsciousnessMeasures {
  integration: number;
  differentiation: number;
  awareness: number;
  recursion: number;
  phenomenology: number;
} 