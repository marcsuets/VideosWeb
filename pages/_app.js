// pages/_app.js
import '../styles/globals.css'; // Asegúrate de importar el archivo CSS global

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
