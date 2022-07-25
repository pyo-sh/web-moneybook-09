import { div, input, label } from "@core/CreateDom";

const FormInput = ({
    ref,
    validate,
    format = (value) => value,
    key,
    placeholder,
    labelText,
    maxlength = 150,
}) => {
    const setInputValue = ({ currentTarget }) => {
        ref[key] = format(currentTarget.value);
        currentTarget.value = ref[key];
        currentTarget.dispatchEvent(new Event("validate", { bubbles: true }));
    };

    return div({ class: "inputBox" })(
        div({ class: `inputItem ${key}` })(
            label({ class: "text_bold_small label" })(labelText),
            input({
                maxlength,
                class: "text_body_regular",
                placeholder: placeholder,
                value: format(ref[key]) || "",
                event: {
                    input: setInputValue,
                },
            })(),
        ),
    );
};

export default FormInput;
