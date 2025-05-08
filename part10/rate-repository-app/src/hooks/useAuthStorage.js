import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

/**
 * Returns the `AuthStorageContext` instance from the context.
 * @returns {AuthStorageContext} The `AuthStorageContext` instance.
 */
const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;