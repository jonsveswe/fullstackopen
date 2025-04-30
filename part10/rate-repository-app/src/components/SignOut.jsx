import { View, Pressable, Text } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
const SignOut = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handlePress = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore(); // clear the Apollo Client's cache and re-execute all active queries. 
    navigate('/');
  }
  return (
    <View>
      <Pressable onPress={handlePress}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  )
}

export default SignOut