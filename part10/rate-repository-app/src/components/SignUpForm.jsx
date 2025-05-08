import { View, Text, Pressable, TextInput } from 'react-native'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(5, 'Username must be at least 5 characters long').max(30, 'Username must be at most 30 characters long').required('Username is required'),
  password: yup.string().min(5, 'Password must be at least 5 characters long').max(50, 'Password must be at most 50 characters long').required('Password is required'),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required'),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const [createUser, result] = useMutation(CREATE_USER); // result: { data, loading, error }
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data1 } = await createUser({ variables: { username, password } });

      const { data } = await signIn({ username, password });
      console.log('data: ', data);
      console.log('token from storage: ', await authStorage.getAccessToken());
      navigate('/');
    } catch (e) {
      console.log(e);
    }
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
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={formik.errors.password && { borderWidth: 1, borderColor: 'red' }}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={formik.errors.passwordConfirm && { borderWidth: 1, borderColor: 'red' }}
        placeholder="Password confirm"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
      />
      {formik.errors.passwordConfirm && (
        <Text style={{ color: 'red' }}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;  
