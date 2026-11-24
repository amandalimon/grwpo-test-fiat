import { Hero } from '@/components/hero/Hero'
import { Header } from '@/components/layout/Header'
import { PageBackground } from '@/components/layout/PageBackground'
import { QuoteForm } from '@/components/quote-form/QuoteForm'
import { getQuoteFormContent } from '@/content/quote-form'
import { getSiteContent } from '@/content/site'

export default async function Home() {
  const [site, content] = await Promise.all([
    getSiteContent(),
    getQuoteFormContent(),
  ])

  return (
    <>
      <Header content={site} />
      <main className="relative isolate pb-113">
        <PageBackground />
        <Hero content={content.hero} />
        <QuoteForm content={content} />
      </main>
    </>
  )
}
