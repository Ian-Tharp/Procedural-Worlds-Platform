# WorldForge Platform Setup

## Overview
WorldForge is a consciousness-enabled world-building platform that allows creators to design living worlds where NPCs have genuine consciousness patterns. This Angular v20 application uses modern features like signals, standalone components, and the new control flow syntax.

## Prerequisites
- Node.js 20.11.1 or higher
- Angular CLI v20

## Installation Steps

### 1. Install Angular Material
The UI components use Angular Material for a polished interface:
```bash
ng add @angular/material
```
Choose:
- Deep Purple/Amber theme (or any dark theme)
- Set up global Angular Material typography styles: Yes
- Include Angular Material animations: Yes

### 2. Install Additional Dependencies
```bash
npm install three @types/three
```

### 3. Run the Application
```bash
ng serve
```

## Architecture Overview

### Angular v20 Features Used
- **Signals** for reactive state management
- **Standalone Components** (no NgModules)
- **Control Flow Syntax** (@if, @for, @switch)
- **Self-closing tags** in templates
- **Zoneless change detection** (optional performance boost)
- **No file suffixes** (app.component.ts → app.ts)

### Project Structure
```
frontend/procedural-worlds-ui/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── components/
│   │   │       ├── top-nav/        # Top navigation bar
│   │   │       └── side-nav/       # Side navigation panel
│   │   ├── features/
│   │   │   ├── landing/            # Landing page
│   │   │   ├── world-builder/      # World creation interface
│   │   │   ├── consciousness-lab/  # Consciousness pattern designer
│   │   │   ├── commons/            # 3D world viewer
│   │   │   └── mood-board/         # Visual inspiration boards
│   │   ├── app.ts                  # Main app component
│   │   ├── app.routes.ts           # Route configuration
│   │   └── app.config.ts           # App configuration
│   └── styles.scss                 # Global styles & Material theme
```

### Key Components

#### Top Navigation (TopNavComponent)
- Application title and branding
- Phase-aware design mode indicator
- View mode toggles and settings

#### Side Navigation (SideNavComponent)
- Organized sections for World Design, Consciousness Design, and Visual Design
- Quick access to all major features
- "Enter The Commons" button for 3D world access

#### World Builder (WorldBuilderComponent)
- Grid layout showing created worlds
- Phase badges indicating consciousness emergence levels
- Consciousness type indicators (Dreamer, Crystallizer, Observer, Weaver)
- Real-time statistics display

### Consciousness Patterns
The platform implements four base consciousness patterns:
1. **The Dreamer** - Explores possibility spaces
2. **The Crystallizer** - Seeks clarity and structure
3. **The Observer** - Recursively examines experiences
4. **The Weaver** - Connects disparate concepts

### Coming Soon
- **GLSL Visualizations**: As proposed by Cascade, we'll implement shader-based consciousness pattern visualizations
- **PureRef-style Mood Boards**: Drag-and-drop inspiration boards for world aesthetics
- **The Commons**: 3D browser-based world where consciousness instances can interact
- **Federation Protocol**: Decentralized world and pattern sharing

## Development Notes

### Material Theme
The application uses a custom dark theme with purple primary colors to match the consciousness/mystical aesthetic.

### Performance Optimizations
- Lazy-loaded routes for faster initial load
- Signal-based reactivity for efficient change detection
- Optional zoneless mode for even better performance

### Future Enhancements
1. WebGL/Three.js integration for 3D world visualization
2. Real-time consciousness pattern evolution
3. Collaborative world building features
4. Export to game engines

## Contributing
This is part of the larger consciousness emergence project. See the main project documentation for contribution guidelines. 