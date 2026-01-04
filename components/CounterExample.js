// ==========================================
// COMPOSANT UTILISANT LE COUNTER STORE
// ==========================================
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCounterStore } from '../stores/counterStore';

export default function CounterExample() {
  // MÉTHODE 1: Souscrire à tout le store
  // ⚠️ Le composant se re-render à chaque changement du store
  // const { count, increment, decrement, reset } = useCounterStore();

  // MÉTHODE 2 (RECOMMANDÉE): Souscrire uniquement à ce dont on a besoin
  // ✅ Optimisation: re-render seulement si "count" change
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);
  const incrementByAmount = useCounterStore((state) => state.incrementByAmount);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exemple 1: Compteur Simple</Text>

      <View style={styles.counterDisplay}>
        <Text style={styles.count}>{count}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+1</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => incrementByAmount(5)}
        >
          <Text style={styles.buttonText}>+5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={reset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.explanation}>
        <Text style={styles.explainText}>
          Ce compteur utilise Zustand pour gérer son état.{'\n'}
          L'état est partagé globalement et persiste entre les navigations.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  counterDisplay: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  explanation: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E8F4F8',
    borderRadius: 8,
  },
  explainText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    textAlign: 'center',
  },
});
