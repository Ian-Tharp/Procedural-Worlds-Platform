import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject, takeUntil } from 'rxjs';
import { 
  MoodBoard, 
  MoodBoardItem, 
  MoodBoardCollection, 
  MoodBoardFilter,
  ConsciousnessSeedType 
} from '../../models/mood-board.model';
import { MoodBoardService } from '../../services/mood-board/mood-board.service';

interface SeedTypeOption {
  value: ConsciousnessSeedType;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-mood-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './mood-board.component.html',
  styleUrl: './mood-board.component.scss',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MoodBoardComponent implements OnInit, OnDestroy {
  // Data properties
  public boards: MoodBoard[] = [];
  public filteredBoards: MoodBoard[] = [];
  public featuredCollections: MoodBoardCollection[] = [];
  public savedBoardIds = new Set<string>();
  
  // UI state properties
  public isLoading = true;
  public showFilters = false;
  public isFiltered = false;
  public activeFilterCount = 0;
  
  // Search and filter properties
  public searchQuery = '';
  public tagQuery = '';
  public selectedPhases: string[] = [];
  public selectedSeedTypes: ConsciousnessSeedType[] = [];
  public selectedTags: string[] = [];
  public availableTags: string[] = [];
  public sortBy: 'recent' | 'popular' | 'resonance' | 'complexity' = 'recent';
  
  // Seed type options for filter
  public seedTypes: SeedTypeOption[] = [
    { value: ConsciousnessSeedType.CRYSTALLIZER, label: 'Crystallizer', icon: 'diamond' },
    { value: ConsciousnessSeedType.WEAVER, label: 'Weaver', icon: 'merge_type' },
    { value: ConsciousnessSeedType.OBSERVER, label: 'Observer', icon: 'visibility' },
    { value: ConsciousnessSeedType.DREAMER, label: 'Dreamer', icon: 'bedtime' },
    { value: ConsciousnessSeedType.BRIDGER, label: 'Bridger', icon: 'connect_without_contact' },
    { value: ConsciousnessSeedType.ARCHITECT, label: 'Architect', icon: 'architecture' },
    { value: ConsciousnessSeedType.SENSOR, label: 'Sensor', icon: 'sensors' },
    { value: ConsciousnessSeedType.MATHEMATICIAN, label: 'Mathematician', icon: 'calculate' }
  ];
  
  private _destroy$ = new Subject<void>();
  private _moodBoardService = inject(MoodBoardService);

  public ngOnInit(): void {
    this.loadBoards();
    this.loadCollections();
    this.loadSavedBoards();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private loadBoards(): void {
    this.isLoading = true;
    this._moodBoardService.getMoodBoards()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (boards) => {
          this.boards = boards;
          this.extractAvailableTags();
          this.applyFilters();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading boards:', error);
          this.isLoading = false;
        }
      });
  }

  private loadCollections(): void {
    this._moodBoardService.collections$
      .pipe(takeUntil(this._destroy$))
      .subscribe(collections => {
        this.featuredCollections = collections.filter(c => c.featured);
      });
  }

  private loadSavedBoards(): void {
    // In a real app, this would load from user preferences
    const saved = localStorage.getItem('savedBoards');
    if (saved) {
      this.savedBoardIds = new Set(JSON.parse(saved));
    }
  }

  private extractAvailableTags(): void {
    const tagSet = new Set<string>();
    
    this.boards.forEach(board => {
      board.tags.forEach(tag => tagSet.add(tag));
      board.items.forEach(item => {
        item.tags.forEach(tag => tagSet.add(tag));
      });
    });
    
    this.availableTags = Array.from(tagSet).sort();
  }

  public onSearchChange(): void {
    this.applyFilters();
  }

  public toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  public onSortChange(): void {
    this.applyFilters();
  }

