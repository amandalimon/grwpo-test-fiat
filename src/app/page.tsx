import { Header } from '@/components/layout/Header'
import { PageBackground } from '@/components/layout/PageBackground'
import { getSiteContent } from '@/content/site'
import { Hero } from '@/features/quote/components/Hero'
import { QuoteForm } from '@/features/quote/components/QuoteForm'
import { getQuoteFormContent } from '@/features/quote/content'

export default async function Home() {
  const [site, content] = await Promise.all([
    getSiteContent(),
    getQuoteFormContent(),
  ])

  return (
    <>
      <Header content={site} />
      <main className="relative isolate pb-113 md:pb-107 lg:pb-121">
        <PageBackground />
        <Hero content={content.hero} />
        <QuoteForm content={content} />
      </main>
    </>
  )
}
