from fastapi import APIRouter
from pydantic import BaseModel
import math

router = APIRouter()

class ScalarForceInput(BaseModel):
    q: float
    v: float
    B: float
    phi: float

@router.post("/calculate-scalar-force")
def calc_scalar_force(data: ScalarForceInput):
    q = abs(data.q)
    v = data.v
    B = data.B
    phi_rad = math.radians(data.phi)
    F = q * v * B * math.sin(phi_rad)
    return {"F": F}
