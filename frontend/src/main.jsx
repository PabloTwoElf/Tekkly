import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage from '../LandingPage.jsx'
import PrivacyPolicy from '../PrivacyPolicy.jsx'

function App() {
  const [page, setPage] = useState(window.location.hash === '#privacidad' ? 'privacy' : 'home')

  useEffect(() => {
    const onHash = () => setPage(window.location.hash === '#privacidad' ? 'privacy' : 'home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const goBack = () => {
    window.location.hash = ''
    setPage('home')
  }

  if (page === 'privacy') return <PrivacyPolicy onBack={goBack} />
  return <LandingPage />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
