import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-[100dvh]">{children}</main>
      <Footer />
    </>
  )
}
