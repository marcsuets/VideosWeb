import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import VideoCard from '../components/videoCard';

export default function Main() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "videos"));
        const videosList = querySnapshot.docs.map(doc => ({
          id: doc.id, // Guarda el ID del documento
          ...doc.data(), // Obtiene los datos del documento
        }));
        setVideos(videosList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <Head>
        <title>Main | VideoPlayerWeb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.containerVideoPlayer}>
          <div className={styles.mainHeader}>
            <h1>Videos Disponibles</h1>
          </div>
          <div className={styles.mainMain}>
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
