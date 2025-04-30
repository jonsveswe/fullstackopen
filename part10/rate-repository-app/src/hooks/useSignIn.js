import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN); // result: { data, loading, error }
  const signIn = async ({ username, password }) => {
    await authStorage.removeAccessToken();
    const { data } = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore(); // clear the Apollo Client's cache and re-execute all active queries. 
    return { data };
  }
  return [signIn, result];
};

export default useSignIn;