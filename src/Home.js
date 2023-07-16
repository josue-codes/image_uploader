import {useState} from "react";

export default function Home({
    language,
    party_code,
    party_code_handler,
    user_name,
    user_name_handler,
    login_handler
}) {
    return (
        <div className="home-page">
            <div className="header">
                <h1>Andrea Soul Photography</h1>
                <h2>Mobile Photo Share</h2>
            </div>
            <div className="content">
                <h3>{ language.home_party_code }</h3>
                <input
                    type="text"
                    value={ party_code }
                    onChange={ party_code_handler }
                />
                <h3>{ language.home_your_name }</h3>
                <input
                    type="text"
                    value={user_name}
                    onChange={user_name_handler}
                />
                <div
                    className="button"
                    onClick={ login_handler }
                >{ language.home_join_the_party }</div>
            </div>
        </div>
    )
};