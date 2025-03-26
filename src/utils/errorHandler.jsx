// Error codes for Firebase Authentication
const FIREBASE_AUTH_ERRORS = {
  'auth/invalid-phone-number': 'The phone number is not valid.',
  'auth/missing-phone-number': 'Please provide a phone number.',
  'auth/quota-exceeded': 'SMS quota exceeded. Please try again later.',
  'auth/user-disabled': 'This user account has been disabled.',
  'auth/invalid-verification-code': 'The verification code is invalid.',
  'auth/missing-verification-code': 'Please provide a verification code.',
  'auth/captcha-check-failed': 'reCAPTCHA verification failed. Please try again.',
  'auth/too-many-requests': 'Too many requests. Please try again later.',
};

// General error messages
const GENERAL_ERRORS = {
  'network-error': 'Network error. Please check your internet connection.',
  'server-error': 'Server error. Please try again later.',
  'unknown-error': 'An unknown error occurred. Please try again.',
};

/**
 * Handle Firebase authentication errors
 * @param {Error} error - The error object
 * @returns {string} - User-friendly error message
 */
export const handleAuthError = (error) => {
  if (error.code && FIREBASE_AUTH_ERRORS[error.code]) {
    return FIREBASE_AUTH_ERRORS[error.code];
  }
  
  if (error.message && error.message.includes('network')) {
    return GENERAL_ERRORS['network-error'];
  }
  
  console.error('Auth Error:', error);
  return GENERAL_ERRORS['unknown-error'];
};

/**
 * Handle API errors
 * @param {Error} error - The error object
 * @returns {string} - User-friendly error message
 */
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const status = error.response.status;
    
    if (status === 401) {
      return 'Authentication failed. Please login again.';
    } else if (status === 403) {
      return 'You do not have permission to perform this action.';
    } else if (status === 404) {
      return 'The requested resource was not found.';
    } else if (status >= 500) {
      return GENERAL_ERRORS['server-error'];
    }
  } else if (error.request) {
    // The request was made but no response was received
    return GENERAL_ERRORS['network-error'];
  }
  
  console.error('API Error:', error);
  return GENERAL_ERRORS['unknown-error'];
};

/**
 * Log errors to a monitoring service (placeholder)
 * @param {Error} error - The error object
 * @param {string} context - The context where the error occurred
 */
export const logError = (error, context = 'app') => {
  // In a real app, you would send this to a monitoring service like Sentry
  console.error(`[${context}] Error:`, error);
};
