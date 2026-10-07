import { useCallback, useEffect, useState } from 'react'
import './App.css'

// Task 01: the API base URL comes from the environment, never from the code.
// Local: .env  |  Production: the hosting platform's environment variables.
const API = import.meta.env.VITE_API_URL

function App() {
  const [menu, setMenu] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!API) {
      setError('VITE_API_URL is not set. Add it in the hosting platform and redeploy.')
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      const response = await fetch(`${API}/api/menu`)
      if (!response.ok) throw new Error(`API answered ${response.status}`)
      setMenu(await response.json())
      setStatus('ready')
    } catch (e) {
      setError(e.message)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <main className="app">
      <header>
        <h1>CampusEats</h1>
        <p className="muted">Campus food ordering - menu</p>
      </header>

      <p className="api">
        API: <code>{API || 'not configured'}</code>
      </p>

      {status === 'loading' && <p>Loading menu...</p>}

      {status === 'error' && (
        <div className="error" role="alert">
          <p>Could not load the menu: {error}</p>
          <button onClick={load}>Retry</button>
        </div>
      )}

      {status === 'ready' && menu.length === 0 && <p>No dishes available.</p>}

      {status === 'ready' && menu.length > 0 && (
        <ul className="menu">
          {menu.map((dish) => (
            <li key={dish.id}>
              <span className="name">{dish.name}</span>
              <span className="category">{dish.category}</span>
              <span className="price">Rs. {dish.price}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
