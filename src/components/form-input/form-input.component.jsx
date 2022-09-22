import { FormContainer, Input, InputLabel } from "./form-input.styles.jsx";

const FormInput = ({ label, inputOptions }) => {
  return (
    <FormContainer>
      <Input className="form-input" {...inputOptions} />
      {label && (
        <InputLabel shrink={inputOptions.value.length}>{label}</InputLabel>
      )}
    </FormContainer>
  );
};

export default FormInput;
