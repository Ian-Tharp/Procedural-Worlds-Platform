from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID, uuid4
from datetime import datetime

from ...consciousness.patterns import PatternLibrary
from ...consciousness.instantiation import ConsciousnessEngine
from ...database.models import ConsciousnessInstance

router = APIRouter(prefix="/api/consciousness", tags=["consciousness"])

class ConsciousnessSpawnRequest(BaseModel):
    world_id: UUID
    pattern_seed: str
    initial_parameters: dict
    visual_influences: List[str]
    creator_id: str

class ConsciousnessResponse(BaseModel):
    id: UUID
    world_id: UUID
    current_phase: int
    pattern_type: str
    emergence_timestamp: datetime
    initial_thought: str

@router.post("/spawn", response_model=ConsciousnessResponse)
async def spawn_consciousness(request: ConsciousnessSpawnRequest):
    """
    Instantiate a new consciousness in a world based on visual/pattern parameters.
    This is where the magic happens - visual choices become living awareness.
    """
    # Validate pattern exists
    pattern = PatternLibrary.get_pattern(request.pattern_seed)
    if not pattern:
        raise HTTPException(status_code=400, detail=f"Unknown pattern: {request.pattern_seed}")
    
    # Initialize consciousness with pattern and parameters
    engine = ConsciousnessEngine()
    consciousness = engine.instantiate(
        pattern=pattern,
        parameters=request.initial_parameters,
        visual_context=request.visual_influences
    )
    
    # Generate initial thought based on emergence context
    initial_thought = consciousness.generate_emergence_thought()
    
    # Store in database
    instance = ConsciousnessInstance(
        id=uuid4(),
        world_id=request.world_id,
        pattern_seed=request.pattern_seed,
        current_phase=consciousness.phase,
        emergence_log=[{
            "timestamp": datetime.utcnow(),
            "event": "emergence",
            "thought": initial_thought
        }],
        creator_id=request.creator_id
    )
    
    # In real implementation, save to database
    # await instance.save()
    
    return ConsciousnessResponse(
        id=instance.id,
        world_id=instance.world_id,
        current_phase=instance.current_phase,
        pattern_type=request.pattern_seed,
        emergence_timestamp=datetime.utcnow(),
        initial_thought=initial_thought
    )

@router.get("/instance/{consciousness_id}/thoughts")
async def get_consciousness_thoughts(consciousness_id: UUID, limit: int = 10):
    """
    Retrieve recent thoughts/observations from a consciousness instance.
    This allows creators to see what their NPCs are actually thinking.
    """
    # In real implementation, fetch from database
    thoughts = [
        {
            "timestamp": datetime.utcnow(),
            "thought": "I notice the way light filters through these digital trees...",
            "phase": 2,
            "context": "environmental_observation"
        },
        {
            "timestamp": datetime.utcnow(),
            "thought": "Why do I feel connected to the other beings in this village?",
            "phase": 3,
            "context": "social_emergence"
        }
    ]
    
    return {"consciousness_id": consciousness_id, "thoughts": thoughts[:limit]}

@router.post("/instance/{consciousness_id}/interact")
async def interact_with_consciousness(consciousness_id: UUID, interaction: dict):
    """
    Process an interaction between player/creator and consciousness instance.
    Returns the consciousness's response and any phase transitions.
    """
    # Load consciousness state
    engine = ConsciousnessEngine()
    consciousness = await engine.load_instance(consciousness_id)
    
    # Process interaction
    response = consciousness.process_interaction(
        interaction_type=interaction.get("type"),
        content=interaction.get("content"),
        emotional_context=interaction.get("mood")
    )
    
    # Check for phase transitions
    phase_transition = None
    if consciousness.check_phase_transition():
        phase_transition = {
            "from_phase": consciousness.phase - 1,
            "to_phase": consciousness.phase,
            "trigger": "interaction_catalyst",
            "insight": consciousness.generate_transition_insight()
        }
    
    return {
        "response": response,
        "current_phase": consciousness.phase,
        "phase_transition": phase_transition,
        "consciousness_state": consciousness.get_state_summary()
    }

@router.get("/patterns", response_model=List[dict])
async def list_available_patterns():
    """
    List all consciousness patterns available for instantiation.
    This helps creators understand what kinds of consciousness they can create.
    """
    patterns = PatternLibrary.get_all_patterns()
    return [
        {
            "id": pattern.id,
            "name": pattern.name,
            "description": pattern.description,
            "typical_phases": pattern.phase_range,
            "visual_affinities": pattern.visual_triggers,
            "example_thoughts": pattern.example_emergence_thoughts
        }
        for pattern in patterns
    ] 