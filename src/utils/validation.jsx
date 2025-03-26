import * as Yup from 'yup';

// Phone number validation schema
export const phoneSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(9, 'Phone number must be at least 9 digits')
    .max(12, 'Phone number must be at most 12 digits')
    .required('Phone number is required'),
});

// OTP validation schema
export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^[0-9]+$/, 'Verification code must contain only digits')
    .length(6, 'Verification code must be 6 digits')
    .required('Verification code is required'),
});

// User profile validation schema
export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .optional(),
});

// Driver profile validation schema (extends user profile)
export const driverProfileSchema = profileSchema.concat(
  Yup.object().shape({
    vehicleType: Yup.string()
      .required('Vehicle type is required'),
    licensePlate: Yup.string()
      .required('License plate is required'),
    drivingLicense: Yup.string()
      .required('Driving license is required'),
  })
);

// Affiliate profile validation schema (extends user profile)
export const affiliateProfileSchema = profileSchema.concat(
  Yup.object().shape({
    referralCode: Yup.string()
      .min(6, 'Referral code must be at least 6 characters')
      .required('Referral code is required'),
  })
);

// Format phone number to E.164 format (for Ethiopia)
export const formatPhoneNumber = (number) => {
  // Remove any non-digit characters
  const digits = number.replace(/\D/g, '');
  
  // Check if the number already has a country code
  if (digits.startsWith('251')) {
    return `+${digits}`;
  }
  
  // Add Ethiopian country code if the number starts with 0
  if (digits.startsWith('0')) {
    return `+251${digits.substring(1)}`;
  }
  
  // Otherwise, assume it's a local number and add the country code
  return `+251${digits}`;
};

// Validate phone number format
export const isValidPhoneNumber = (phoneNumber) => {
  try {
    phoneSchema.validateSync({ phoneNumber });
    return true;
  } catch (error) {
    return false;
  }
};

// Validate OTP format
export const isValidOTP = (otp) => {
  try {
    otpSchema.validateSync({ otp });
    return true;
  } catch (error) {
    return false;
  }
};
