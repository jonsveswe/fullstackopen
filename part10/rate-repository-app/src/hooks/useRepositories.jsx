import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (first, orderBy, orderDirection, searchKeyword) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { first: first, orderBy: orderBy, orderDirection: orderDirection, searchKeyword: searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  console.log('repositories: ', data?.repositories);
  console.log('loading: ', loading);
  console.log('fetchMore: ', fetchMore);
  console.log('result: ', result);
  // console.log('...result: ', ...result);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    const variables = {
      first: first,
      orderBy: orderBy,
      orderDirection: orderDirection,
      searchKeyword: searchKeyword,
    };

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });

  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepositories;





/* import { useState, useEffect } from 'react';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    const response = await fetch('http://10.10.0.103:5000/api/repositories');
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories; */