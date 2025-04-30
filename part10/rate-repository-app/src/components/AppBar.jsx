import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    padding: 20,
    // justifyContent: 'center',
    // textAlign: 'center',
    // alignItems: 'center',
  },
  link: {
    marginRight: 10,
  }
});

const AppBar = () => {
  const { data } = useQuery(ME, { fetchPolicy: 'cache-and-network' });
  console.log('useQuery in AppBar data: ', data);
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Link style={styles.link} to={'/'} >
          <Text style={{ color: '#ffffff' }}>Repositories</Text>
        </Link>
        {data?.me && <Link style={styles.link} to={'/signout'} >
          <Text style={{ color: '#ffffff' }}>Sign out</Text>
        </Link>}
        {!data?.me && <Link style={styles.link} to={'/signin'} >
          <Text style={{ color: '#ffffff' }}>Sign in</Text>
        </Link>}
      </ScrollView>
    </View>
  );
};

export default AppBar;