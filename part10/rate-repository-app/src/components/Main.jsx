import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import Text from './Text';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignOut from './SignOut';
import AddReviewForm from './AddReviewForm';
import SignUpForm from './SignUpForm';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
    /*     justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, */
  },
});

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */

const Main = () => {
  console.log('render main');
  return (
    <View style={styles.container}>
      <AppBar />
      <Text fontSize='subheading'>Rate Repository Application</Text>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/addreview" element={<AddReviewForm />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="repositories/:id" element={<SingleRepository />} />
      </Routes>
    </View>
  );
};

export default Main;