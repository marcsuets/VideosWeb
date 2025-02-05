import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // Importa Firebase Auth
import { onAuthStateChanged } from 'firebase/auth';
import VideoCard from '../components/videoCard';

export default function Main() {
  const [user, setUser] = useState(null);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedList, setSelectedList] = useState('Favorites');
  const [lists, setLists] = useState([]);
  const router = useRouter();

	const fetchUserLists = async () => {
    try {
      if (!user) return ["Favorites"]; // Verifica si el usuario está disponible
  
      const q = query(
        collection(db, "videos"),
        where("author", "==", user.uid)
      );
  
      const querySnapshot = await getDocs(q);
  
      const uniqueLists = Array.from(
        new Set(querySnapshot.docs.map(doc => doc.data().list))
      );
  
      return ["Favorites", ...uniqueLists.filter(list => list !== "Favorites")];
  
    } catch (error) {
      console.error("Error fetching user lists:", error);
      return ["Favorites"];
    }
  };
  


  useEffect(() => {
    if (!user) return; // Asegura que el usuario esté disponible antes de ejecutar la consulta
  
    const fetchVideos = async () => {
      try {
        const q = query(
          collection(db, "videos"),
          where("list", "==", selectedList),
          where("author", "==", user.uid)
        );
  
        const querySnapshot = await getDocs(q);
        const videosList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setVideos(videosList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
  
    fetchVideos();
  }, [user, selectedList]); // Asegura que se ejecute cuando `user` cambie
   // Se ejecuta cuando cambia selectedList

  // Obtiene las listas del usuario
	useEffect(() => {
    if (!user) return; // Espera a que el usuario esté definido
  
    const getLists = async () => {
      const userLists = await fetchUserLists();
      setLists(userLists);
    };
  
    getLists();
  }, [user]);
  

  // Verifica si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.push('/'); // Redirige si no hay usuario autenticado
      } else {
        setUser(authUser); // Guarda el usuario en el estado
        setLoading(false);
      }
    });
  
    return () => unsubscribe(); // Limpieza del listener
  }, []);
  

  if (loading) return null;

  return (
    <div>
      <Head>
        <title>Main | VideoPlayerWeb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.containerVideoPlayer}>
          <div className={styles.mainHeader}>
            {lists.map((list) => (
              <button key={list} onClick={() => setSelectedList(list)} className={selectedList === list ? styles.mainHeaderButtonSelected : styles.mainHeaderButton}>
                {list}
              </button>
            ))}
          </div>
          <div className={styles.mainMain}>
            {videos.length > 0 ? (
              videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))
            ) : (
              <p className={styles.header}>No videos found</p>
            )}
          </div>
          <button className={styles.floatingButton} onClick={() => router.push('/AddVideo')}>
            Add Video
          </button>
          <button className={styles.floatingButtonLogOut} onClick={() => auth.signOut()}>
            Log Out
          </button>
        </div>
      </main>

    </div>
  );
}
