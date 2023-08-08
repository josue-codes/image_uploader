from datetime import timedelta, datetime
from dataclasses import dataclass
from typing import TypedDict

from mongoengine import connect, Document, StringField
from fastapi import HTTPException, status, Request, Form
from jose import JWTError, jwt
from passlib.context import CryptContext

from config import APP_CONFIG


crypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

details_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail='Party Code or Name not provided or request is malformed.',
    headers={'WWW-Authenticate': 'Bearer'},
)

party_exists_exception = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='Party does not exist.',
    headers={'WWW-Authenticate': 'Bearer'},
)


connect(
    db=APP_CONFIG.mongo_db_name,
    username=APP_CONFIG.mongo_db_username,
    password=APP_CONFIG.mongo_db_password,
    host=f'{APP_CONFIG.mongo_db_scheme}{APP_CONFIG.mongo_db_host}'
)


class Party(Document):
    party_code = StringField(required=True)

    def dict(self) -> dict:
        return {'party_code': self.party_code}


@dataclass
class PartyParticipant:
    party: Party
    user: str

    @property
    def dict(self) -> dict:
        return {
            'party_code': self.party.party_code,
            'user_name': self.user
        }


# class TokenData(BaseModel):
#     party_code: str
#     user_name: str
#     expiration: datetime


class Authentication(TypedDict):
    access_token: str
    party_code: str
    user_name: str


def authenticate_party(
        party_code: str = Form(...),
        user_name: str = Form(...)
) -> Authentication:
    if party_code == '' or user_name == '':
        raise details_exception
    party = _get_party(party_code)
    if party and user_name:
        return {
            'access_token': create_access_token(PartyParticipant(party, user_name).dict),
            'party_code': party_code,
            'user_name': user_name
        }
    raise party_exists_exception


def create_access_token(
        data: dict,
        expires_delta: timedelta | None = None
) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(
        to_encode,
        APP_CONFIG.secret_key,
        algorithm=APP_CONFIG.secret_algorithm
    )
    return encoded_jwt


def authenticate_party_with_access_token(
        request: Request
) -> dict:
    access_token = _get_access_token_from_cookies(request)
    payload = _decode_access_token(access_token)
    return payload


def _get_access_token_from_cookies(request: Request) -> str:
    token = request.cookies.get('access_token')
    if not token:
        raise details_exception

    scheme, access_token = token.split()
    if scheme.lower() != 'bearer':
        raise details_exception

    return access_token


def _decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token=token,
            key=APP_CONFIG.secret_key,
            algorithms=[APP_CONFIG.secret_algorithm]
        )
    except JWTError:
        raise details_exception

    return payload


def _get_party(party_code: str | None):
    if party_code is None:
        raise details_exception

    party = Party.objects(party_code=party_code).first()
    if party is None:
        raise party_exists_exception

    return party


if __name__ == '__main__':  # pragma: no cover
    pass
