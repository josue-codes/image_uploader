import { english, spanish } from "./languages";

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

export { language_handler, input_text_handler };