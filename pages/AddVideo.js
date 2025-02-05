import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebaseConfig';
import styles from '../styles/Home.module.css';

const db = getFirestore(app);
const auth = getAuth(app);

const AddVideo = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(auth.currentUser);
  const [platform, setPlatform] = useState('YouTube');
  const [selectedList, setSelectedList] = useState('Favorites');
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchLists();
    }
  }, [user]);

  const fetchLists = async () => {
    try {
      if (!user) return;
      const q = query(
        collection(db, 'videos'),
        where('author', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data().list);
      });
      const uniqueItems = [...new Set(items)].filter((item) => item !== 'Favorites');
      setLists(['Favorites', ...uniqueItems]);
    } catch (error) {
      console.error('Error fetching Firestore data:', error);
    }
  };

  // Verifica si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.push('/'); // Redirige si no hay usuario autenticado
      } else {
        setUser(authUser); 
      }
    });
  
    return () => unsubscribe(); // Limpieza del listener
  }, []);

  const handleAddVideo = async () => {
    if (!title || !url || !selectedList) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const listToUse = newList.trim() !== '' ? newList : selectedList;
      await addDoc(collection(db, 'videos'), {
        title,
        url,
        platform,
        author: user.uid,
        addDate: new Date().toISOString(),
        list: listToUse,
      });
      alert('El video se ha añadido correctamente.');
      router.back();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div>
        <Head>
        <title>Add a video | VideoPlayerWeb</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main className={styles.main}>
            <div className={styles.containerVideoPlayer}>
                <h1 className={styles.titleAdd}>Add Video</h1>
                <input
                    className={styles.inputAdd}
                    type="text"
                    placeholder="Video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className={styles.inputAdd}
                    type="text"
                    placeholder="Video URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <div className={styles.selectContainerAdd}>
                    <label>Platform</label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                        <option value="YouTube">YouTube</option>
                        <option value="Instagram">Instagram</option>
                    </select>

                </div>  
                <div className={styles.selectContainerAdd}>
                    <label>Choose List</label>
                    <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>

                    {lists.map((list, index) => (
                        <option key={index} value={list}>{list}</option>
                    ))}
                    </select>
                </div>
                <input
                    className={styles.inputAdd}
                    type="text"
                    placeholder="New list (optional)"
                    value={newList}
                    onChange={(e) => setNewList(e.target.value)}

                />
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => router.back()}>Go back</button>
                    <button className={styles.button} onClick={handleAddVideo}>Add Video</button>
                </div>
                
            </div>
        </main>


    </div>
  );
};

export default AddVideo;
