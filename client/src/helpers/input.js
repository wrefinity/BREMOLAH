export const qntyIncrement = (e, setHook, hookObject, value) => {
  const { name } = e.target;
  setHook({ ...hookObject, [name]: value + 1 });
};

export const qntyDecrement = (e, setHook, hookObject, value) => {
  const { name } = e.target;
  if (value > 0) setHook({ ...hookObject, [name]: value - 1 });
};

export const handleInput = (e, setHook) => {
  const { name, value } = e.target;
  setHook((prev) => ({
    ...prev,
    [name]: value,
  }));
};
export const handleInputImage = (e, setHook) => {
  setHook((prev) => ({
    ...prev,
    image: e.target.files[0],
  }));
};

export const truncate = (description, num) => {
  if (description.length > num) {
    let subStr = description.substring(0, num);
    return subStr + "...";
  } else {
    return description;
  }
};

export const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (values.hasOwnProperty("fullname") && !values.fullname) {
    errors.fullname = "fullname required";
  }

  if (!values.password) {
    errors.password = "password required";
  } else if (values.password.length < 6) {
    errors.password = "password length must exceed 6 character";
  }
  if (values.hasOwnProperty("confirmPassword") && !values.confirmPassword) {
    errors.confirmPassword = "password required";
  } else if (
    values.hasOwnProperty("confirmPassword") &&
    values.confirmPassword.length < 6
  ) {
    errors.confirmPassword = "password length must exceed 6 character";
  } else if (
    values.hasOwnProperty("confirmPassword") &&
    values.confirmPassword !== values.password
  ) {
    errors.confirmPassword = "password not match";
  }

  if (values.hasOwnProperty("image") && values.image === null) {
    errors.image = "image required";
  }

  if (!values.email) {
    errors.email = "email required";
  } else if (!regex.test(values.email)) {
    errors.email = "invalid email address";
  }

  return errors;
};

export const validateEmpty = (values) => {
  const errors = {};
  for (let x in values) {
    if (values[x] === "") {
      errors.all = "All fields required";
      break;
    }
  }
  return errors;
};

export const loaderColor = "#dc3545";
export const loaderSize = "120";
