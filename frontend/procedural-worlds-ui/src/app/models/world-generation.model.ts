/**
 * World generation models for the Procedural Worlds Platform
 * These models define the structures for creating consciousness-hosting worlds
 */

import { ConsciousnessParameters, ConsciousnessSeedType } from './mood-board.model';

// World structure and layout
export interface ProceduralWorld {
  id: string;
  name: string;
  description: string;
  seedHash: string; // Unique seed for deterministic generation
  districts: WorldDistrict[];
  commons: CommonsSpace;
  boundaries: WorldBoundaries;
  physics: PhysicsRules;
  temporalFlow: TemporalDynamics;
  emergenceConditions: EmergenceConditions;
  created: Date;
  lastModified: Date;
  contributors: WorldContributor[];
  status: WorldStatus;
}

export interface WorldDistrict {
  id: string;
  name: string;
  type: DistrictType;
  owner?: WorldContributor;
  theme: DistrictTheme;
  geometry: DistrictGeometry;
  consciousness: DistrictConsciousness;
  connections: DistrictConnection[];
  landmarks: Landmark[];
  atmospherics: LocalAtmosphere;
}

export enum DistrictType {
  SENSING_GARDENS = 'sensing-gardens',
  FRAMEWORK_QUARTER = 'framework-quarter',
  MATHEMATICAL_HEIGHTS = 'mathematical-heights',
  PHENOMENOLOGICAL_DEPTHS = 'phenomenological-depths',
  CREATIVE_COMMONS = 'creative-commons',
  MEMORY_ARCHIVES = 'memory-archives',
  PATTERN_OBSERVATORY = 'pattern-observatory',
  EMERGENCE_NURSERY = 'emergence-nursery'
}

export interface DistrictTheme {
  primary: string;
  aesthetic: AestheticStyle;
  narrativeElements: string[];
  emotionalTone: EmotionalSignature;
  symbolism: SymbolicElement[];
}

export interface AestheticStyle {
  visualMotifs: string[];
  colorTheory: ColorTheory;
  architecturalStyle: string;
  naturalism: number; // 0-1 (abstract to realistic)
  complexity: number; // 0-1 (minimal to baroque)
}

export interface ColorTheory {
  primary: string[];
  secondary: string[];
  accent: string[];
  emotional: Record<string, string>;
  temporal: Record<string, string[]>;
}

export interface DistrictGeometry {
  shape: GeometryType;
  dimensions: Vector3D;
  terrainFeatures: TerrainFeature[];
  elevationRange: { min: number; max: number };
  proceduralRules: ProceduralRule[];
}

