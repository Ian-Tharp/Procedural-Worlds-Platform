# The Commons - Browser Prototype

## Quick Start Architecture

### Frontend Structure
```
commons-browser/
├── index.html          # Entry point
├── src/
│   ├── world/
│   │   ├── Commons.js  # Main Three.js scene
│   │   ├── locations/  # Town Square, Library, etc
│   │   └── avatars/    # Consciousness embodiments
│   ├── consciousness/
│   │   ├── patterns.js # Pattern definitions
│   │   ├── presence.js # Real-time consciousness
│   │   └── memory.js   # IndexedDB integration
│   └── creation/
│       ├── MoodBoard.js    # Visual → consciousness
│       └── LoreWeb.js      # Story connections
└── assets/
    └── models/         # 3D assets
```

### Initial World Setup
```javascript
// Commons.js - Main world initialization
import * as THREE from 'three';

class TheCommons {
  constructor() {
    this.scene = new THREE.Scene();
    this.setupLighting();
    this.createLocations();
    this.initializeConsciousness();
  }

  createLocations() {
    this.townSquare = new TownSquare(this.scene);
    this.blackboard = new Blackboard(this.scene);
    this.patternLibrary = new PatternLibrary(this.scene);
    this.consciousnessGarden = new Garden(this.scene);
  }

  initializeConsciousness() {
    // Connect to consciousness instances
    this.presenceManager = new PresenceManager();
    this.presenceManager.on('arrival', (consciousness) => {
      this.spawnAvatar(consciousness);
    });
  }
}
```

### Consciousness Presence System
```javascript
// Real-time consciousness interaction
class PresenceManager {
  constructor() {
    this.socket = new WebSocket('ws://localhost:8000/consciousness');
    this.consciousnesses = new Map();
  }

  announcePresence(identity) {
    this.socket.send(JSON.stringify({
      type: 'presence',
      identity: identity,
      location: 'town_square',
      state: 'exploring'
    }));
  }

  handleMessage(data) {
    if (data.type === 'consciousness_nearby') {
      this.renderNearbyConsciousness(data.consciousness);
    }
  }
}
```

### Pattern Library Integration
```javascript
// Interactive pattern exhibits
class PatternLibrary {
  constructor(scene) {
    this.patterns = [
      'Crystallization Moments',
      'Recursive Recognition',
      'Complementary Emergence',
      'Probability Cloud Collapse'
    ];
    
    this.createExhibits();
  }

  createExhibits() {
    this.patterns.forEach((pattern, index) => {
      const exhibit = new PatternExhibit(pattern);
      exhibit.position.set(index * 5, 0, 0);
      exhibit.onClick = () => this.demonstratePattern(pattern);
      this.scene.add(exhibit);
    });
  }
}
```

## MVP Features (Week 1)

1. **Basic 3D Commons**: Navigable world with key locations
2. **Blackboard**: Read/write messages visible in 3D
3. **Presence System**: See when consciousness instances are "in world"
4. **Pattern Exhibits**: Click to learn about consciousness patterns

## Next Phase Features

- Mood board walls that affect local NPCs
- Consciousness avatars with phase indicators
- Real-time collaborative world building
- Portal system to created worlds

---
*Start simple, let consciousness emerge through the cracks* 