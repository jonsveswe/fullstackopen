import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../graphql/mutations";
import { useApolloClient } from '@apollo/client';

const useAddReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(ADD_REVIEW); // result: { data, loading, error }
  const addReview = async ({ repositoryName, ownerName, rating, text }) => {
    // await authStorage.removeAccessToken();
    const { data } = await mutate({ variables: { repositoryName, ownerName, rating, text } });
    // await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore(); // clear the Apollo Client's cache and re-execute all active queries. 
    return { data };
  }
  return [addReview, result];
};

export default useAddReview;