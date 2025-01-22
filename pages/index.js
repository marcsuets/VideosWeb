import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Log-In | VideoPlayerWeb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
			<p className={styles.authTitle}>
				LOG IN
			</p>

        </div>        
      </main>
    </div>
  );
}
