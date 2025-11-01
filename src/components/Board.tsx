import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Board() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any);
    });
    return () => unsub();
  }, []);

  const addPost = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, "posts"), { text, createdAt: Date.now() });
    setText("");
  };

  return (
    <div>
      <h2>🗂️ 진행 공유 게시판</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="내용 입력" />
      <button onClick={addPost}>등록</button>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.text}</li>
        ))}
      </ul>
    </div>
  );
}
