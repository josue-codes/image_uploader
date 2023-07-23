from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi import status
from fastapi.middleware.cors import CORSMiddleware

from auth import (
    authenticate_party,
    create_access_token,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/party', response_model=None)
async def root(request: Request):
    data = await request.json()
    party_code = data.get('party_code')
    user_name = data.get('user_name')
    party = authenticate_party(party_code, user_name)
    access_token = create_access_token(party.dict)
    return JSONResponse(
        content={
            'message': "Let's get ready to Party!!!",
            'access_token': access_token,
        },
        headers={'Authentication': f'Bearer {access_token}'},
        status_code=status.HTTP_200_OK
    )


if __name__ == '__main__':
    pass
