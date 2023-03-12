
// To validate that emails fields are non empty
export const emailValidator = (value) => {
  const re = /\S+@\S+\.\S+/;

  if (!value || value.length <= 0) return 'Email cannot be empty.';
  if (!re.test(value)) return 'Provide valid email address';

  return '';
};

// To validate that password fields are non empty
export const passwordValidator = (value) => {
  if (!value || value.length <= 0) return 'Password cannot be empty.';

  return '';
};

// To validate that name fields are non empty
export const nameValidator = (value) => {
  if (!value || value.length <= 0) return 'Name cannot be empty.';

  return '';
};

// To validate that confirm fields are non empty
export const passConfirmValidator = (value) => {
  if (!value || value.length <= 0) return 'Confirm password cannot be empty.';

  return '';
};

// To validate that password and confirm password is matching with each other
export const passMatchValidator = (xValue, yValue) => {
  if (xValue !== '' && yValue !== '' && xValue !== yValue) return 'Password mismatch';
  return '';
};
