
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Main() {
  return (
    <div>
      <Head>
        <title>Main | VideoPlayerWeb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
            <p>VideoPlayer</p>
        </div>
      </main>
    </div>
  );
}
