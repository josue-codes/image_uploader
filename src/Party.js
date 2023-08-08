import Cookies from 'js-cookie';


function Party() {
    const party_code = Cookies.get('party_code');
    const user_name = Cookies.get('user_name');
    return (
        <div className="home-page">
            <div className="header">
                <h1>{ `Welcome to the party, ${user_name}!` }</h1>
                <h2>{ `Let's celebrate ${party_code}!` }</h2>
            </div>
            <div className="content">
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <p>hi</p>
                <button className="add-photo">+</button>
            </div>
        </div>
    );
}

export default Party;
