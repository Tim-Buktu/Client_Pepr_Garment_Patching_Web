import { Navigation } from "@/components/navigation"
import { PageShell } from "@/components/layout/page-shell"
import { UpcycleConfigurator } from "@/components/upcycle-configurator"
import { Footer } from "@/components/footer"

export default function UpcyclePage() {
  return (
    <PageShell>
      <Navigation />
      <UpcycleConfigurator />
      <Footer />
    </PageShell>
  )
}
