import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // Importa tu configuración de Firebase
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { onAuthStateChanged } from 'firebase/auth';


export default function WatchVideo() {
  const router = useRouter();
  const { id } = router.query; // Obtiene el id del video de la URL

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Función para obtener el video desde Firebase usando el ID
  const fetchVideo = async () => {
    try {
      if (!id) return; // Asegúrate de que el id esté presente

      const docRef = doc(db, "videos", id); // Referencia al documento del video
      const docSnap = await getDoc(docRef); // Obtén el documento

      if (docSnap.exists()) {
        setVideo({ id: docSnap.id, ...docSnap.data() }); // Establece el video en el estado
      } else {
        console.error("No such video!");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    } finally {
      setLoading(false);
    }
  };

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

  // Función para eliminar el video de la base de datos
  const deleteVideo = async () => {
    try {
      if (id) {
        const docRef = doc(db, "videos", id); // Referencia al documento del video
        await deleteDoc(docRef); // Elimina el documento de la base de datos
        router.push("/main"); // Redirige a la página principal después de eliminar el video
      }
      
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]); // Ejecutar cada vez que el id cambia

  if (loading) return <p>Loading...</p>; // Muestra un mensaje de carga mientras se obtiene el video

  if (!video) return <p>Video not found.</p>; // Si no se encuentra el video, muestra un mensaje

  // Función para obtener el ID de YouTube (lo mismo que en VideoCard)
  const getYouTubeVideoId = (url) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("youtube.com")) {
        return parsedUrl.searchParams.get("v");
      } else if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.substring(1);
      }
    } catch (error) {
      console.error("Error parsing video URL:", error);
      return null;
    }
  };

  // Función para extraer la URL de Instagram
  const getInstagramEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      // Si la URL es de Instagram, la convertimos a la versión de embed
      if (parsedUrl.hostname.includes("instagram.com")) {
        const postId = parsedUrl.pathname.split("/")[2]; // Obtén el ID de la publicación
        return `https://www.instagram.com/p/${postId}/embed`; // Devuelve la URL de embed
      }
    } catch (error) {
      console.error("Error parsing Instagram URL:", error);
      return null;
    }
  };

  return (
    <div>
      <Head>
        <title>Watch {video.title} | VideoPlayerWeb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.containerVideoPlayer}>
          <h1>{video.title}</h1>
          {video.platform.toLowerCase() === "youtube" ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.url)}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            ></iframe>
          ) : video.platform.toLowerCase() === "instagram" ? (
            <iframe
              src={getInstagramEmbedUrl(video.url)}
              width="400"
              height="480"
              allowTransparency="true"
              title="Instagram Video"
              className={styles.iframe}
            ></iframe>
          ) : (
            <p>Video embed functionality for this platform is not implemented.</p>
          )}
          <p><strong>Added on:</strong> {video.addDate}</p>

          {/* Contenedor de botones */}
          <div className={styles.buttonContainer}>
            {/* Botón para volver a la página anterior */}
            <button onClick={() => router.back()} className={styles.mainHeaderButton}>
              Back
            </button>

            {/* Botón para eliminar el video de la base de datos */}
            <button onClick={deleteVideo} className={styles.mainHeaderButton}>
              Delete Video
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
