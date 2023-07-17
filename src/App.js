import { useState } from "react";

import './App.css';

import Home from "./Home";
import LanguageSelector from "./LanguageSelector";
import { english } from "./languages";
import { login_handler, input_text_handler,  language_handler } from "./event_handlers";

function App() {

    const [language, set_language] = useState(english);
    const [party_code, set_party_code] = useState("");
    const [user_name, set_user_name] = useState("");
    const [access_token, set_access_token] = useState(null);
    const [token_retrieval_error, set_token_retrieval_error] = useState(false);

    return (
        <div className="App">
            <Home
                language={ language }
                party_code={ party_code }
                party_code_handler={ input_text_handler(set_party_code) }
                user_name={ user_name }
                user_name_handler={ input_text_handler(set_user_name) }
                login_handler={ login_handler(
                    party_code,
                    user_name,
                    set_access_token,
                    set_token_retrieval_error
                ) }
            />
            { token_retrieval_error && <div>{token_retrieval_error}</div> }
            {/*<NavigationBar language={language} languageHandler={language_handler}/>*/}
            {/*<FileUpload language={language} />*/}
            <LanguageSelector language_handler={language_handler(set_language)}/>
        </div>
    );
}

export default App;
