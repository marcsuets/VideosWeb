
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function VideoPlayer() {
  return (
    <div>
      <Head>
        <title>Main | VideoPlayerWeb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.containerVideoPlayer}>
          <h1>Video title</h1>
          <iframe
            src={`https://www.youtube.com/embed/YtF-rUNrIY4?si=_wB7R0dlqfbKwf0p`}
            title="title"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div>
            <p><strong>Platform:</strong> YouTube</p>
            <p><strong>Added on:</strong> 17/02/2025</p>
          </div>
        </div>
      </main>
    </div>
  );
}
