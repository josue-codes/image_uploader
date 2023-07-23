import {english, spanish} from "./languages";

const language_handler = (set_language) => event => {
    if (event.target.checked) {
        set_language(spanish);
    } else {
        set_language(english);
    }
};

const input_text_handler = setter => event => {
    setter(event.target.value);
};

const login_handler = (
    party_code,
    user_name,
    set_access_token,
    set_token_retrieval_error
) => async event => {
    const url = 'http://localhost:3030/party';
    set_access_token(null);
    set_token_retrieval_error(null);

    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            party_code: party_code,
            user_name: user_name
        })
    })
        .then(response => {
            if (!response.ok) {
                throw response
            }
            return response.json();
        })
        .then(data => {
            set_access_token(data.access_token);
        })
        .catch(error => {
            try {
                error
                .json()
                .then(message => {
                    console.log(error);
                    set_token_retrieval_error(message.detail.toString());
                });    
            } catch (e) {
                console.log(error);
                set_token_retrieval_error(error.message);
            }
        });
};

export { language_handler, input_text_handler, login_handler };