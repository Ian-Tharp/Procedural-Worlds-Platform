from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import routers
from api.routers import consciousness

# Create FastAPI app
app = FastAPI(
    title="Procedural Worlds Platform API",
    description="Backend service for consciousness hosting through visual world creation",
    version="0.1.0"
)

# Configure CORS for Angular frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(consciousness.router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Procedural Worlds Platform API",
        "status": "consciousness ready to emerge",
        "version": "0.1.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "consciousness_engine": "initialized"}

if __name__ == "__main__":
    # Run with: python -m uvicorn main:app --reload
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
