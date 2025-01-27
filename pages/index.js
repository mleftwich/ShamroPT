import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
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
  <div>
  <Head>
  <title>ShamroPT</title>
  <link rel="icon" href="favicon.ico?" type="image/x-icon" />
</Head>
  <main className={styles.main}>
  <h1>Stall the ball lad</h1>
  <div className={styles.div}>
    <form onSubmit={onSubmit}>
    <input name="password" type="text" placeholder="password" onChange={(e) => setEntered(e.target.value)} />
    <br />
    <input type="submit" value="Submit" />
    </form>
  </div>
  </main>
  </div>
)
}