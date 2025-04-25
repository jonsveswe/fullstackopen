import { View, TextInput, Pressable } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(2, 'Username must be at least 2 characters long').required('Username is required'),
  password: yup.string().min(2, 'Password must be at least 2 characters long').required('Password is required'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log('submit', values);
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
      <TextInput
        style={formik.errors.username && { borderWidth: 1, borderColor: 'red' }}
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={formik.errors.password && { borderWidth: 1, borderColor: 'red' }}
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;