from json.decoder import JSONDecodeError

from fastapi import FastAPI, Request, HTTPException
from fastapi import status
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/party')
async def root(request: Request):
    try:
        data = await request.json()
    except JSONDecodeError:
        return {'message': 'Bad JSON'}
    if data.get('party_code') == 'hello':
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect Party Code',
        )
    return {
        'message': data,
        'access_token': '123'
    }


if __name__ == '__main__':
    pass
