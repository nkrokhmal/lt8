from app.imports.external import *


class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    email: EmailStr
    password: str


class UserUpdate(UserBase):
    password: Optional[str] = None


class UserDelete(BaseModel):
    email: Optional[EmailStr] = None


class User(UserBase):
    id: Optional[int] = None
