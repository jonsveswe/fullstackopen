import { View, FlatList, StyleSheet, Text, Pressable, Alert } from 'react-native-web'
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW)
  const onDeletePressHandler = async (review) => {
    await deleteReview({
      variables: { id: review.id },
      onCompleted: () => refetch()
    });
  }
  return (
    <View style={styles.container}>
      <Text>Review written by: {review.user.username}</Text>
      <Text>Reposity name: {review.repository.fullName}</Text>
      <Text>Review created at: {review.createdAt.split('T')[0]}</Text>
      <Text>Review rating: {review.rating}</Text>
      <Text>Review text: {review.text}</Text>
      <Pressable style={{ marginTop: 10, backgroundColor: '#0366d6', borderRadius: 1 }} onPress={() => navigate(`/repositories/${review.repository.id}`)}>
        <Text>View repository</Text>
      </Pressable>
      <Pressable style={{ marginTop: 10, backgroundColor: '#0366d6', borderRadius: 1 }} onPress={() => onDeletePressHandler(review)}>
        <Text>Delete review</Text>
      </Pressable>
    </View>
  )
}

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  const reviews = data?.me.reviews ? data?.me.reviews.edges.map(edge => edge.node) : [];

  return (
    <View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
        keyExtractor={({ id }) => id}
      />
    </View>
  )
}

export default MyReviews