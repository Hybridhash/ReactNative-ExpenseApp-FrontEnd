import React from 'react';
import {View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const AlertMessage = ({message, visible, onClose}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {message.map((msg, index) => (
            <Text key={index} style={styles.message}>{msg}</Text>
          ))}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.button}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  innerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4455BB',
    textAlign: 'center',
  },
});

export default AlertMessage;
