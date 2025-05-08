import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

export const useRepository = (id) => {
  const { loading, error, data } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });
  return { repository: data?.repository, loading, error };
};