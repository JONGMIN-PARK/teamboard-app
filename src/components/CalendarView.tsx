import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function CalendarView() {
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState("");

  const addEvent = async () => {
    if (!title.trim()) return;
    await addDoc(collection(db, "events"), {
      title,
      date: date.toDateString(),
    });
    setTitle("");
    alert("✅ 일정 등록 완료");
  };

  return (
    <div>
      <h2>📅 일정 관리</h2>
      <Calendar value={date} onChange={setDate} />
      <input placeholder="일정 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addEvent}>추가</button>
    </div>
  );
}
