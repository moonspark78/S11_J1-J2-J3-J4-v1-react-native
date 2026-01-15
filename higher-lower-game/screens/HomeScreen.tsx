import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const startGame = () => {
    setModalVisible(false);
    const target = Math.floor(Math.random() * 100) + 1;
    const starting = Math.floor(Math.random() * 100) + 1;
    navigation.navigate('Game', { target, starting });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.startButton,
          pressed && { opacity: 0.6 },
        ]}
        onPress={() => setModalVisible(true)}
        onLongPress={startGame}
      >
        <Text style={styles.text}>Start Game</Text>
      </Pressable>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Long press to start the game</Text>
            <Pressable onPress={() => setModalVisible(false)} style={styles.okBtn}>
              <Text style={{ color: 'white' }}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  startButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 12,
  },
  text: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  modalBg: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modal: { backgroundColor: 'white', padding: 20, borderRadius: 10 },
  modalText: { marginBottom: 15 },
  okBtn: { backgroundColor: '#007AFF', padding: 10, borderRadius: 8, alignItems: 'center' },
});
