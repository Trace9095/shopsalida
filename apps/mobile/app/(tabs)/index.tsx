import { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const API_URL = process.env['EXPO_PUBLIC_API_URL'] ?? 'https://shopsalida.com'

interface Shop {
  id: string
  slug: string
  name: string
  shortDescription: string
  category: string
  tier: string
  address: string
  phone: string | null
  website: string | null
}

export default function DirectoryScreen() {
  const router = useRouter()
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/shops`)
        if (res.ok) {
          const data = await res.json()
          setShops(data.shops ?? [])
        }
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  const filtered = shops.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  )

  const tierColor = (tier: string) => {
    if (tier === 'sponsored') return '#2DD4BF'
    if (tier === 'premium') return '#9B67F5'
    return '#7B7BA8'
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color="#7B7BA8" style={styles.searchIcon} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search shops..."
          placeholderTextColor="#7B7BA8"
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={18} color="#7B7BA8" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color="#7C3AED" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/shop/${item.slug}`)}
              activeOpacity={0.75}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.shopName} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.tier, { color: tierColor(item.tier) }]}>
                  {item.tier !== 'free' ? item.tier : ''}
                </Text>
              </View>
              <Text style={styles.category}>{item.category.replace(/-/g, ' ')}</Text>
              <Text style={styles.description} numberOfLines={2}>{item.shortDescription}</Text>
              {item.address ? (
                <Text style={styles.address}>{item.address}, Salida CO</Text>
              ) : null}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No shops found</Text>
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#13131A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A3D',
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#E2E8F0', fontSize: 15 },
  clearBtn: { padding: 4 },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  card: {
    backgroundColor: '#13131A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A3D',
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  shopName: { color: '#E2E8F0', fontWeight: '700', fontSize: 16, flex: 1 },
  tier: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize', marginLeft: 8 },
  category: { color: '#7B7BA8', fontSize: 12, textTransform: 'capitalize', marginBottom: 6 },
  description: { color: '#7B7BA8', fontSize: 13, lineHeight: 18, marginBottom: 6 },
  address: { color: '#7B7BA8', fontSize: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { color: '#7B7BA8', textAlign: 'center', marginTop: 60 },
})
