import Header from './Header'
import Footer from './Footer'
import FloatingWhatsApp from '@/components/whatsapp/FloatingWhatsApp'

interface PageWrapperProps {
  children: React.ReactNode
  whatsappMessage?: string
}

export default function PageWrapper({ children, whatsappMessage }: PageWrapperProps) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp mensagem={whatsappMessage} />
    </>
  )
}
