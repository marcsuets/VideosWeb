export default function VideoCard({ video }) {
  // Función para obtener el ID del video de YouTube desde cualquier URL
  const getYouTubeVideoId = (url) => {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtube.com")) {
        return parsedUrl.searchParams.get("v"); // Extrae el ID si es una URL normal de YouTube
      } else if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.substring(1); // Extrae el ID si es una URL corta de YouTube
      }
    } catch (error) {
      console.error("Error parsing video URL:", error);
      return null;
    }
  };

  const videoId = getYouTubeVideoId(video.url);
  const isInstagram = video.platform.toLowerCase() === "instagram";

  return (
    <div>
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
