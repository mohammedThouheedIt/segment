const validateField = (
  name,
  value,
  confirmPassword = null,
  oldPassword = null
) => {
  switch (name) {
    case "firstName":
      if (!value) {
        return "First name is required";
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        return "First name can only contain letters";
      } else if (value.trim().length < 3) {
        return "First name must be at least 3 characters";
      } else if (value.trim().length > 50) {
        return "First name must be at most 50 characters";
      }
      break;
    case "lastName":
      if (!value) {
        return "Last name is required";
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        return "Last name can only contain letters";
      } else if (value.trim().length < 3) {
        return "Last name must be at least 3 characters";
      } else if (value.trim().length > 50) {
        return "Last name must be at most 50 characters";
      }
      break;
    case "email":
    case "spoke_email":
      if (!value) {
        return "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        return "Invalid email address";
      } else if (value.trim().length < 5) {
        return "Email must be at least 3 characters";
      } else if (value.trim().length > 50) {
        return "Email must be at most 50 characters";
      }
      break;
    case "password":
    case "olDPassword":
      if (!value) {
        return "Password is required";
      }
      break;
    case "oldPassword":
      if (!value) {
        return "Password is required";
      } else if (value.trim().length < 8 || value.trim().length > 20) {
        return "Password must be between 8 and 20 characters";
      } else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/.test(value)) {
        return "Password must contain at least one letter, one number, and one special character (!@#$%^&*)";
      }
      break;
    case "newPassword":
      if (!value) {
        return "New password is required";
      } else if (value === oldPassword) {
        return "New password must not be the same as the old password";
      } else if (value.trim().length < 8 || value.trim().length > 20) {
        return "New password must be between 8 and 20 characters";
      } else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/.test(value)) {
        return "New password must contain at least one letter, one number, and one special character (!@#$%^&*)";
      }
      break;
    case "confirmPassword":
    case "confirmNewPassword":
      if (!value) {
        return "Confirm New password is required";
      } else if (value !== confirmPassword) {
        return "New Password do not match";
      }
      break;
    case "userType":
      if (!value) {
        return "User type is required";
      } else if (typeof value !== "number") {
        return "User type must be a number";
      }
      break;
    case "userRoleName":
      if (!value) {
        return "User role name is required";
      } else if (!value?.trim()) {
        return "User role name can't start from space";
      } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        return "User role name must be contain alphanumeric";
      }

      break;
    case "userName":
      if (!value) {
        return "User name is required";
      } else if (
        !/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/|\-]*$/.test(value)
      ) {
        return "User name must be contain Alphanumeric with Special Characters";
      }
      break;
    case "segment":
      if (!value) {
        return "User role name is required";
      }
      break;

    default:
      break;
  }

  return "";
};

export default validateField;

