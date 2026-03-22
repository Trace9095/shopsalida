import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const CATEGORIES = [
  { slug: 'art-gallery', label: 'Art Galleries', color: '#A78BFA' },
  { slug: 'boutique', label: 'Boutiques', color: '#F87171' },
  { slug: 'outdoor-gear', label: 'Outdoor Gear', color: '#34D399' },
  { slug: 'vintage-antique', label: 'Vintage & Antique', color: '#FBBF24' },
  { slug: 'gift-shop', label: 'Gift Shops', color: '#60A5FA' },
  { slug: 'jewelry-artisan', label: 'Jewelry & Artisan', color: '#2DD4BF' },
  { slug: 'market', label: 'Markets', color: '#34D399' },
  { slug: 'home-decor', label: 'Home & Decor', color: '#C084FC' },
  { slug: 'food-specialty', label: 'Food & Specialty', color: '#F87171' },
  { slug: 'books-music', label: 'Books & Music', color: '#7B7BA8' },
]

export default function CategoriesScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Browse by Category</Text>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.slug}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { borderColor: item.color + '40' }]}
            onPress={() => router.push(`/?category=${item.slug}`)}
            activeOpacity={0.75}
          >
            <Text style={[styles.label, { color: item.color }]}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  heading: { color: '#E2E8F0', fontWeight: '700', fontSize: 22, margin: 16 },
  grid: { paddingHorizontal: 12, paddingBottom: 32 },
  row: { gap: 10, marginBottom: 10 },
  card: {
    flex: 1,
    backgroundColor: '#13131A',
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    minHeight: 80,
    justifyContent: 'center',
  },
  label: { fontWeight: '700', fontSize: 15 },
})
