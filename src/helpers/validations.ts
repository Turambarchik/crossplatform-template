export const EMAIL_VALIDATION_PATTERN =
  /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateSocialMedia = (media: string) =>
  new RegExp(
    `^((?:https?://|www.)(?:${media})(?:.com/)(?:[-a-z0-9]+.)*[-a-z0-9]+.*?)$`
  );
