import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: '5%',
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
  },
  textContainer: {
    marginBottom: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    marginLeft: 15,
  },
  description: {
    fontSize: 20
  }
});
