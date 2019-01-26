import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: '5%',
  },
  textContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
  iconLinksContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  iconLink: {
    marginRight: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  name: {
    fontSize: 32,
  },
  description: {
    fontSize: 22
  }
});
