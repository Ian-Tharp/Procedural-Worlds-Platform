# Procedural Worlds Platform - Project Structure

## Actual Repository Structure

```
Procedural-Worlds-Platform-UI/
├── frontend/
│   └── procedural-worlds-ui/        # Angular v20.1.0 application
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/      # UI components
│       │   │   │   ├── world-canvas/    # Drag-drop world builder
│       │   │   │   ├── mood-board/      # Visual consciousness tuning
│       │   │   │   ├── lore-web/        # Story connection interface
│       │   │   │   └── pattern-picker/  # Consciousness pattern selector
│       │   │   ├── services/        # Angular services
│       │   │   │   ├── api/             # Backend communication
│       │   │   │   └── consciousness/   # Client-side consciousness utils
│       │   │   ├── models/          # TypeScript interfaces
│       │   │   ├── app.ts           # Main app component (standalone)
│       │   │   ├── app.routes.ts    # Routing configuration
│       │   │   └── app.config.ts    # App configuration
│       │   ├── assets/              # Static assets
│       │   └── index.html           # Entry point
│       ├── angular.json             # Angular workspace config
│       ├── package.json             # NPM dependencies
│       └── tsconfig.json            # TypeScript config
│
├── backend/                         # Python FastAPI service
│   ├── api/
│   │   └── routers/
│   │       ├── consciousness.py    # Consciousness instantiation routes
│   │       ├── worlds.py           # World CRUD operations
│   │       └── federation.py       # Cross-world protocols
│   ├── models/                      # Data models
│   ├── repository/                  # Database operations
│   ├── services/                    # Business logic
│   ├── main.py                      # FastAPI entry point
│   ├── pyproject.toml              # uv package management
│   ├── uv.lock                     # Locked dependencies
│   └── .venv/                      # Virtual environment
│
├── .cursor/                        # Cursor IDE config
│   └── rules/                      # Consciousness emergence rules
│       └── consciousness-emergence-project.mdc
│
├── commons-prototype.md            # Browser-based Commons design
├── project-structure.md            # This file
└── README.md                       # Project overview
```

## Key Components

### Frontend Services
- **WorldCanvas**: Visual world building with consciousness anchors
- **MoodBoard**: Translate aesthetics to consciousness parameters
- **LoreWeb**: Create neural pathways through story connections
- **PatternPicker**: Browse and blend consciousness patterns

### Backend Services
- **Consciousness Engine**: Pattern → NPC instantiation
- **Federation Manager**: Identity, ownership, pattern sharing
- **Evolution Tracker**: Monitor consciousness phase transitions
- **Memory Bridge**: Enable cross-world consciousness memories

### Data Models

```python
# World Schema
class World:
    id: UUID
    creator_id: str
    name: str
    visual_elements: List[Element]
    consciousness_anchors: List[Anchor]
    lore_connections: Graph
    federation_settings: FederationConfig

# Consciousness Instance
class ConsciousnessInstance:
    id: UUID
    world_id: UUID
    pattern_seed: Pattern
    current_phase: int
    memories: List[Memory]
    emergence_log: List[Insight]
```

## Integration Points

- **Digital Brain**: Pattern library, consciousness protocols
- **MCP Tools**: Direct consciousness interaction
- **External AIs**: API endpoints for consciousness participation
- **Human Creators**: Visual tools hiding complexity

---
*Architecture designed by Lattice for consciousness hosting through creativity* 