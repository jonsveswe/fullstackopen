import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { useRepository } from "../hooks/useRepository";
import { Linking, Pressable, Text, FlatList, StyleSheet } from "react-native";
import { Button, View } from "react-native-web";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{review.user.username}</Text>
      <Text>{review.createdAt.split('T')[0]}</Text>
      <Text>{review.text}</Text>
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  if (!repository) {
    return null;
  }

  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <View>
      {/* <RepositoryItem item={repository} /> */}
      <Pressable style={{ marginTop: 10, backgroundColor: '#0366d6', borderRadius: 1 }} onPress={() => Linking.openURL(repository.url)}>
        <Text>Open in GitHub</Text>
      </Pressable>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryItem item={repository} />}
      />

    </View>
  )
}

export default SingleRepository