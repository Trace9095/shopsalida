import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function MapScreen() {
  function openMap() {
    Linking.openURL('https://maps.google.com/?q=F+Street,+Salida,+CO+81201')
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="map" size={48} color="#7C3AED" style={styles.icon} />
        <Text style={styles.title}>Salida Downtown Map</Text>
        <Text style={styles.description}>
          Most shops are on F Street and the surrounding historic downtown blocks of Salida, CO 81201.
        </Text>
        <TouchableOpacity style={styles.button} onPress={openMap} activeOpacity={0.8}>
          <Ionicons name="navigate" size={18} color="#fff" />
          <Text style={styles.buttonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: {
    backgroundColor: '#13131A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A3D',
    padding: 28,
    alignItems: 'center',
    width: '100%',
  },
  icon: { marginBottom: 16 },
  title: { color: '#E2E8F0', fontWeight: '700', fontSize: 20, marginBottom: 10, textAlign: 'center' },
  description: { color: '#7B7BA8', fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    minHeight: 44,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
})
