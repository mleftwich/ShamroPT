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
        throw data.error || new Error(`potatoes`);
      }

      setResult(data.result);
      setPrompt("");
      setLoading(false);
    } catch(error) {
      // Consider implementing your own error handling logic here
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
      <h3>ShamroPT</h3>
        <img src="/lep.png" className={styles.icon} />
      
        <p className={styles.slogan}>Ask An Angry Irishman</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Choose your words carefully"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input type="submit" value="Keep your guard up" />
        </form>
        <hr className={styles.break}/>
      
        <div className={styles.result}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc7c7Cf4udToCtz-aK6txoU0ru08oQ2YOQ1g7mxj_SWrRy09AAKnqTbHGPrMJnh2HVhPI&usqp=CAU" />
          {loading && <CircularProgress style={{color: 'green'}}/>}
          {result && `"${result}"`}
          </div>
    
      </main>
    </div>
    </div>
  );
}
