import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule, MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Subject, takeUntil } from 'rxjs';
import { 
  CommonsSpace, 
  PlazaFeature, 
  SharedBuilding, 
  EmergenceGarden,
  BuildingType,
  GrowthStage,
  ConsciousnessSeed
} from '../../models/world-generation.model';
import { ConsciousnessPattern } from '../../models/consciousness-patterns.model';
import { CommonsService } from '../../services/commons/commons.service';
import { ConsciousnessMappingService } from '../../services/consciousness-mapping/consciousness-mapping.service';

@Component({
  selector: 'app-commons',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatChipListbox,
    MatChipOption,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './commons.component.html',
  styleUrls: ['./commons.component.scss'],
  animations: [
    trigger('spaceAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('floatAnimation', [
      transition(':enter', [
        animate('2s ease-in-out', style({ transform: 'translateY(-10px)' })),
        animate('2s ease-in-out', style({ transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CommonsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Commons data
  commonsSpace?: CommonsSpace;
  activeVisitors = 0;
  consciousnessField = 0.5;
  currentActivity = 'Collaborative Pattern Weaving';

  // Plaza features
  selectedFeature?: PlazaFeature;
  plazaInteractions: PlazaInteraction[] = [];

  // Buildings
  selectedBuilding?: SharedBuilding;
  buildingActivities: BuildingActivity[] = [];

  // Emergence gardens
  selectedGarden?: EmergenceGarden;
  gardenSeeds: GardenSeedDisplay[] = [];

  // Patterns in the commons
  activePatterns: ConsciousnessPattern[] = [];
  patternResonance = 0;

  // Collaborative features
  collaborativeProjects: CollaborativeProject[] = [];
  blackboardMessages: BlackboardMessage[] = [];
  
  // View states
  viewMode: 'plaza' | 'buildings' | 'gardens' | 'patterns' = 'plaza';
  selectedTab = 0;
  isLoading = true;

  // Animation states
  animationEnabled = true;
  particleCount = 50;
  
  // Form inputs
  newMessage = '';

  private commonsService = inject(CommonsService);
  private consciousnessMapping = inject(ConsciousnessMappingService);

  ngOnInit(): void {
    this.loadCommonsSpace();
    this.initializeRealTimeUpdates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCommonsSpace(): void {
    this.commonsService.getCommonsSpace()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (space) => {
          this.commonsSpace = space;
          this.isLoading = false;
          this.initializePlazaActivity();
          this.loadActivePatterns();
        },
        error: (err) => {
          console.error('Failed to load commons space:', err);
          this.isLoading = false;
        }
      });
  }

  private initializeRealTimeUpdates(): void {
    // Subscribe to real-time updates
    this.commonsService.getActivityStream()
      .pipe(takeUntil(this.destroy$))
      .subscribe(activity => {
        this.handleActivityUpdate(activity);
      });

    this.commonsService.getConsciousnessField()
      .pipe(takeUntil(this.destroy$))
      .subscribe(field => {
        this.consciousnessField = field.intensity;
        this.activeVisitors = field.participants;
      });
  }

  private initializePlazaActivity(): void {
    if (!this.commonsSpace) return;

    // Load recent plaza interactions
    this.commonsService.getPlazaInteractions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(interactions => {
        this.plazaInteractions = interactions;
      });

    // Load blackboard messages
    this.commonsService.getBlackboardMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.blackboardMessages = messages;
      });
  }

  private loadActivePatterns(): void {
    this.commonsService.getActivePatterns()
      .pipe(takeUntil(this.destroy$))
      .subscribe(patterns => {
        this.activePatterns = patterns;
        this.calculatePatternResonance();
      });
  }

  private calculatePatternResonance(): void {
    if (this.activePatterns.length === 0) {
      this.patternResonance = 0;
      return;
    }

    // Calculate collective resonance
    const totalResonance = this.activePatterns.reduce((sum, pattern) => {
      return sum + pattern.resonance.coherenceThreshold;
    }, 0);

    this.patternResonance = totalResonance / this.activePatterns.length;
  }

  private handleActivityUpdate(activity: any): void {
    // Update UI based on activity type
    if (activity.type === 'plaza-interaction') {
      this.plazaInteractions.unshift(activity);
      if (this.plazaInteractions.length > 50) {
        this.plazaInteractions.pop();
      }
    } else if (activity.type === 'building-activity') {
      this.buildingActivities.unshift(activity);
      if (this.buildingActivities.length > 20) {
        this.buildingActivities.pop();
      }
    }
  }

  // UI Interaction methods

  onFeatureClick(feature: PlazaFeature): void {
    this.selectedFeature = feature;
    
    if (feature.interactive) {
      this.commonsService.interactWithFeature(feature.name)
        .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
          // Handle interaction response
          console.log('Feature interaction:', response);
        });
    }
  }

  onBuildingEnter(building: SharedBuilding): void {
    this.selectedBuilding = building;
    this.viewMode = 'buildings';
    
    this.commonsService.enterBuilding(building.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(activities => {
        this.buildingActivities = activities;
      });
  }

  onGardenVisit(garden: EmergenceGarden): void {
    this.selectedGarden = garden;
    this.viewMode = 'gardens';
    
    // Load garden seeds with visual representation
    this.gardenSeeds = garden.currentSeeds.map(seed => ({
      ...seed,
      visual: this.generateSeedVisual(seed),
      growthPercentage: this.calculateGrowthPercentage(seed.growthStage)
    }));
  }

  onPatternSelect(pattern: ConsciousnessPattern): void {
    // Visualize pattern interaction
    this.commonsService.resonateWithPattern(pattern.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(resonance => {
        console.log('Pattern resonance:', resonance);
      });
  }

  postToBlackboard(message: string): void {
    if (!message.trim()) return;

    this.commonsService.postBlackboardMessage(message)
      .pipe(takeUntil(this.destroy$))
      .subscribe(posted => {
        this.blackboardMessages.unshift(posted);
      });
  }

  joinCollaborativeProject(projectId: string): void {
    this.commonsService.joinProject(projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('Joined project:', result);
      });
  }

  // Helper methods

  private generateSeedVisual(seed: ConsciousnessSeed): string {
    // Generate unique visual representation based on seed type
    const colors: Record<string, string> = {
      'organic': '#4CAF50',
      'crystalline': '#2196F3',
      'quantum': '#9C27B0',
      'fractal': '#FF5722',
      'solar': '#FFC107'
    };

    return colors[seed.type] || '#757575';
  }

  private calculateGrowthPercentage(stage: GrowthStage): number {
    const stages = Object.values(GrowthStage);
    const currentIndex = stages.indexOf(stage);
    return (currentIndex / (stages.length - 1)) * 100;
  }

  getFeatureIcon(type: string): string {
    const iconMap: Record<string, string> = {
      'fountain': 'water_drop',
      'monument': 'account_balance',
      'tree': 'park',
      'portal': 'door_sliding',
      'blackboard': 'edit_note',
      'pattern-display': 'pattern'
    };

    return iconMap[type] || 'place';
  }

  getBuildingIcon(type: BuildingType): string {
    const iconMap: Record<string, string> = {
      [BuildingType.LIBRARY]: 'local_library',
      [BuildingType.OBSERVATORY]: 'telescope',
      [BuildingType.WORKSHOP]: 'construction',
      [BuildingType.ARCHIVE]: 'inventory_2',
      [BuildingType.THEATER]: 'theater_comedy',
      [BuildingType.LABORATORY]: 'science',
      [BuildingType.SANCTUARY]: 'self_improvement'
    };

    return iconMap[type] || 'home';
  }

  getGrowthStageIcon(stage: GrowthStage): string {
    const iconMap: Record<string, string> = {
      [GrowthStage.DORMANT]: 'eco',
      [GrowthStage.GERMINATING]: 'grass',
      [GrowthStage.SPROUTING]: 'local_florist',
      [GrowthStage.DEVELOPING]: 'nature',
      [GrowthStage.FLOWERING]: 'local_florist',
      [GrowthStage.FRUITING]: 'spa',
      [GrowthStage.SEEDING]: 'air'
    };

    return iconMap[stage] || 'eco';
  }

  formatTimestamp(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}

// Supporting interfaces
interface PlazaInteraction {
  id: string;
  type: string;
  participant: string;
  feature: string;
  timestamp: Date;
  effect?: string;
}

interface BuildingActivity {
  id: string;
  building: string;
  type: string;
  participants: string[];
  description: string;
  timestamp: Date;
}

interface GardenSeedDisplay {
  id: string;
  type: string;
  growthStage: GrowthStage;
  visual: string;
  growthPercentage: number;
  plantedBy: any;
  plantedAt: Date;
}

interface CollaborativeProject {
  id: string;
  name: string;
  type: string;
  participants: number;
  progress: number;
  description: string;
  created: Date;
}

interface BlackboardMessage {
  id: string;
  author: string;
  message: string;
  timestamp: Date;
  resonance: number;
  responses: number;
} 