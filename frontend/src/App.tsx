import './App.css'
import WaveBg from './component/background/WaveBg'
import WavyBg from './component/background/WavyBg'
import Header from './component/Header'
import Hero from './component/Hero'

function App() {

  return (
<>    
    <div className="relative min-h-screen">
<div className="absolute inset-0 -z-10 overflow-hidden">
<WaveBg />
<WavyBg />
</div>
<div  className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-transparent">  
  <Header />
    < Hero />
</div>
 </div>
  </>
  )
}

export default App
