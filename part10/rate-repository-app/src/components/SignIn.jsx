import { View, TextInput, Pressable } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(2, 'Username must be at least 2 characters long').required('Username is required'),
  password: yup.string().min(2, 'Password must be at least 2 characters long').required('Password is required'),
});

// To enable easy testing, we extract the components "pure" code into another component, such as the SignInContainer component.
// Now, the SignIn component contains only the side effects and its implementation is quite simple. We can easier test the SignInContainer component.
export const SignInContainer = ({ onSubmit }) => {
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
}
const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const onSubmit = async (values) => {
    console.log('submit', values);
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });

      console.log('data: ', data);

      console.log('token from storage: ', await authStorage.getAccessToken());

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;