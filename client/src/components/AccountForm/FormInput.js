import { div, input, label } from "@core/CreateDom";

const FormInput = ({ ref, validate, format, key, placeholder, labelText, maxlength = 150 }) => {
    const setInputValue = ({ currentTarget }) => {
        ref[key] = currentTarget.value;
        console.log(currentTarget.value);
    };

    return div({ class: "inputBox" })(
        div({ class: `inputItem ${key}` })(
            label({ class: "text_bold_small label" })(labelText),
            input({
                maxlength,
                class: "text_body_regular",
                placeholder: placeholder,
                value: ref[key] || "",
                event: {
                    input: setInputValue,
                },
            })(),
        ),
    );
};

export default FormInput;
