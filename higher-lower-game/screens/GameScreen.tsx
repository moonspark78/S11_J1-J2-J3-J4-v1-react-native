import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function GameScreen({ route, navigation }: any) {
  const { target, starting } = route.params;

  const handleGuess = (guess: 'higher' | 'lower') => {
    const win =
      (guess === 'higher' && target > starting) ||
      (guess === 'lower' && target < starting);

    navigation.navigate('Result', {
      win,
      target,
      starting,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Starting</Text>
      <Text style={styles.number}>{starting}</Text>

      <Pressable style={styles.higher} onPress={() => handleGuess('higher')}>
        <Text style={styles.btnText}>Higher</Text>
      </Pressable>

      <Pressable style={styles.lower} onPress={() => handleGuess('lower')}>
        <Text style={styles.btnText}>Lower</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 10 },
  number: { fontSize: 48, fontWeight: 'bold', marginBottom: 30 },
  higher: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    marginBottom: 15,
  },
  lower: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  btnText: { color: 'white', fontSize: 18 },
});
