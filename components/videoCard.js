import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function VideoCard({ video }) {
  const router = useRouter();

  // Función para obtener el ID del video de YouTube desde cualquier URL
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

  const videoId = getYouTubeVideoId(video.url);
  const isInstagram = video.platform.toLowerCase() === "instagram";

  // Función para manejar el clic y redirigir
  const handleClick = () => {
    router.push({
      pathname: '/WatchVideo',
      query: { id: video.id } // Solo pasamos el ID
    });
  };

  return (
    <div className={styles.videoCard} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {isInstagram ? (
        <img 
          src="/images/Instagram.png" 
          alt={video.title} 
          style={{ width: "300px", height: "200px", objectFit: "contain", borderRadius: "10px" }}
        />      
      ) : videoId ? (
        <img 
          src= {`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
          alt={video.title} 
          style={{ width: "300px", height: "200px", objectFit: "contain", borderRadius: "10px" }}
        />
      ) : (
        <p className="text-red-500">Thumbnail not available</p>
      )}
      <h2 className="text-xl font-semibold mt-2">{video.title}</h2>
      <p className="text-gray-600"><strong>Platform:</strong> {video.platform}</p>
      <p className="text-gray-600"><strong>Added on:</strong> {video.addDate}</p>
    </div>
  );
}
