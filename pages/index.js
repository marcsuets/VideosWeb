import { useState } from 'react';
import Head from 'next/head';
import { auth } from '../firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
} from 'firebase/auth';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      window.location.href = '/main';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Your App Name</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Login to access your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <form onSubmit={handleAuth} className={styles.authForm}>
            {error && <p className={styles.error}>{error}</p>}
            <p className={styles.mainTitle}>VideoPlayer</p>                       
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" className={styles.button}>
              {isLogin ? 'Login' : 'Register'}
            </button>
            
            <p onClick={() => setIsLogin(!isLogin)} className={styles.blueTextLink}>
              {isLogin 
                ? "Don't have an account? Register" 
                : "Already have an account? Login"}

            </p>
          </form>
        </div>
      </main>
    </>
  );
}
