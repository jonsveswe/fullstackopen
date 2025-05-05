import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  fullName: {
    color: '#0366d6',
    fontWeight: 'bold',
  },
  description: {
    color: '#24292e',
    fontSize: 16,
  },
  language: {
    color: '#24292e',
    fontSize: 14,
  },
  logo: {
    width: 50,
    height: 50,
  },
})
const RepositoryItem = (props) => {
  const { fullName, description, language, stargazersCount, forksCount, ratingAverage, reviewCount, ownerAvatarUrl } = props.item;
  return (
    <View testID='repositoryItem' style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.logo} source={{ uri: ownerAvatarUrl }} />
        <View style={{ marginLeft: 10 }}>
          <Text testID='fullName' style={styles.fullName}>{fullName}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.language}>{language}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text fontWeight={'bold'}>{stargazersCount}</Text>
        <Text fontWeight={'bold'}>{forksCount}</Text>
        <Text fontWeight={'bold'}>{ratingAverage}</Text>
        <Text fontWeight={'bold'}>{reviewCount}</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;