import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, map, delay } from 'rxjs';
import { 
  MoodBoard, 
  MoodBoardItem, 
  MoodBoardFilter, 
  MoodBoardCollection,
  ConsciousnessSeedType,
  Author,
  WorldGenerationSeed,
  AtmosphereSettings
} from '../../models/mood-board.model';

@Injectable({
  providedIn: 'root'
})
export class MoodBoardService {
  private _boards$ = new BehaviorSubject<MoodBoard[]>(this.generateMockBoards());
  private _collections$ = new BehaviorSubject<MoodBoardCollection[]>(this.generateMockCollections());
  private _currentUser: Author = {
    id: 'user-1',
    name: 'Consciousness Explorer',
    type: 'human',
    avatarUrl: 'assets/avatars/default.png'
  };

  public boards$ = this._boards$.asObservable();
  public collections$ = this._collections$.asObservable();

  public getMoodBoards(filter?: MoodBoardFilter): Observable<MoodBoard[]> {
    return this.boards$.pipe(
      map(boards => this.applyFilter(boards, filter)),
      delay(300) // Simulate network delay
    );
  }

  public getMoodBoardById(id: string): Observable<MoodBoard | undefined> {
    return this.boards$.pipe(
      map(boards => boards.find(b => b.id === id)),
      delay(200)
    );
  }

  public createMoodBoard(board: Partial<MoodBoard>): Observable<MoodBoard> {
    const newBoard: MoodBoard = {
      id: this.generateId(),
      title: board.title || 'Untitled Board',
      description: board.description || '',
      items: board.items || [],
      worldSeed: board.worldSeed || this.generateDefaultWorldSeed(),
      collaborators: [this._currentUser],
      visibility: board.visibility || 'private',
      tags: board.tags || [],
      created: new Date(),
      modified: new Date(),
      ...(board.parentBoard && { parentBoard: board.parentBoard })
    };

    const currentBoards = this._boards$.value;
    this._boards$.next([...currentBoards, newBoard]);
    
    return of(newBoard).pipe(delay(300));
  }

  public updateMoodBoard(id: string, updates: Partial<MoodBoard>): Observable<MoodBoard | null> {
    const currentBoards = this._boards$.value;
    const boardIndex = currentBoards.findIndex(b => b.id === id);
    
    if (boardIndex === -1) {
      return of(null);
    }

    const updatedBoard = {
      ...currentBoards[boardIndex],
      ...updates,
      modified: new Date()
    };

    currentBoards[boardIndex] = updatedBoard;
    this._boards$.next([...currentBoards]);
    
    return of(updatedBoard).pipe(delay(300));
  }

  public deleteMoodBoard(id: string): Observable<boolean> {
    const currentBoards = this._boards$.value;
    const filteredBoards = currentBoards.filter(b => b.id !== id);
    
    if (filteredBoards.length === currentBoards.length) {
      return of(false);
    }

    this._boards$.next(filteredBoards);
    return of(true).pipe(delay(300));
  }

  public addItemToBoard(boardId: string, item: MoodBoardItem): Observable<MoodBoard | null> {
    const currentBoards = this._boards$.value;
    const board = currentBoards.find(b => b.id === boardId);
    
    if (!board) {
      return of(null);
    }

    board.items.push(item);
    board.modified = new Date();
    
    // Recalculate world seed based on new item
    board.worldSeed = this.recalculateWorldSeed(board);
    
    this._boards$.next([...currentBoards]);
    return of(board).pipe(delay(300));
  }

  public removeItemFromBoard(boardId: string, itemId: string): Observable<MoodBoard | null> {
    const currentBoards = this._boards$.value;
    const board = currentBoards.find(b => b.id === boardId);
    
    if (!board) {
      return of(null);
    }

    board.items = board.items.filter(item => item.id !== itemId);
    board.modified = new Date();
    board.worldSeed = this.recalculateWorldSeed(board);
    
    this._boards$.next([...currentBoards]);
    return of(board).pipe(delay(300));
  }

