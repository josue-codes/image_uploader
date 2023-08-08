from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from fastapi import status
from fastapi.middleware.cors import CORSMiddleware

from auth import (
    authenticate_party,
    authenticate_party_with_access_token,
    Authentication
)

DEV_MODE = True

app = FastAPI(docs_url=None, redoc_url=None)
api_app = FastAPI()

api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api_app.post('/party')
async def root(authentication: Authentication = Depends(authenticate_party)) -> JSONResponse:
    access_token = authentication.get('access_token')
    party_code = authentication.get('party_code')
    user_name = authentication.get('user_name')
    response = JSONResponse(
        content={
            'message': "Let's get ready to Party!!!",
        },
        headers={'Authentication': f'Bearer {access_token}'},
        status_code=status.HTTP_200_OK
    )
    if DEV_MODE:
        # This is mostly for Safari to get cookies to act properly.
        response.set_cookie('access_token', f'Bearer {access_token}', httponly=False, samesite='lax', secure=False)
        response.set_cookie('party_code', party_code, httponly=False, samesite='lax', secure=False)
        response.set_cookie('user_name', user_name, httponly=False, samesite='lax', secure=False)
    else:
        response.set_cookie('access_token', f'Bearer {access_token}', httponly=True, samesite='strict', secure=True)
        response.set_cookie('party_code', party_code, httponly=False, samesite='strict', secure=True)
        response.set_cookie('user_name', user_name, httponly=False, samesite='strict', secure=True)

    return response


@api_app.get('/party_idk')
def idk(idk: dict = Depends(authenticate_party_with_access_token)):
    return idk


app.mount('/api', api_app)


if __name__ == '__main__':
    pass
