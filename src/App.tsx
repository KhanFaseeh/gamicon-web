import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GameDetail from './pages/GameDetail'
import About from './pages/About'
import Press from './pages/Press'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

import ScrollToTop from './components/ScrollToTop'
import BootSequence from './components/BootSequence'
import PageTransition from './components/PageTransition'

export default function App() {
  return (
    <BrowserRouter>
      <BootSequence />
      <ScrollToTop />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:slug" element={<GameDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/press" element={<Press />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  )
}
