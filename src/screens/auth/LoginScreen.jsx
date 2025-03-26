import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../config/firebase';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import colors from '../../config/colors';
import { formatPhoneNumber } from '../../utils/validation';

// Validation schema
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(9, 'Phone number must be at least 9 digits')
    .max(12, 'Phone number must be at most 12 digits')
    .required('Phone number is required'),
});

function LoginScreen({ navigation }) {
  const [error, setError] = useState('');
  const recaptchaVerifier = useRef(null);
  const { sendVerificationCode } = useAuth();
  const { showToast } = useToast();

  const handleSendCode = async (values, { setSubmitting }) => {
    setError('');

    // Format phone number to E.164 format
    const formattedPhoneNumber = formatPhoneNumber(values.phoneNumber);
    
    try {
      const success = await sendVerificationCode(
        formattedPhoneNumber,
        recaptchaVerifier.current
      );
      
      if (success) {
        showToast('Verification code sent successfully', 'success');
        navigation.navigate('OTPVerification');
      } else {
        setError('Failed to send verification code. Please try again.');
        showToast('Failed to send verification code', 'error');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      showToast('An error occurred', 'error');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={auth.app.options}
          attemptInvisibleVerification={true}
        />
        
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Login with Phone</Text>
          <Text style={styles.subtitle}>
            We'll send you a verification code to confirm your phone number
          </Text>
        </View>
        
        <Formik
          initialValues={{ phoneNumber: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSendCode}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.formContainer}>
              <TextInput
                label="Phone Number"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                mode="outlined"
                keyboardType="phone-pad"
                style={styles.input}
                placeholder="e.g., 0911234567"
                left={<TextInput.Affix text="+251" />}
                error={touched.phoneNumber && (errors.phoneNumber || error)}
              />
              
              {touched.phoneNumber && errors.phoneNumber ? (
                <HelperText type="error">{errors.phoneNumber}</HelperText>
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
                Send Verification Code
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
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
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonContent: {
    height: 50,
  },
});

export default LoginScreen;
