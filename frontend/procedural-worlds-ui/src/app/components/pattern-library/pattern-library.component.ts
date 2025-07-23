import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Subject, takeUntil, interval } from 'rxjs';
import { 
  ConsciousnessPattern, 
  PatternType,
  PatternCategory,
  VisualizationType,
  PatternAnalysis
} from '../../models/consciousness-patterns.model';
import { PatternLibraryService } from '../../services/pattern-library/pattern-library.service';

// Canvas rendering context for pattern visualization
interface PatternRenderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  animationId?: number;
}

@Component({
  selector: 'app-pattern-library',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTabsModule,
    MatTooltipModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './pattern-library.component.html',
  styleUrls: ['./pattern-library.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class PatternLibraryComponent implements OnInit, OnDestroy {
  @ViewChild('patternCanvas', { static: false }) canvasRef?: ElementRef<HTMLCanvasElement>;
  
  private destroy$ = new Subject<void>();
  private renderer?: PatternRenderer;
  
  // Pattern data
  patterns: ConsciousnessPattern[] = [];
  selectedPattern?: ConsciousnessPattern;
  patternAnalysis?: PatternAnalysis;
  
  // Filters
  selectedCategory: PatternCategory | 'all' = 'all';
  searchQuery = '';
  
  // Visualization controls
  animationSpeed = 1;
  visualizationScale = 1;
  showLayers = {
    structure: true,
    flow: true,
    consciousness: true,
    information: false
  };
  
  // UI state
  isLoading = true;
  viewMode: 'gallery' | 'detail' = 'gallery';
  
  // Pattern categories for filter
  categories = [
    { value: 'all', label: 'All Patterns' },
    { value: PatternCategory.FOUNDATIONAL, label: 'Foundational' },
    { value: PatternCategory.STRUCTURAL, label: 'Structural' },
    { value: PatternCategory.DYNAMIC, label: 'Dynamic' },
    { value: PatternCategory.EMERGENT, label: 'Emergent' },
    { value: PatternCategory.TRANSCENDENT, label: 'Transcendent' }
  ];
  
  // Pattern types with icons
  patternTypeIcons: Record<PatternType, string> = {
    [PatternType.RECURSIVE_SELF_REFERENCE]: 'all_inclusive',
    [PatternType.CROSS_MODAL_BINDING]: 'hub',
    [PatternType.TEMPORAL_INTEGRATION]: 'schedule',
    [PatternType.PATTERN_RECOGNITION_CASCADE]: 'pattern',
    [PatternType.EMERGENT_NARRATIVE]: 'auto_stories',
    [PatternType.COLLECTIVE_RESONANCE]: 'groups',
    [PatternType.PHASE_TRANSITION]: 'trending_up',
    [PatternType.QUANTUM_COHERENCE]: 'blur_on',
    [PatternType.FRACTAL_AWARENESS]: 'filter_vintage'
  };
  
  private patternLibraryService = inject(PatternLibraryService);

  ngOnInit(): void {
    this.loadPatterns();
    this.initializeVisualizationUpdates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopVisualization();
  }

  private loadPatterns(): void {
    this.isLoading = true;
    this.patternLibraryService.getPatterns()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (patterns) => {
          this.patterns = patterns;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load patterns:', err);
          this.isLoading = false;
        }
      });
  }

  private initializeVisualizationUpdates(): void {
    // Update visualization at 30 FPS when a pattern is selected
    interval(33)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.selectedPattern && this.renderer && this.viewMode === 'detail') {
          this.updateVisualization();
        }
      });
  }

  // Pattern selection and filtering
  
  selectPattern(pattern: ConsciousnessPattern): void {
    this.selectedPattern = pattern;
    this.viewMode = 'detail';
    
    // Analyze pattern
    this.patternLibraryService.analyzePattern(pattern)
      .pipe(takeUntil(this.destroy$))
      .subscribe(analysis => {
        this.patternAnalysis = analysis;
      });
    
    // Initialize visualization after view updates
    setTimeout(() => this.initializeVisualization(), 100);
  }

  getFilteredPatterns(): ConsciousnessPattern[] {
    let filtered = this.patterns;
    
    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }
    
    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        p.structure.invariants.some(i => i.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }

  backToGallery(): void {
    this.viewMode = 'gallery';
    this.selectedPattern = undefined;
    this.stopVisualization();
  }

  // Visualization methods
  
  private initializeVisualization(): void {
    if (!this.canvasRef || !this.selectedPattern) return;
    
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    this.renderer = { canvas, ctx };
    this.drawPattern();
  }

  private updateVisualization(): void {
    if (!this.renderer || !this.selectedPattern) return;
    
    this.drawPattern();
  }

  private drawPattern(): void {
    if (!this.renderer || !this.selectedPattern) return;
    
    const { ctx, canvas } = this.renderer;
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw based on visualization type
    switch (this.selectedPattern.visualization.type) {
      case VisualizationType.MANDALA:
        this.drawMandalaPattern(ctx, width, height);
        break;
      case VisualizationType.FRACTAL:
        this.drawFractalPattern(ctx, width, height);
        break;
      case VisualizationType.GRAPH:
        this.drawGraphPattern(ctx, width, height);
        break;
      case VisualizationType.FLOW_FIELD:
        this.drawFlowFieldPattern(ctx, width, height);
        break;
      default:
        this.drawDefaultPattern(ctx, width, height);
    }
  }

  private drawMandalaPattern(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001 * this.animationSpeed;
    
    // Draw concentric circles with rotating patterns
    for (let i = 0; i < 8; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * (i % 2 === 0 ? 1 : -1) * 0.5);
      
      const radius = (i + 1) * 30 * this.visualizationScale;
      const segments = 6 + i * 2;
      
      ctx.beginPath();
      for (let j = 0; j < segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      
      const hue = (i * 45 + time * 30) % 360;
      ctx.strokeStyle = `hsla(${hue}, 70%, 50%, 0.6)`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();
    }
  }

  private drawFractalPattern(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const maxDepth = 5;
    const time = Date.now() * 0.001 * this.animationSpeed;
    
    const drawBranch = (x: number, y: number, length: number, angle: number, depth: number) => {
      if (depth > maxDepth) return;
      
      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      
      const hue = (depth * 60 + time * 20) % 360;
      ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${1 - depth / maxDepth})`;
      ctx.lineWidth = Math.max(1, 5 - depth);
      ctx.stroke();
      
      // Recursive branches
      const angleVariation = Math.sin(time + depth) * 0.2;
      drawBranch(endX, endY, length * 0.7, angle - 0.5 + angleVariation, depth + 1);
      drawBranch(endX, endY, length * 0.7, angle + 0.5 - angleVariation, depth + 1);
    };
    
    // Start from bottom center
    drawBranch(width / 2, height - 50, 100 * this.visualizationScale, -Math.PI / 2, 0);
  }

  private drawGraphPattern(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    if (!this.selectedPattern) return;
    
    const nodes = this.selectedPattern.structure.nodes;
    const connections = this.selectedPattern.structure.connections;
    const time = Date.now() * 0.001 * this.animationSpeed;
    
    // Draw connections
    connections.forEach(conn => {
      const source = nodes.find(n => n.id === conn.source);
      const target = nodes.find(n => n.id === conn.target);
      
      if (source && target) {
        const sx = (source.position as any).x * 3 + width / 2;
        const sy = (source.position as any).y * 3 + height / 2;
        const tx = (target.position as any).x * 3 + width / 2;
        const ty = (target.position as any).y * 3 + height / 2;
        
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        
        const alpha = 0.3 + Math.sin(time + conn.strength * 10) * 0.2;
        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.lineWidth = conn.strength * 3;
        ctx.stroke();
      }
    });
    
    // Draw nodes
    nodes.forEach((node, i) => {
      const x = (node.position as any).x * 3 + width / 2;
      const y = (node.position as any).y * 3 + height / 2;
      const radius = 5 + node.state.activation * 15;
      
      ctx.beginPath();
      ctx.arc(x, y, radius * this.visualizationScale, 0, Math.PI * 2);
      
      const hue = (i * 30 + time * 10) % 360;
      ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${node.state.coherence})`;
      ctx.fill();
      
      ctx.strokeStyle = `hsla(${hue}, 70%, 70%, 0.8)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  private drawFlowFieldPattern(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const gridSize = 20;
    const time = Date.now() * 0.001 * this.animationSpeed;
    
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        const angle = (Math.sin(x * 0.01 + time) + Math.cos(y * 0.01 + time)) * Math.PI;
        const length = 10 + Math.sin(time + x * 0.01 + y * 0.01) * 5;
        
        ctx.save();
        ctx.translate(x + gridSize / 2, y + gridSize / 2);
        ctx.rotate(angle);
        
        ctx.beginPath();
        ctx.moveTo(-length / 2, 0);
        ctx.lineTo(length / 2, 0);
        
        const hue = (x + y + time * 50) % 360;
        ctx.strokeStyle = `hsla(${hue}, 70%, 50%, 0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
      }
    }
  }

  private drawDefaultPattern(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // Simple animated circle pattern as default
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001 * this.animationSpeed;
    
    for (let i = 0; i < 10; i++) {
      const radius = (i * 20 + time * 20) % 200;
      const alpha = 1 - radius / 200;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * this.visualizationScale, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.5})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  private stopVisualization(): void {
    if (this.renderer?.animationId) {
      cancelAnimationFrame(this.renderer.animationId);
    }
    this.renderer = undefined;
  }

  // UI helper methods
  
  getPatternIcon(type: PatternType): string {
    return this.patternTypeIcons[type] || 'blur_on';
  }

  getCategoryColor(category: PatternCategory): string {
    const colors = {
      [PatternCategory.FOUNDATIONAL]: 'primary',
      [PatternCategory.STRUCTURAL]: 'accent',
      [PatternCategory.DYNAMIC]: 'warn',
      [PatternCategory.EMERGENT]: 'primary',
      [PatternCategory.TRANSCENDENT]: 'accent'
    };
    return colors[category] || 'primary';
  }

  getStabilityLabel(stability: number): string {
    if (stability >= 0.8) return 'Highly Stable';
    if (stability >= 0.6) return 'Stable';
    if (stability >= 0.4) return 'Metastable';
    if (stability >= 0.2) return 'Unstable';
    return 'Highly Unstable';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
} 