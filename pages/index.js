import styles from './index.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App() {
  const router = useRouter()
let password = "potatoes"
let [entered, setEntered] = useState()
let [login, setLogin] = useState(false)
  function onSubmit(e) {
    e.preventDefault()
    if (entered === password) {
    setLogin(true)
  } else {
    alert("git gone ye fookin mug")
  }
}

useEffect(() => {
  if (login) {
    localStorage.setItem('login', 'true')
    router.push('/shampt')

    setTimeout(() => {
      setLogin(false)
    }, 5000)
  }
  
}, [login])

return (
  <main className={styles.main}>
  <div>
    <form onSubmit={onSubmit}>
    <input name="password" type="text" placeholder="password" onChange={(e) => setEntered(e.target.value)} />
    <br />
    <input type="submit" value="Submit" />
    </form>
  </div>
  </main>
)
}