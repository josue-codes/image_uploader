const LanguageSelector = ({ language_handler }) => {
    return (
        <div className="language-selector">
            <input type="checkbox" name="language" onChange={language_handler}/>
            <label htmlFor="language">Español?</label>
        </div>
    );
}

export default LanguageSelector;