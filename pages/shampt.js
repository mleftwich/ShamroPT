import CircularProgress from '@mui/material/CircularProgress';
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
          window.location.href = "/";
        }
      }, [])

  async function onSubmit(event) {
    setResult("")
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Come out ye black and tans`);
      }

      setResult(data.result);
      setPrompt("");
      setLoading(false);
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.container}>
    <div>
      <Head>
        <title>ShamroPT</title>
        <link rel="icon" href="./favicon.ico?" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
      <h1>ShamroPT</h1>
        <img src="/lep.png" className={styles.icon} />
      
        <p className={styles.slogan}>Ask An Angry Irishman</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Give it a lash"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input type="submit" value="G'wan Eejit" />
        </form>
        <hr className={styles.break}/>
      
        <img src="/clover.png" className={styles.clover} />

        <div className={styles.result}>
          
          {loading && <CircularProgress style={{color: 'white'}}/>}
          {result && `"${result}"`}
          </div>
    
      </main>
    </div>
    </div>
  );
}
