import logo from '@/logo.svg'
import './ home.css'
import { useWineData } from '@/utils/use-wines-data'

function Home() {
  const winesData = useWineData()
  console.log('🚀 ~ file: index.tsx:7 ~ Home ~ winesData:', winesData)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default Home
