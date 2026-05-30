import { Navigation } from '@/components/navigation'
import { PageShell } from '@/components/layout/page-shell'
import { PantsConfigurator } from '@/components/pants-configurator'
import { Footer } from '@/components/footer'

export default function CustomPage() {
  return (
    <PageShell>
      <Navigation />
      <PantsConfigurator />
      <Footer />
    </PageShell>
  )
}
