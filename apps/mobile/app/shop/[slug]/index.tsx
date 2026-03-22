import { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Linking } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const API_URL = process.env['EXPO_PUBLIC_API_URL'] ?? 'https://shopsalida.com'

interface Shop {
  name: string
  shortDescription: string
  description: string
  category: string
  tier: string
  address: string
  phone: string | null
  website: string | null
  email: string | null
  instagramHandle: string | null
}

export default function ShopDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/shops/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setShop(data.shop)
        }
      } catch {}
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#7C3AED" />
      </View>
    )
  }

  if (!shop) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Shop not found</Text>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: shop.name }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{shop.category.replace(/-/g, ' ')}</Text>
          {shop.tier !== 'free' && (
            <Text style={[styles.tier, shop.tier === 'sponsored' ? styles.sponsored : styles.premium]}>
              {shop.tier}
            </Text>
          )}
        </View>

        <Text style={styles.name}>{shop.name}</Text>
        <Text style={styles.shortDesc}>{shop.shortDescription}</Text>

        {shop.description ? (
          <Text style={styles.description}>{shop.description}</Text>
        ) : null}

        {/* Contact */}
        <View style={styles.contactCard}>
          {shop.address ? (
            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(shop.address + ', Salida CO')}`)}
            >
              <Ionicons name="location-outline" size={18} color="#7C3AED" />
              <Text style={styles.contactText}>{shop.address}, Salida, CO 81201</Text>
            </TouchableOpacity>
          ) : null}
          {shop.phone ? (
            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => Linking.openURL(`tel:${shop.phone}`)}
            >
              <Ionicons name="call-outline" size={18} color="#2DD4BF" />
              <Text style={styles.contactText}>{shop.phone}</Text>
            </TouchableOpacity>
          ) : null}
          {shop.website ? (
            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => Linking.openURL(shop.website!)}
            >
              <Ionicons name="globe-outline" size={18} color="#9B67F5" />
              <Text style={[styles.contactText, styles.link]}>{shop.website.replace(/^https?:\/\//, '')}</Text>
            </TouchableOpacity>
          ) : null}
          {shop.instagramHandle ? (
            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => Linking.openURL(`https://instagram.com/${shop.instagramHandle}`)}
            >
              <Ionicons name="logo-instagram" size={18} color="#F87171" />
              <Text style={[styles.contactText, styles.link]}>@{shop.instagramHandle}</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Claim CTA */}
        <TouchableOpacity
          style={styles.claimBtn}
          onPress={() => Linking.openURL(`${API_URL}/claim/${slug}`)}
          activeOpacity={0.8}
        >
          <Ionicons name="shield-checkmark-outline" size={16} color="#7C3AED" />
          <Text style={styles.claimText}>Own this business? Claim listing</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  content: { padding: 20, paddingBottom: 48 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0F' },
  errorText: { color: '#7B7BA8', fontSize: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  category: { color: '#7B7BA8', fontSize: 13, textTransform: 'capitalize', letterSpacing: 0.4 },
  tier: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  sponsored: { backgroundColor: '#2DD4BF20', color: '#2DD4BF' },
  premium: { backgroundColor: '#7C3AED20', color: '#9B67F5' },
  name: { color: '#E2E8F0', fontWeight: '800', fontSize: 26, marginBottom: 8, lineHeight: 32 },
  shortDesc: { color: '#9B67F5', fontSize: 15, marginBottom: 12 },
  description: { color: '#7B7BA8', fontSize: 14, lineHeight: 22, marginBottom: 20 },
  contactCard: {
    backgroundColor: '#13131A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A3D',
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 36 },
  contactText: { color: '#E2E8F0', fontSize: 14, flex: 1 },
  link: { color: '#9B67F5' },
  claimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#7C3AED40',
    borderRadius: 10,
    padding: 14,
    minHeight: 44,
  },
  claimText: { color: '#7C3AED', fontSize: 14, fontWeight: '600' },
})
