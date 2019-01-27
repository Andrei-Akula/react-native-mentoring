import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: '5%',
  },
  listContainer: {
    marginTop: 10,
  },
  listItemContainer: {
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    width: '100%',
  },
  listItemSeparator: {
    height: 0.5,
    backgroundColor: "#CED0CE",
  },
  textListItem: {
    fontSize: 24,
    textAlign: 'left',
  }
});
