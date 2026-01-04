import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CounterExample from './components/CounterExample';
import TodoExample from './components/TodoExample';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tutoriel Zustand</Text>
          <Text style={styles.headerSubtitle}>
            Apprendre la gestion d'état avec Zustand
          </Text>
        </View>

        <CounterExample />

        <TodoExample />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Testez les composants ci-dessus.{'\n'}
            L'état reste en mémoire pendant la session !
          </Text>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  footer: {
    padding: 20,
    backgroundColor: '#E8F4F8',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
});
