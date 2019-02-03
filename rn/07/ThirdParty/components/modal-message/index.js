import React from 'react';
import { Button, Modal, Text, View } from 'react-native'
import { styles } from './styles';

export default class ModalMessage extends React.Component {
  onCloseBtn = () => {
    if (this.props.onClose) {
      this.props.onClose('close');
    }
  }

  onAgainBtn = () => {  
    if (this.props.onClose) {
      this.props.onClose('again');
    }
  }

  renderTitle(title, type) {
    const textStyles = [styles.titleText];
    if (type && type.includes('error')) {
      textStyles.push(styles.titleTextError)
    }
    return (
      <View style={styles.titleBox}>
        <Text style={textStyles}>{title}</Text>
      </View>
    );
  }

  tryAgainButton = <Button key='again' style={styles.button} title='Try again' onPress={this.onAgainBtn} />;
  closeButton = <Button key='close' style={styles.button} title='Close' onPress={this.onCloseBtn} />;

  renderButtons(type) {
    let buttons = [this.closeButton];
    if (type && type === 'error-and-try') {
      buttons = [this.tryAgainButton, this.closeButton];
    }
    return buttons;
  }

  render() {
    const { visible, children, title, type } = this.props;

    return (
      <Modal
        animationType='fade'
        transparent
        visible={visible}
      >
        <View style={styles.modalBox}>
          <View style={styles.modalBody}>
            {title && this.renderTitle(title, type)}
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>{children}</Text>
            </View>
            <View style={styles.buttonsBox}>
              {this.renderButtons(type)}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
