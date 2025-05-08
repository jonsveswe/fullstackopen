import { View, Text, Pressable, TextInput } from 'react-native'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../graphql/mutations";

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().min(2, 'Owner name must be at least 2 characters long').required('Owner name is required'),
  repositoryName: yup.string().min(2, 'Repository name must be at least 2 characters long').required('Repositry name is required'),
  rating: yup.number().min(0, 'Rating must be greater or equal to 0').max(100, 'Rating must be less or equal to 100').required('Rating is required'),
  text: yup.string().optional(),
})
const AddReviewForm = () => {
  const navigate = useNavigate();
  const [addReview] = useMutation(ADD_REVIEW);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      console.log('values: ', values);
      const { ownerName, repositoryName, rating, text } = values;
      try {
        const { data } = await addReview({ variables: { ownerName, repositoryName, rating: Number(rating), text } });
        console.log('data: ', data);
        navigate(`/repositories/${data.createReview.repositoryId}`);
      } catch (e) {
        console.log(e);
      }
    }
  });
  return (
    <View>
      <TextInput
        style={formik.errors.ownerName && { borderWidth: 1, borderColor: 'red' }}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.errors.ownerName && (
        <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={formik.errors.repositoryName && { borderWidth: 1, borderColor: 'red' }}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.errors.repositoryName && (
        <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={formik.errors.rating && { borderWidth: 1, borderColor: 'red' }}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.errors.rating && (
        <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={formik.errors.text && { borderWidth: 1, borderColor: 'red' }}
        placeholder="Review text"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        multiline={true}
      />
      {formik.errors.text && (
        <Text style={{ color: 'red' }}>{formik.errors.text}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  )
}

export default AddReviewForm