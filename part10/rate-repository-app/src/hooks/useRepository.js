import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useRepository = (first, repositoryId) => {
  const { data, loading, fetchMore, ...rest } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { first: first, repositoryId: repositoryId },
    fetchPolicy: "cache-and-network",
  });

  console.log("repository reviews: ", data?.repository.reviews);

  const handleFetchMore = () => {
    console.log("handleFetchMore");
    console.log("data: ", data);
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    const variables = {
      first: first,
      repositoryId: repositoryId,
    };

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });

  };

  return { 
    repository: data?.repository, 
    fetchMore: handleFetchMore, 
    loading,
    ...rest
  };
};

export default useRepository;