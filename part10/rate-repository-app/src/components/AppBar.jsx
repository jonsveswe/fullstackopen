import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

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
  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'cache-and-network' });
  console.log('useQuery in AppBar data: ', data);
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Link style={styles.link} to={'/'} >
          <Text style={{ color: '#ffffff' }}>Repositories</Text>
        </Link>
        {data?.me && <Link style={styles.link} to={'/addreview'}>
          <Text style={{ color: '#ffffff' }}>Add Review</Text>
        </Link>}
        {data?.me && <Link style={styles.link} to={'/myreviews'}>
          <Text style={{ color: '#ffffff' }}>My Reviews</Text>
        </Link>}
        {!data?.me && <Link style={styles.link} to={'/signup'}>
          <Text style={{ color: '#ffffff' }}>Sign up</Text>
        </Link>}
        {data?.me && <Link style={styles.link} to={'/signout'} >
          <Text style={{ color: '#ffffff' }}>Sign out</Text>
        </Link>}
        {!data?.me && <Link style={styles.link} to={'/signin'} >
          <Text style={{ color: '#ffffff' }}>Sign in</Text>
        </Link>}
        {data?.me && <Text style={{ color: '#ffffff', marginRight: 10, borderLeftWidth: 4, borderColor: '#ffffff', paddingLeft: 10 }}>Logged in as: {data.me.username}</Text>}
      </ScrollView>
    </View>
  );
};

export default AppBar;