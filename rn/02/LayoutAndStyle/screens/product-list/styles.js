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
  listContainer: {
  },
  listItemContainer: {
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 36,
  },
  textListItem: {
    fontSize: 24,
    textAlign: 'left',
  }
});