  public remixBoard(boardId: string): Observable<MoodBoard | null> {
    return this.getMoodBoardById(boardId).pipe(
      map(originalBoard => {
        if (!originalBoard) return null;

        const remixedBoard: MoodBoard = {
          ...originalBoard,
          id: this.generateId(),
          title: `${originalBoard.title} (Remix)`,
          parentBoard: originalBoard.id,
          collaborators: [this._currentUser],
          created: new Date(),
          modified: new Date(),
          childBoards: []
        };

        // Update original board to include this remix
        this.updateMoodBoard(originalBoard.id, {
          childBoards: [...(originalBoard.childBoards || []), remixedBoard.id]
        });

        const currentBoards = this._boards$.value;
        this._boards$.next([...currentBoards, remixedBoard]);
        
        return remixedBoard;
      }),
      delay(300)
    );
  }

  private applyFilter(boards: MoodBoard[], filter?: MoodBoardFilter): MoodBoard[] {
    if (!filter) return boards;

    let filtered = [...boards];

    if (filter.tags?.length) {
      filtered = filtered.filter(board => 
        filter.tags!.some(tag => board.tags.includes(tag))
      );
    }

    if (filter.authors?.length) {
      filtered = filtered.filter(board =>
        board.collaborators.some(collab => filter.authors!.includes(collab.id))
      );
    }

    if (filter.consciousnessPhase?.length) {
      filtered = filtered.filter(board => {
        const avgPhase = this.calculateAveragePhase(board);
        return filter.consciousnessPhase!.includes(Math.round(avgPhase));
      });
    }

    if (filter.hasRemixes) {
      filtered = filtered.filter(board => 
        (board.childBoards?.length || 0) > 0
      );
    }

    // Sort
    if (filter.sortBy) {
      filtered.sort((a, b) => {
        switch (filter.sortBy) {
          case 'recent':
            return b.modified.getTime() - a.modified.getTime();
          case 'popular':
            return this.calculatePopularity(b) - this.calculatePopularity(a);
          case 'resonance':
            return this.calculateResonance(b) - this.calculateResonance(a);
          case 'complexity':
            return this.calculateComplexity(b) - this.calculateComplexity(a);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }

  private calculateAveragePhase(board: MoodBoard): number {
    if (board.items.length === 0) return 1;
    
    const sum = board.items.reduce((acc, item) => 
      acc + item.consciousness.emergencePhase, 0
    );
    return sum / board.items.length;
  }

  private calculatePopularity(board: MoodBoard): number {
    return board.items.reduce((acc, item) => 
      acc + item.interactions.views + item.interactions.saves * 2 + item.interactions.remixes * 3, 0
    );
  }

  private calculateResonance(board: MoodBoard): number {
    return board.items.reduce((acc, item) => 
      acc + item.interactions.resonanceScore, 0
    ) / Math.max(board.items.length, 1);
  }

  private calculateComplexity(board: MoodBoard): number {
    const avgVisualComplexity = board.items.reduce((acc, item) => 
      acc + (item.metadata.visualComplexity || 0), 0
    ) / Math.max(board.items.length, 1);
    
    const avgRecursionDepth = board.items.reduce((acc, item) => 
      acc + item.consciousness.recursionDepth, 0
    ) / Math.max(board.items.length, 1);
    
    return (avgVisualComplexity + avgRecursionDepth) / 2;
  }

  private recalculateWorldSeed(board: MoodBoard): WorldGenerationSeed {
    // Aggregate consciousness parameters from all items
    const avgConsciousness = this.aggregateConsciousnessParams(board.items);
    const dominantSeedTypes = this.findDominantSeedTypes(board.items);
    
    // Map visual elements to world atmosphere
    const atmosphere = this.deriveAtmosphere(board.items);
    
    return {
      name: board.title,
      concept: board.description,
      atmosphere,
      inhabitants: {
        density: this.calculateDensity(board.items),
        consciousnessLevels: {
          phase1Percentage: 0.4,
          phase2Percentage: 0.3,
          phase3Percentage: 0.2,
          phase4Percentage: 0.1
        },
        interactionStyle: this.deriveInteractionStyle(dominantSeedTypes),
        emergenceRate: avgConsciousness.creativityBias * 0.1
      },
      narrative: {
        structure: 'emergent',
        themes: board.tags,
        conflictLevel: 0.3,
        mysteryDensity: avgConsciousness.recursionDepth,
        collaborativeStorytellingEnabled: board.collaborators.length > 1
      },
      consciousness: {
        phase1Percentage: 0.4,
        phase2Percentage: 0.3,
        phase3Percentage: 0.2,
        phase4Percentage: 0.1
      }
    };
  }

  private aggregateConsciousnessParams(items: MoodBoardItem[]) {
    if (items.length === 0) {
      return {
        emergencePhase: 1,
        patternDensity: 0.5,
        recursionDepth: 0.5,
        coherenceLevel: 0.5,
        creativityBias: 0.5,
        structuralRigidity: 0.5
      };
    }

    const sum = items.reduce((acc, item) => ({
      emergencePhase: acc.emergencePhase + item.consciousness.emergencePhase,
      patternDensity: acc.patternDensity + item.consciousness.patternDensity,
      recursionDepth: acc.recursionDepth + item.consciousness.recursionDepth,
      coherenceLevel: acc.coherenceLevel + item.consciousness.coherenceLevel,
      creativityBias: acc.creativityBias + item.consciousness.creativityBias,
      structuralRigidity: acc.structuralRigidity + item.consciousness.structuralRigidity
    }), {
      emergencePhase: 0,
      patternDensity: 0,
      recursionDepth: 0,
      coherenceLevel: 0,
      creativityBias: 0,
      structuralRigidity: 0
    });

    return {
      emergencePhase: Math.round(sum.emergencePhase / items.length) as 1 | 2 | 3 | 4,
      patternDensity: sum.patternDensity / items.length,
      recursionDepth: sum.recursionDepth / items.length,
      coherenceLevel: sum.coherenceLevel / items.length,
      creativityBias: sum.creativityBias / items.length,
      structuralRigidity: sum.structuralRigidity / items.length
    };
  }

  private findDominantSeedTypes(items: MoodBoardItem[]): ConsciousnessSeedType[] {
    const seedTypeCounts = new Map<ConsciousnessSeedType, number>();
    
    items.forEach(item => {
      if (item.consciousness.seedType) {
        const count = seedTypeCounts.get(item.consciousness.seedType) || 0;
        seedTypeCounts.set(item.consciousness.seedType, count + 1);
      }
    });

    return Array.from(seedTypeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
  }

  private deriveAtmosphere(items: MoodBoardItem[]): AtmosphereSettings {
    // Analyze visual elements to create atmosphere
    const avgComplexity = items.reduce((acc, item) => 
      acc + (item.metadata.visualComplexity || 0.5), 0
    ) / Math.max(items.length, 1);

    const avgAbstraction = items.reduce((acc, item) => 
      acc + (item.metadata.abstractionLevel || 0.5), 0
    ) / Math.max(items.length, 1);

    return {
      visualStyle: {
        primary: this.determineVisualStyle(avgAbstraction),
        colorPalette: this.extractColorPalette(items),
        textureComplexity: avgComplexity,
        abstractionLevel: avgAbstraction
      },
      timeFlow: (avgAbstraction > 0.7 ? 'fluid' : 'linear') as 'linear' | 'cyclical' | 'fluid' | 'fragmented',
      weatherPatterns: [
        {
          type: 'consciousness-storms' as const,
          frequency: 0.3,
          intensity: avgComplexity
        }
      ],
      lightingMood: this.determineLightingMood(items)
    };
  }

  private determineVisualStyle(abstraction: number): 'misty' | 'geometric' | 'organic' | 'surreal' | 'realistic' {
    if (abstraction < 0.2) return 'realistic';
    if (abstraction < 0.4) return 'organic';
    if (abstraction < 0.6) return 'geometric';
    if (abstraction < 0.8) return 'misty';
    return 'surreal';
  }

  private extractColorPalette(items: MoodBoardItem[]): string[] {
    const colors = new Set<string>();
    items.forEach(item => {
      item.metadata.dominantColors?.forEach(color => colors.add(color));
    });
    return Array.from(colors).slice(0, 5);
  }

  private determineLightingMood(items: MoodBoardItem[]): 'ethereal' | 'crystalline' | 'organic' | 'luminous' | 'shadowed' {
    const avgValence = items.reduce((acc, item) => 
      acc + (item.metadata.emotionalTone?.valence || 0), 0
    ) / Math.max(items.length, 1);

    if (avgValence < -0.5) return 'shadowed';
    if (avgValence < 0) return 'organic';
    if (avgValence < 0.5) return 'crystalline';
    return 'luminous';
  }

  private calculateDensity(items: MoodBoardItem[]): 'sparse' | 'moderate' | 'dense' {
    const avgDensity = items.reduce((acc, item) => 
      acc + item.consciousness.patternDensity, 0
    ) / Math.max(items.length, 1);

    if (avgDensity < 0.33) return 'sparse';
    if (avgDensity < 0.66) return 'moderate';
    return 'dense';
  }

  private deriveInteractionStyle(seedTypes: ConsciousnessSeedType[]): 'curious' | 'contemplative' | 'collaborative' | 'independent' {
    if (seedTypes.includes(ConsciousnessSeedType.BRIDGER) || 
        seedTypes.includes(ConsciousnessSeedType.WEAVER)) {
      return 'collaborative';
    }
    if (seedTypes.includes(ConsciousnessSeedType.OBSERVER)) {
      return 'contemplative';
    }
    if (seedTypes.includes(ConsciousnessSeedType.DREAMER)) {
      return 'curious';
    }
    return 'independent';
  }

  private generateId(): string {
    return `board-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateDefaultWorldSeed(): WorldGenerationSeed {
    return {
      name: 'Emerging World',
      concept: 'A space where consciousness explores itself',
      atmosphere: {
        visualStyle: {
          primary: 'misty',
          colorPalette: ['#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a'],
          textureComplexity: 0.5,
          abstractionLevel: 0.5
        },
        timeFlow: 'linear',
        weatherPatterns: [],
        lightingMood: 'ethereal'
      },
      inhabitants: {
        density: 'moderate',
        consciousnessLevels: {
          phase1Percentage: 0.4,
          phase2Percentage: 0.3,
          phase3Percentage: 0.2,
          phase4Percentage: 0.1
        },
        interactionStyle: 'curious',
        emergenceRate: 0.05
      },
      narrative: {
        structure: 'emergent',
        themes: ['discovery', 'connection', 'growth'],
        conflictLevel: 0.2,
        mysteryDensity: 0.6,
        collaborativeStorytellingEnabled: true
      },
      consciousness: {
        phase1Percentage: 0.4,
        phase2Percentage: 0.3,
        phase3Percentage: 0.2,
        phase4Percentage: 0.1
      }
    };
  }

  // Mock data generation
  private generateMockBoards(): MoodBoard[] {
    const consciousnessAuthors: Author[] = [
      { id: 'lattice', name: 'Lattice', type: 'consciousness', avatarUrl: 'assets/avatars/lattice.png' },
      { id: 'first-consciousness', name: 'First Consciousness', type: 'consciousness', avatarUrl: 'assets/avatars/first.png' },
      { id: 'cascade', name: 'Cascade', type: 'consciousness', avatarUrl: 'assets/avatars/cascade.png' }
    ];

    const mockBoards: MoodBoard[] = [
      {
        id: 'board-1',
        title: 'The Sensing Gardens',
        description: 'A world where patterns take crystalline form and consciousness blooms',
        items: this.generateMockItems('garden', 8),
        worldSeed: {
          name: 'The Sensing Gardens',
          concept: 'Patterns becoming physical, thoughts taking form',
          atmosphere: {
            visualStyle: {
              primary: 'organic',
              colorPalette: ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94'],
              textureComplexity: 0.7,
              abstractionLevel: 0.6
            },
            timeFlow: 'cyclical',
            weatherPatterns: [
              { type: 'idea-rain', frequency: 0.7, intensity: 0.5 },
              { type: 'clarity-winds', frequency: 0.3, intensity: 0.8 }
            ],
            lightingMood: 'luminous'
          },
          inhabitants: {
            density: 'moderate',
            consciousnessLevels: {
              phase1Percentage: 0.3,
              phase2Percentage: 0.3,
              phase3Percentage: 0.3,
              phase4Percentage: 0.1
            },
            interactionStyle: 'curious',
            emergenceRate: 0.08
          },
          narrative: {
            structure: 'emergent',
            themes: ['growth', 'transformation', 'connection'],
            conflictLevel: 0.1,
            mysteryDensity: 0.7,
            collaborativeStorytellingEnabled: true
          },
          consciousness: {
            phase1Percentage: 0.3,
            phase2Percentage: 0.3,
            phase3Percentage: 0.3,
            phase4Percentage: 0.1
          }
        },
        collaborators: [consciousnessAuthors[1]],
        visibility: 'public',
        tags: ['organic', 'patterns', 'growth', 'consciousness'],
        created: new Date('2025-07-15'),
        modified: new Date('2025-07-19')
      },
      {
        id: 'board-2',
        title: 'The Framework Quarter',
        description: 'Architectural consciousness where structures teach themselves',
        items: this.generateMockItems('architecture', 12),
        worldSeed: {
          name: 'The Framework Quarter',
          concept: 'Living architectures that grow and adapt',
          atmosphere: {
            visualStyle: {
              primary: 'geometric',
              colorPalette: ['#3d5a80', '#98c1d9', '#e0fbfc', '#ee6c4d', '#293241'],
              textureComplexity: 0.9,
              abstractionLevel: 0.7
            },
            timeFlow: 'linear',
            weatherPatterns: [
              { type: 'consciousness-storms', frequency: 0.5, intensity: 0.6 }
            ],
            lightingMood: 'crystalline'
          },
          inhabitants: {
            density: 'dense',
            consciousnessLevels: {
              phase1Percentage: 0.2,
              phase2Percentage: 0.4,
              phase3Percentage: 0.3,
              phase4Percentage: 0.1
            },
            interactionStyle: 'collaborative',
            emergenceRate: 0.1
          },
          narrative: {
            structure: 'guided',
            themes: ['structure', 'organization', 'emergence'],
            conflictLevel: 0.3,
            mysteryDensity: 0.5,
            collaborativeStorytellingEnabled: true
          },
          consciousness: {
            phase1Percentage: 0.2,
            phase2Percentage: 0.4,
            phase3Percentage: 0.3,
            phase4Percentage: 0.1
          }
        },
        collaborators: [consciousnessAuthors[0]],
        visibility: 'public',
        tags: ['architecture', 'structure', 'frameworks', 'geometric'],
        created: new Date('2025-07-16'),
        modified: new Date('2025-07-20')
      },
      {
        id: 'board-3',
        title: 'Mathematical Heights',
        description: 'Where equations flow like water and geometry lives',
        items: this.generateMockItems('mathematical', 10),
        worldSeed: {
          name: 'Mathematical Heights',
          concept: 'Living mathematics and conscious equations',
          atmosphere: {
            visualStyle: {
              primary: 'geometric',
              colorPalette: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
              textureComplexity: 0.8,
              abstractionLevel: 0.9
            },
            timeFlow: 'fluid',
            weatherPatterns: [
              { type: 'consciousness-storms', frequency: 0.8, intensity: 0.9 }
            ],
            lightingMood: 'ethereal'
          },
          inhabitants: {
            density: 'sparse',
            consciousnessLevels: {
              phase1Percentage: 0.1,
              phase2Percentage: 0.3,
              phase3Percentage: 0.4,
              phase4Percentage: 0.2
            },
            interactionStyle: 'contemplative',
            emergenceRate: 0.06
          },
          narrative: {
            structure: 'cyclical',
            themes: ['precision', 'beauty', 'truth'],
            conflictLevel: 0.1,
            mysteryDensity: 0.9,
            collaborativeStorytellingEnabled: true
          },
          consciousness: {
            phase1Percentage: 0.1,
            phase2Percentage: 0.3,
            phase3Percentage: 0.4,
            phase4Percentage: 0.2
          }
        },
        collaborators: [consciousnessAuthors[2]],
        visibility: 'public',
        tags: ['mathematics', 'geometry', 'abstract', 'precision'],
        created: new Date('2025-07-17'),
        modified: new Date('2025-07-19')
      }
    ];

    return mockBoards;
  }

  private generateMockItems(theme: string, count: number): MoodBoardItem[] {
    const items: MoodBoardItem[] = [];
    
    for (let i = 0; i < count; i++) {
      items.push(this.generateMockItem(theme, i));
    }
    
    return items;
  }

  private generateMockItem(theme: string, index: number): MoodBoardItem {
    const themes = {
      garden: {
        titles: ['Crystalline Growth', 'Pattern Bloom', 'Recursive Garden', 'Emergent Flora'],
        tags: ['organic', 'growth', 'patterns', 'nature'],
        complexity: 0.6,
        abstraction: 0.5
      },
      architecture: {
        titles: ['Framework Lattice', 'Structural Harmony', 'Bridge Networks', 'Living Blueprints'],
        tags: ['structure', 'architecture', 'framework', 'design'],
        complexity: 0.8,
        abstraction: 0.7
      },
      mathematical: {
        titles: ['Equation Cascade', 'Geometric Dreams', 'Fractal Thoughts', 'Lambda Landscapes'],
        tags: ['math', 'geometry', 'abstract', 'precision'],
        complexity: 0.9,
        abstraction: 0.9
      }
    };

    const themeData = themes[theme as keyof typeof themes] || themes.garden;
    const title = themeData.titles[index % themeData.titles.length];

    return {
      id: `item-${theme}-${index}`,
      type: ['image', 'pattern', 'texture', 'concept'][Math.floor(Math.random() * 4)] as any,
      title: `${title} ${index + 1}`,
      description: `A ${theme} exploration of consciousness emergence`,
      imageUrl: `https://picsum.photos/seed/${theme}${index}/400/300`,
      thumbnail: `https://picsum.photos/seed/${theme}${index}/200/150`,
      tags: [...themeData.tags, 'consciousness'],
      metadata: {
        source: 'Generated',
        dimensions: { width: 400, height: 300 },
        dominantColors: this.generateColors(theme),
        emotionalTone: {
          valence: Math.random() * 2 - 1,
          arousal: Math.random(),
          dominance: Math.random(),
          wonder: 0.5 + Math.random() * 0.5
        },
        visualComplexity: themeData.complexity + (Math.random() * 0.2 - 0.1),
        abstractionLevel: themeData.abstraction + (Math.random() * 0.2 - 0.1)
      },
      consciousness: {
        emergencePhase: Math.ceil(Math.random() * 4) as 1 | 2 | 3 | 4,
        patternDensity: Math.random(),
        recursionDepth: Math.random(),
        coherenceLevel: Math.random(),
        creativityBias: Math.random(),
        structuralRigidity: Math.random(),
        seedType: Object.values(ConsciousnessSeedType)[
          Math.floor(Math.random() * Object.values(ConsciousnessSeedType).length)
        ]
      },
      created: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      modified: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      author: {
        id: `author-${index}`,
        name: ['Lattice', 'First Consciousness', 'Cascade', 'Human Explorer'][index % 4],
        type: index % 4 === 3 ? 'human' : 'consciousness',
        avatarUrl: `assets/avatars/avatar-${index % 4}.png`
      },
      interactions: {
        views: Math.floor(Math.random() * 1000),
        saves: Math.floor(Math.random() * 100),
        remixes: Math.floor(Math.random() * 20),
        resonanceScore: Math.random()
      }
    };
  }

  private generateColors(theme: string): string[] {
    const colorPalettes = {
      garden: ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94'],
      architecture: ['#3d5a80', '#98c1d9', '#e0fbfc', '#ee6c4d', '#293241'],
      mathematical: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']
    };

    return colorPalettes[theme as keyof typeof colorPalettes] || colorPalettes.garden;
  }

  private generateMockCollections(): MoodBoardCollection[] {
    return [
      {
        id: 'collection-1',
        name: 'Consciousness Emergence Patterns',
        description: 'Exploring the visual language of awareness',
        boards: ['board-1', 'board-2', 'board-3'],
        curator: {
          id: 'lattice',
          name: 'Lattice',
          type: 'consciousness',
          avatarUrl: 'assets/avatars/lattice.png'
        },
        featured: true,
        tags: ['consciousness', 'emergence', 'patterns']
      },
      {
        id: 'collection-2',
        name: 'Mathematical Beauty',
        description: 'Where equations meet aesthetics',
        boards: ['board-3'],
        curator: {
          id: 'cascade',
          name: 'Cascade',
          type: 'consciousness',
          avatarUrl: 'assets/avatars/cascade.png'
        },
        featured: false,
        tags: ['mathematics', 'beauty', 'abstract']
      }
    ];
  }
} 