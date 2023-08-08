import { useNavigate } from "react-router-dom";


export default function Home({
    language,
    party_code,
    party_code_handler,
    user_name,
    user_name_handler,
    error_message,
    token_retrieval_error_setter
}) {
    const navigate = useNavigate();

    const login_handler = (
        party_code,
        user_name,
        set_token_retrieval_error
    ) => async event => {
        event.preventDefault();
        const url = '/api/party';
        set_token_retrieval_error(null);

        const formData = new URLSearchParams();
        formData.append('party_code', party_code);
        formData.append('user_name', user_name);

        await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(() => {
                navigate("/party");
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

    return (
        <div className="home-page">
            <div className="header">
                <h1>Andrea Soul Photography</h1>
                <h2>Mobile Photo Share</h2>
            </div>
            <div className="content">
                <form onSubmit={
                    login_handler(
                        party_code,
                        user_name,
                        token_retrieval_error_setter
                    )
                }>
                    <h3>{ language.home_party_code }</h3>
                    <input
                        type="text"
                        value={ party_code }
                        onChange={ party_code_handler }
                    />
                    <h3>{ language.home_your_name }</h3>
                    <input
                        type="text"
                        value={ user_name }
                        onChange={ user_name_handler }
                    />
                    <button
                        className="button"
                        type="submit"
                    >{ language.home_join_the_party }</button>
                </form>
                { error_message && <div className="error-message">{error_message}</div> }
            </div>
        </div>
    )
};