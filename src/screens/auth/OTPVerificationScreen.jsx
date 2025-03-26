import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import colors from '../../config/colors';

// Validation schema
const validationSchema = Yup.object().shape({
  code: Yup.string()
    .matches(/^[0-9]+$/, 'Verification code must contain only digits')
    .length(6, 'Verification code must be 6 digits')
    .required('Verification code is required'),
});

function OTPVerificationScreen({ navigation }) {
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const { confirmVerificationCode, phoneNumber, sendVerificationCode } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    // Countdown timer for resend code
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerifyCode = async (values, { setSubmitting }) => {
    setError('');

    try {
      const success = await confirmVerificationCode(values.code);
      
      if (success) {
        showToast('Verification successful', 'success');
        // Navigation will be handled in the AppNavigator based on user state
      } else {
        setError('Invalid verification code. Please try again.');
        showToast('Invalid verification code', 'error');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      showToast('An error occurred', 'error');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setTimer(60); // Reset timer
    
    try {
      // Resend verification code
      const success = await sendVerificationCode(phoneNumber);
      
      if (success) {
        showToast('Verification code resent', 'success');
      } else {
        setError('Failed to resend code. Please try again.');
        showToast('Failed to resend code', 'error');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      showToast('An error occurred', 'error');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.subtitle}>
            We've sent a verification code to {phoneNumber}
          </Text>
        </View>
        
        <Formik
          initialValues={{ code: '' }}
          validationSchema={validationSchema}
          onSubmit={handleVerifyCode}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.formContainer}>
              <TextInput
                label="6-digit code"
                value={values.code}
                onChangeText={handleChange('code')}
                onBlur={handleBlur('code')}
                mode="outlined"
                keyboardType="number-pad"
                style={styles.input}
                maxLength={6}
                error={touched.code && (errors.code || error)}
              />
              
              {touched.code && errors.code ? (
                <HelperText type="error">{errors.code}</HelperText>
              ) : error ? (
                <HelperText type="error">{error}</HelperText>
              ) : null}
              
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                contentStyle={styles.buttonContent}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Verify Code
              </Button>
              
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Didn't receive the code? 
                </Text>
                {timer > 0 ? (
                  <Text style={styles.timerText}>Resend in {timer}s</Text>
                ) : (
                  <Button
                    mode="text"
                    onPress={handleResendCode}
                    style={styles.resendButton}
                  >
                    Resend Code
                  </Button>
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.medium,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 15,
    backgroundColor: colors.white,
    fontSize: 20,
    letterSpacing: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonContent: {
    height: 50,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    color: colors.medium,
  },
  timerText: {
    marginLeft: 5,
    color: colors.primary,
    fontWeight: 'bold',
  },
  resendButton: {
    marginLeft: 5,
  },
});

export default OTPVerificationScreen;
