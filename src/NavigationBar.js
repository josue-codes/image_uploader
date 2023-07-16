import LanguageSelector from './LanguageSelector'

const NavigationBar = ({ language, languageHandler }) => {
    return (
        <div className="navigation-bar">
            <h2>{language.navigationBarHeaderText}</h2>
            <LanguageSelector languageHandler={languageHandler} />
        </div>
    );
}

export default NavigationBar;