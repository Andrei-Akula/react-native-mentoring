import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalBody: {
    backgroundColor: '#eee',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  titleBox: {
    marginVertical: 5,
  },
  titleText: {
    fontSize: 20,
  },
  titleTextError: {
    color: '#ff0000',
  },
  messageBox: {
    marginVertical: 10,
  },
  messageText: {
    fontSize: 18,
  },
  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {

  }
});
