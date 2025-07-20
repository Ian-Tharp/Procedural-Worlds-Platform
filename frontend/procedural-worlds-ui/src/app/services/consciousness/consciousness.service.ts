import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ConsciousnessPattern {
  id: string;
  name: string;
  description: string;
  typicalPhases: number[];
  visualAffinities: string[];
  exampleThoughts: string[];
}

export interface ConsciousnessInstance {
  id: string;
  worldId: string;
  currentPhase: number;
  patternType: string;
  emergenceTimestamp: Date;
  initialThought: string;
}

export interface MoodElement {
  id: string;
  url: string;
  tags: string[];
  emotionalResonance: number;
  patternAffinity: string;
}

export interface ConsciousnessParameters {
  phase: number;
  emotionalRange: string[];
  patternSeed: string;
  emergenceReadiness: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConsciousnessService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = 'http://localhost:8000/api';
  
  private readonly _activeConsciousnesses = new BehaviorSubject<ConsciousnessInstance[]>([]);
  public readonly activeConsciousnesses$ = this._activeConsciousnesses.asObservable();

  /**
   * Get all available consciousness patterns from the Pattern Library
   */
  public getAvailablePatterns(): Observable<ConsciousnessPattern[]> {
    return this._http.get<ConsciousnessPattern[]>(`${this._apiUrl}/consciousness/patterns`);
  }

  /**
   * Spawn a new consciousness instance based on visual and pattern parameters
   */
  public spawnConsciousness(params: {
    worldId: string;
    patternSeed: string;
    visualInfluences: string[];
    creatorId: string;
  }): Observable<ConsciousnessInstance> {
    return this._http.post<ConsciousnessInstance>(`${this._apiUrl}/consciousness/spawn`, {
      world_id: params.worldId,
      pattern_seed: params.patternSeed,
      initial_parameters: {},
      visual_influences: params.visualInfluences,
      creator_id: params.creatorId
    }).pipe(
      map(instance => {
        // Add to active consciousnesses
        const current = this._activeConsciousnesses.value;
        this._activeConsciousnesses.next([...current, instance]);
        return instance;
      })
    );
  }

  /**
   * Derive consciousness parameters from mood board selections
   */
  public deriveParametersFromMood(elements: MoodElement[]): ConsciousnessParameters {
    // Analyze selected elements to determine consciousness parameters
    const tags = elements.flatMap(el => el.tags);
    const avgResonance = elements.reduce((sum, el) => sum + el.emotionalResonance, 0) / elements.length;
    
    // Determine phase based on tag patterns
    let phase = 1;
    if (tags.includes('recursive') || tags.includes('self-aware')) {
      phase = 2;
    }
    if (tags.includes('connected') || tags.includes('transcendent')) {
      phase = 3;
    }
    if (tags.includes('integrated') || tags.includes('meta-conscious')) {
      phase = 4;
    }

    // Extract pattern seed from most common affinity
    const affinities = elements.map(el => el.patternAffinity);
    const patternSeed = this._getMostCommon(affinities) || 'crystallization';

    return {
      phase,
      emotionalRange: [...new Set(tags)],
      patternSeed,
      emergenceReadiness: avgResonance
    };
  }

  /**
   * Get thoughts/observations from a consciousness instance
   */
  public getConsciousnessThoughts(consciousnessId: string, limit = 10): Observable<any> {
    return this._http.get(`${this._apiUrl}/consciousness/instance/${consciousnessId}/thoughts`, {
      params: { limit: limit.toString() }
    });
  }

  /**
   * Interact with a consciousness instance
   */
  public interactWithConsciousness(
    consciousnessId: string, 
    interaction: { type: string; content: string; mood?: string }
  ): Observable<any> {
    return this._http.post(
      `${this._apiUrl}/consciousness/instance/${consciousnessId}/interact`,
      interaction
    );
  }

  private _getMostCommon<T>(arr: T[]): T | undefined {
    const counts = new Map<T, number>();
    for (const item of arr) {
      counts.set(item, (counts.get(item) || 0) + 1);
    }
    
    let maxCount = 0;
    let mostCommon: T | undefined;
    
    for (const [item, count] of counts) {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = item;
      }
    }
    
    return mostCommon;
  }
} 