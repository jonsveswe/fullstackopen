import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import { Linking, Pressable, Text, FlatList, StyleSheet } from "react-native";
import { Button, View } from "react-native-web";

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

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold' }}>{review.user.username}</Text>
      <Text>{review.createdAt.split('T')[0]}</Text>
      <Text>{review.text}</Text>
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams();
  const first = 4;
  const { repository, fetchMore } = useRepository(first, id);
  if (!repository) {
    return null;
  }

  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    /* Had to add flex here otherwise no scrollbars. */
    <View style={{ flex: 1 }}>
      {/* <RepositoryItem item={repository} /> */}
      <Pressable style={{ marginTop: 10, backgroundColor: '#0366d6', borderRadius: 1 }} onPress={() => Linking.openURL(repository.url)}>
        <Text>Open in GitHub</Text>
      </Pressable>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={() => fetchMore()}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
      /*  ListHeaderComponent={() => <RepositoryItem item={repository} />} */
      />

    </View>
  )
}

export default SingleRepository