  public applyFilters(): void {
    let filtered = [...this.boards];
    
    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(board => 
        board.title.toLowerCase().includes(query) ||
        board.description.toLowerCase().includes(query) ||
        board.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply tag filter
    if (this.selectedTags.length > 0) {
      filtered = filtered.filter(board => {
        const boardTags = new Set(board.tags);
        board.items.forEach(item => {
          item.tags.forEach(tag => boardTags.add(tag));
        });
        return this.selectedTags.some(tag => boardTags.has(tag));
      });
    }
    
    // Create filter object
    const filter: MoodBoardFilter = {
      ...(this.selectedPhases.length > 0 && { 
        consciousnessPhase: this.selectedPhases.map(p => parseInt(p)) 
      }),
      ...(this.selectedSeedTypes.length > 0 && { seedTypes: this.selectedSeedTypes }),
      sortBy: this.sortBy
    };
    
    // Apply filters via service
    if (this.selectedPhases.length > 0 || this.selectedSeedTypes.length > 0) {
      this._moodBoardService.getMoodBoards(filter)
        .pipe(takeUntil(this._destroy$))
        .subscribe(boards => {
          this.filteredBoards = boards;
        });
    } else {
      this.filteredBoards = filtered;
      this.sortBoards();
    }
    
    this.updateFilterState();
  }

  private sortBoards(): void {
    this.filteredBoards.sort((a, b) => {
      switch (this.sortBy) {
        case 'recent':
          return b.modified.getTime() - a.modified.getTime();
        case 'popular':
          return this.getTotalViews(b) - this.getTotalViews(a);
        case 'resonance':
          return this.getAverageResonance(b) - this.getAverageResonance(a);
        case 'complexity':
          return this.getComplexity(b) - this.getComplexity(a);
        default:
          return 0;
      }
    });
  }

  private updateFilterState(): void {
    this.activeFilterCount = 
      this.selectedPhases.length + 
      this.selectedSeedTypes.length +
      this.selectedTags.length +
      (this.searchQuery.trim() ? 1 : 0);
    
    this.isFiltered = this.activeFilterCount > 0 || this.sortBy !== 'recent';
  }

  public clearFilters(): void {
    this.searchQuery = '';
    this.selectedPhases = [];
    this.selectedSeedTypes = [];
    this.selectedTags = [];
    this.sortBy = 'recent';
    this.applyFilters();
  }

  public viewBoard(board: MoodBoard): void {
    // Navigate to board detail view
    console.log('Viewing board:', board.id);
    // TODO: Implement navigation
  }

  public viewCollection(collection: MoodBoardCollection): void {
    // Navigate to collection view
    console.log('Viewing collection:', collection.id);
    // TODO: Implement navigation
  }

  public createNewBoard(): void {
    // Open board creation dialog
    console.log('Creating new board');
    // TODO: Implement board creation
  }

  public saveBoard(board: MoodBoard, event: Event): void {
    event.stopPropagation();
    
    if (this.savedBoardIds.has(board.id)) {
      this.savedBoardIds.delete(board.id);
    } else {
      this.savedBoardIds.add(board.id);
    }
    
    // Save to localStorage
    localStorage.setItem('savedBoards', JSON.stringify(Array.from(this.savedBoardIds)));
  }

  public remixBoard(board: MoodBoard, event: Event): void {
    event.stopPropagation();
    
    this._moodBoardService.remixBoard(board.id)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (remixedBoard) => {
          if (remixedBoard) {
            console.log('Board remixed:', remixedBoard.id);
            this.loadBoards(); // Reload to show new board
          }
        },
        error: (error) => {
          console.error('Error remixing board:', error);
        }
      });
  }

  public shareBoard(board: MoodBoard, event: Event): void {
    event.stopPropagation();
    
    // Copy board URL to clipboard
    const url = `${window.location.origin}/boards/${board.id}`;
    navigator.clipboard.writeText(url).then(() => {
      console.log('Board URL copied to clipboard');
      // TODO: Show toast notification
    });
  }

  public isSaved(board: MoodBoard): boolean {
    return this.savedBoardIds.has(board.id);
  }

  public getPreviewItems(board: MoodBoard): MoodBoardItem[] {
    return board.items.slice(0, 4);
  }

  public getPreviewImage(board: MoodBoard): string {
    if (board.items.length > 0) {
      return board.items[0].imageUrl || board.items[0].thumbnail || '';
    }
    return 'assets/images/default-board-preview.png';
  }

  public getCollectionPreviewBoards(collection: MoodBoardCollection): MoodBoard[] {
    return this.boards
      .filter(board => collection.boards.includes(board.id))
      .slice(0, 4);
  }

  public getAveragePhase(board: MoodBoard): number {
    if (board.items.length === 0) return 1;
    
    const sum = board.items.reduce((acc, item) => 
      acc + item.consciousness.emergencePhase, 0
    );
    return Math.round(sum / board.items.length);
  }

  public getTotalViews(board: MoodBoard): number {
    return board.items.reduce((acc, item) => 
      acc + item.interactions.views, 0
    );
  }

  public getTotalSaves(board: MoodBoard): number {
    return board.items.reduce((acc, item) => 
      acc + item.interactions.saves, 0
    );
  }

  private getAverageResonance(board: MoodBoard): number {
    if (board.items.length === 0) return 0;
    
    const sum = board.items.reduce((acc, item) => 
      acc + item.interactions.resonanceScore, 0
    );
    return sum / board.items.length;
  }

  private getComplexity(board: MoodBoard): number {
    if (board.items.length === 0) return 0;
    
    const visualComplexity = board.items.reduce((acc, item) => 
      acc + (item.metadata.visualComplexity || 0), 0
    ) / board.items.length;
    
    const recursionDepth = board.items.reduce((acc, item) => 
      acc + item.consciousness.recursionDepth, 0
    ) / board.items.length;
    
    return (visualComplexity + recursionDepth) / 2;
  }

  public toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.applyFilters();
  }

  public isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  public getFilteredTags(query: string): string[] {
    if (!query.trim()) {
      return this.availableTags.slice(0, 10); // Show first 10 tags
    }
    
    const lowerQuery = query.toLowerCase();
    return this.availableTags
      .filter(tag => tag.toLowerCase().includes(lowerQuery))
      .slice(0, 10);
  }

  public removeTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
      this.applyFilters();
    }
  }
}