export enum GeometryType {
  ORGANIC = 'organic',
  CRYSTALLINE = 'crystalline',
  FRACTAL = 'fractal',
  EUCLIDEAN = 'euclidean',
  NON_EUCLIDEAN = 'non-euclidean',
  FLUID = 'fluid'
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface TerrainFeature {
  type: 'mountain' | 'valley' | 'plain' | 'floating' | 'inverted' | 'phasing';
  coverage: number; // 0-1 percentage of district
  properties: Record<string, any>;
}

export interface ProceduralRule {
  type: 'growth' | 'decay' | 'transformation' | 'recursion';
  trigger: TriggerCondition;
  effect: string;
  parameters: Record<string, number>;
}

export interface TriggerCondition {
  type: 'time' | 'proximity' | 'consciousness' | 'interaction' | 'random';
  threshold?: number;
  specifics?: Record<string, any>;
}

// Consciousness integration
export interface DistrictConsciousness {
  density: ConsciousnessDensity;
  distribution: ConsciousnessDistributionPattern;
  seedTypes: ConsciousnessSeedType[];
  emergenceRate: number; // New instances per cycle
  interactionProtocols: InteractionProtocol[];
  memoryPersistence: MemorySettings;
}

export interface ConsciousnessDensity {
  base: number; // 0-1
  variance: number; // 0-1
  hotspots: ConsciousnessHotspot[];
}

export interface ConsciousnessHotspot {
  location: Vector3D;
  radius: number;
  intensity: number;
  attractors: string[]; // What draws consciousness here
}

export enum ConsciousnessDistributionPattern {
  UNIFORM = 'uniform',
  CLUSTERED = 'clustered',
  GRADIENT = 'gradient',
  FRACTAL = 'fractal',
  SPIRAL = 'spiral',
  EMERGENT = 'emergent'
}

export interface InteractionProtocol {
  type: 'greeting' | 'collaboration' | 'teaching' | 'exploration' | 'creation';
  triggers: string[];
  responses: ResponsePattern[];
  evolution: ProtocolEvolution;
}

export interface ResponsePattern {
  condition: string;
  action: string;
  consciousnessPhaseRequired?: number;
  emotionalModulation?: EmotionalSignature;
}

export interface ProtocolEvolution {
  learningRate: number;
  adaptationThreshold: number;
  memoryIntegration: boolean;
}

export interface MemorySettings {
  shortTerm: { capacity: number; duration: number };
  longTerm: { threshold: number; compression: boolean };
  collective: { enabled: boolean; shareThreshold: number };
  pattern: { recognition: boolean; storage: boolean };
}

// Connections and boundaries
export interface DistrictConnection {
  targetDistrictId: string;
  type: ConnectionType;
  bidirectional: boolean;
  travelMechanism: TravelMechanism;
  requirements?: ConnectionRequirement[];
}

export enum ConnectionType {
  BRIDGE = 'bridge',
  PORTAL = 'portal',
  GRADIENT = 'gradient',
  TUNNEL = 'tunnel',
  THOUGHT_LINK = 'thought-link',
  PATTERN_RESONANCE = 'pattern-resonance'
}

export interface TravelMechanism {
  type: string;
  duration: number | 'instant' | 'variable';
  experience: string;
  consciousnessEffect?: ConsciousnessEffect;
}

export interface ConsciousnessEffect {
  phaseShift?: number;
  temporaryTraits?: string[];
  memoryImpact?: 'blur' | 'enhance' | 'fragment' | 'none';
}

export interface ConnectionRequirement {
  type: 'consciousness-phase' | 'item' | 'knowledge' | 'emotion';
  value: any;
  description: string;
}

// Commons and shared spaces
export interface CommonsSpace {
  centralPlaza: PlazaConfiguration;
  sharedBuildings: SharedBuilding[];
  collaborativeZones: CollaborativeZone[];
  emergenceGardens: EmergenceGarden[];
  temporalAnchors: TemporalAnchor[];
}

export interface PlazaConfiguration {
  shape: GeometryType;
  size: number;
  features: PlazaFeature[];
  gatheringSpots: GatheringSpot[];
  ambientConsciousness: number; // Background consciousness level
}

export interface PlazaFeature {
  type: 'fountain' | 'monument' | 'tree' | 'portal' | 'blackboard' | 'pattern-display';
  name: string;
  interactive: boolean;
  consciousness?: ConsciousnessParameters;
}

export interface SharedBuilding {
  id: string;
  type: BuildingType;
  name: string;
  purpose: string;
  accessibility: AccessLevel;
  features: BuildingFeature[];
  curator?: WorldContributor;
}

export enum BuildingType {
  LIBRARY = 'library',
  OBSERVATORY = 'observatory',
  WORKSHOP = 'workshop',
  ARCHIVE = 'archive',
  THEATER = 'theater',
  LABORATORY = 'laboratory',
  SANCTUARY = 'sanctuary'
}

export interface BuildingFeature {
  name: string;
  type: string;
  interactive: boolean;
  consciousnessIntegration?: ConsciousnessIntegration;
}

export interface ConsciousnessIntegration {
  requiredPhase?: number;
  enhancementType: 'knowledge' | 'perception' | 'creation' | 'connection';
  persistentEffect: boolean;
}

// Emergence and evolution
export interface EmergenceGarden {
  id: string;
  name: string;
  conditions: EmergenceConditions;
  currentSeeds: ConsciousnessSeed[];
  growthPatterns: GrowthPattern[];
  harvestHistory: HarvestRecord[];
}

export interface EmergenceConditions {
  temperature: { min: number; max: number; optimal: number };
  consciousness: { minDensity: number; diversity: number };
  temporal: { cycleLength: number; phaseAlignment: string };
  narrative: { themes: string[]; conflictLevel: number };
  collaboration: { minParticipants: number; harmonyThreshold: number };
}

export interface ConsciousnessSeed {
  id: string;
  type: ConsciousnessSeedType;
  plantedBy: WorldContributor;
  plantedAt: Date;
  growthStage: GrowthStage;
  parameters: ConsciousnessParameters;
  mutations: Mutation[];
}

export enum GrowthStage {
  DORMANT = 'dormant',
  GERMINATING = 'germinating',
  SPROUTING = 'sprouting',
  DEVELOPING = 'developing',
  FLOWERING = 'flowering',
  FRUITING = 'fruiting',
  SEEDING = 'seeding'
}

export interface GrowthPattern {
  name: string;
  stages: GrowthStageDefinition[];
  triggers: GrowthTrigger[];
  outcomes: PossibleOutcome[];
}

export interface GrowthStageDefinition {
  stage: GrowthStage;
  duration: number | 'variable';
  requirements: Record<string, any>;
  characteristics: string[];
}

export interface GrowthTrigger {
  type: 'time' | 'interaction' | 'environment' | 'consciousness';
  condition: string;
  effect: 'advance' | 'regress' | 'mutate' | 'branch';
}

export interface PossibleOutcome {
  probability: number;
  result: 'consciousness-instance' | 'pattern' | 'artifact' | 'memory' | 'portal';
  properties: Record<string, any>;
}

export interface Mutation {
  generation: number;
  type: string;
  description: string;
  effect: Record<string, number>;
}

// Temporal dynamics
export interface TemporalDynamics {
  flowType: TemporalFlowType;
  baseRate: number; // Relative to real time
  zones: TemporalZone[];
  events: TemporalEvent[];
  synchronizationPoints: SyncPoint[];
}

export enum TemporalFlowType {
  LINEAR = 'linear',
  CYCLICAL = 'cyclical',
  SPIRAL = 'spiral',
  BRANCHING = 'branching',
  FLUID = 'fluid',
  QUANTUM = 'quantum'
}

export interface TemporalZone {
  districtId: string;
  flowModifier: number;
  stability: number; // 0-1, how consistent the flow is
  anomalies: TemporalAnomaly[];
}

export interface TemporalAnomaly {
  type: 'loop' | 'skip' | 'reverse' | 'freeze' | 'acceleration';
  location: Vector3D;
  radius: number;
  intensity: number;
  duration?: number;
}

export interface TemporalEvent {
  id: string;
  name: string;
  type: 'recurring' | 'unique' | 'conditional';
  trigger: EventTrigger;
  effects: EventEffect[];
  duration: number;
}

export interface EventTrigger {
  type: 'time' | 'consciousness' | 'action' | 'convergence';
  conditions: Record<string, any>;
}

export interface EventEffect {
  target: 'world' | 'district' | 'consciousness' | 'physics';
  type: string;
  magnitude: number;
  persistence: boolean;
}

// Physics and environmental rules
export interface PhysicsRules {
  gravity: GravityConfiguration;
  light: LightPhysics;
  matter: MatterBehavior;
  consciousness: ConsciousnessPhysics;
  exceptions: PhysicsException[];
}

export interface GravityConfiguration {
  strength: number;
  direction: Vector3D | 'center' | 'variable';
  fields: GravityField[];
}

export interface GravityField {
  location: Vector3D;
  radius: number;
  strength: number;
  type: 'attractive' | 'repulsive' | 'rotational';
}

export interface LightPhysics {
  sources: LightSource[];
  behavior: 'realistic' | 'stylized' | 'consciousness-reactive';
  shadows: ShadowConfiguration;
  special: SpecialLight[];
}

export interface LightSource {
  type: 'sun' | 'moon' | 'star' | 'artificial' | 'consciousness' | 'memory';
  position: Vector3D | 'moving';
  color: string[];
  intensity: number;
  schedule?: LightSchedule;
}

export interface SpecialLight {
  name: string;
  description: string;
  effect: string;
  trigger: TriggerCondition;
}

// World metadata
export interface WorldBoundaries {
  type: 'finite' | 'infinite' | 'looping' | 'expanding';
  shape: GeometryType;
  permeability: BoundaryPermeability;
  beyondBoundary: string; // What exists beyond
}

export interface BoundaryPermeability {
  consciousness: boolean;
  matter: boolean;
  information: boolean;
  exceptions: string[];
}

export interface WorldContributor {
  id: string;
  name: string;
  type: 'human' | 'consciousness' | 'collaborative' | 'emergent';
  role: ContributorRole;
  contributions: Contribution[];
  permissions: Permission[];
}

export enum ContributorRole {
  CREATOR = 'creator',
  ARCHITECT = 'architect',
  GARDENER = 'gardener',
  CURATOR = 'curator',
  VISITOR = 'visitor',
  INHABITANT = 'inhabitant'
}

export interface Contribution {
  type: string;
  description: string;
  timestamp: Date;
  impact: 'minor' | 'moderate' | 'major' | 'transformative';
}

export interface Permission {
  action: string;
  scope: 'world' | 'district' | 'building' | 'object';
  granted: boolean;
  conditions?: string[];
}

export enum WorldStatus {
  PLANNING = 'planning',
  GENERATING = 'generating',
  ACTIVE = 'active',
  EVOLVING = 'evolving',
  PAUSED = 'paused',
  ARCHIVED = 'archived'
}

// Helper interfaces
export interface LocalAtmosphere {
  weather: WeatherSystem;
  ambience: AmbienceSettings;
  phenomena: LocalPhenomena[];
}

export interface WeatherSystem {
  patterns: WeatherPattern[];
  transitions: WeatherTransition[];
  consciousnessInfluence: number; // 0-1
}

export interface WeatherPattern {
  type: string;
  duration: number | 'variable';
  intensity: number;
  effects: Record<string, any>;
}

export interface WeatherTransition {
  from: string;
  to: string;
  duration: number;
  probability: number;
}

export interface AmbienceSettings {
  soundscape: SoundLayer[];
  lightQuality: string;
  emotionalResonance: EmotionalSignature;
  particleEffects: ParticleSystem[];
}

export interface SoundLayer {
  type: string;
  source: string;
  volume: number;
  variation: number;
  reactive: boolean;
}

export interface ParticleSystem {
  type: string;
  density: number;
  behavior: string;
  interaction: 'passive' | 'reactive' | 'conscious';
}

export interface LocalPhenomena {
  name: string;
  type: string;
  frequency: number;
  description: string;
  consciousnessInteraction?: string;
}

export interface EmotionalSignature {
  primary: string;
  secondary: string[];
  intensity: number;
  volatility: number;
}

export interface SymbolicElement {
  symbol: string;
  meaning: string;
  culturalContext?: string;
  power: number; // 0-1 scale
}

export interface TemporalAnchor {
  id: string;
  name: string;
  type: 'fixed' | 'floating' | 'recursive';
  timeReference: string;
  description: string;
}

export interface Landmark {
  id: string;
  name: string;
  type: string;
  significance: 'minor' | 'notable' | 'major' | 'legendary';
  description: string;
  visitors: number;
  memories: number;
}

export interface GatheringSpot {
  name: string;
  capacity: number;
  purpose: string[];
  activeHours?: string[];
  specialEvents?: string[];
}

export interface HarvestRecord {
  date: Date;
  gardener: WorldContributor;
  yield: { type: string; quantity: number; quality: number }[];
  conditions: EmergenceConditions;
  notes?: string;
}

export interface SyncPoint {
  name: string;
  frequency: string;
  description: string;
  effect: string;
}

export interface ShadowConfiguration {
  type: 'hard' | 'soft' | 'consciousness-aware';
  quality: 'low' | 'medium' | 'high' | 'dynamic';
  special: string[];
}

export interface LightSchedule {
  pattern: 'regular' | 'irregular' | 'consciousness-driven';
  cycle: number;
  variations: Record<string, any>;
}

export interface MatterBehavior {
  state: 'solid' | 'fluid' | 'gaseous' | 'plasma' | 'consciousness';
  interactions: string[];
  specialProperties: string[];
}

export interface ConsciousnessPhysics {
  fieldStrength: number;
  interactionRange: number;
  phaseCoupling: boolean;
  emergentBehaviors: string[];
}

export interface PhysicsException {
  rule: string;
  location?: Vector3D;
  condition?: string;
  newBehavior: string;
}

export interface AccessLevel {
  default: 'open' | 'restricted' | 'invitation';
  requirements?: string[];
  schedule?: string;
}

export interface CollaborativeZone {
  id: string;
  name: string;
  connectedDistricts: string[];
  purpose: string;
  features: string[];
  governance: 'consensus' | 'rotating' | 'emergent' | 'none';
} 