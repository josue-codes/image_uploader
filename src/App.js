import { useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import './App.css';

import Home from "./Home";
import LanguageSelector from "./LanguageSelector";
import Party from "./Party"
import { english } from "./languages";
import { input_text_handler,  language_handler } from "./event_handlers";

function App() {

    const [language, set_language] = useState(english);
    const [party_code, set_party_code] = useState("");
    const [user_name, set_user_name] = useState("");
    const [token_retrieval_error, set_token_retrieval_error] = useState(false);

    const router = createBrowserRouter(
        createRoutesFromElements([
            <Route
                path='/'
                element={
                    <Home
                        language={ language }
                        party_code={ party_code }
                        party_code_handler={ input_text_handler(set_party_code) }
                        user_name={ user_name }
                        user_name_handler={ input_text_handler(set_user_name) }
                        error_message={ token_retrieval_error }
                        token_retrieval_error_setter={ set_token_retrieval_error }
                    />
                }
            />,
            <Route
                path='/party'
                element={ <Party /> }
                loader={() => {
                    return ['hi', 'hellow', 'how', 'are', 'you', 'today'];
                }}
            />
        ])
    );

    return (
        <div className="App">
            <RouterProvider router={ router }/>
            <LanguageSelector language_handler={language_handler(set_language)}/>
        </div>
    );
}

export default App;
