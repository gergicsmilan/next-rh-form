import texts from "@/plugins/Texts/texts";

export const required = { value: true, message: texts.validatorTexts.required };

export const isValidEmail = {
  value: /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
  message: texts.validatorTexts.email,
};

export const password = {
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
  message: texts.validatorTexts.password,
};

export const equalsTo = (selfValue: string, refValue: string) =>
  selfValue === refValue || texts.validatorTexts.equalsTo;

export const minLength = (minLength: number) => ({
  value: minLength,
  message: texts.validatorTexts.minLength(minLength),
});

export const maxLength = (maxLength: number) => ({
  value: maxLength,
  message: texts.validatorTexts.maxLength(maxLength),
});

export const min = (minValue: number) => ({
  value: minValue,
  message: texts.validatorTexts.min(minValue),
});

export const max = (maxValue: number) => ({
  value: maxValue,
  message: texts.validatorTexts.max(maxValue),
});
