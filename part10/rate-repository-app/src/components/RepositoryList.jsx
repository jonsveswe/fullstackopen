import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import { useParams, useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-web';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// To enable easy testing, we extract the components "pure" code into another component, such as the RepositoryListContainer component.
// Now, the RepositoryList component contains only the side effects and its implementation is quite simple. We can test the RepositoryListContainer component 
// by providing it with paginated repository data through the repositories prop and checking that the rendered content has the correct information.
export const RepositoryListContainer = ({ repositories, orderBy, orderDirection, searchString, setSearchString, setOrderBy, setOrderDirection }) => {
  const navigate = useNavigate();
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const onPressHandler = (item) => {
    console.log('onPressHandler item: ', item);
    navigate(`/repositories/${item.id}`);
  };

  return (
    <>
      <View>
        <TextInput
          value={searchString}
          onChangeText={(text) => setSearchString(text)}
          placeholder="Search"
        />
        <View style={{ flexDirection: 'row' }}>
          <Picker
            selectedValue={orderBy}
            onValueChange={(itemValue, itemIndex) =>
              setOrderBy(itemValue)
            }>
            <Picker.Item label="Latest repositories" value="CREATED_AT" />
            <Picker.Item label="Average rating" value="RATING_AVERAGE" />
          </Picker>
          <Picker
            selectedValue={orderDirection}
            onValueChange={(itemValue, itemIndex) =>
              setOrderDirection(itemValue)
            }>
            <Picker.Item label="Descending" value="DESC" />
            <Picker.Item label="Ascending" value="ASC" />
          </Picker>
        </View>
      </View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        /*       ListHeaderComponent={() => {
                return (
                  <View>
                    <TextInput
                      value={searchString}
                      onChangeText={(text) => setSearchString(text)}
                      placeholder="Search"
                    />
                    <View style={{ flexDirection: 'row' }}>
                      <Picker
                        selectedValue={orderBy}
                        onValueChange={(itemValue, itemIndex) =>
                          setOrderBy(itemValue)
                        }>
                        <Picker.Item label="Latest repositories" value="CREATED_AT" />
                        <Picker.Item label="Average rating" value="RATING_AVERAGE" />
                      </Picker>
                      <Picker
                        selectedValue={orderDirection}
                        onValueChange={(itemValue, itemIndex) =>
                          setOrderDirection(itemValue)
                        }>
                        <Picker.Item label="Descending" value="DESC" />
                        <Picker.Item label="Ascending" value="ASC" />
                      </Picker>
                    </View>
                  </View>
                )
              }} */
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => onPressHandler(item)}>
              <RepositoryItem item={item} />
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
      />
    </>
  );
};

const RepositoryList = () => {
  const [searchString, setSearchString] = useState('');
  const [debouncedSearchString] = useDebounce(searchString, 500);
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('RATING_AVERAGE');

  const { repositories } = useRepositories(orderBy, orderDirection, debouncedSearchString);

  return <RepositoryListContainer
    repositories={repositories}
    orderBy={orderBy}
    orderDirection={orderDirection}
    setOrderBy={setOrderBy}
    setOrderDirection={setOrderDirection}
    searchString={searchString}
    setSearchString={setSearchString} />;
};


export default RepositoryList;


/* const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
}; */