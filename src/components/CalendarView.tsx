import { useState } from "react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function CalendarView() {
  type CalendarValue = CalendarProps["value"];
  const [date, setDate] = useState<CalendarValue>(new Date());
  const [title, setTitle] = useState("");

  const addEvent = async () => {
    if (!title.trim()) return;

    let selectedDate: Date;

    if (Array.isArray(date)) {
      const raw = date[0];
      // 🔹 string 타입일 수도 있으므로 Date로 강제 변환
      selectedDate = raw instanceof Date ? raw : new Date(raw ?? Date.now());
    } else if (date instanceof Date) {
      selectedDate = date;
    } else {
      selectedDate = new Date();
    }

    await addDoc(collection(db, "events"), {
      title,
      date: selectedDate.toDateString(),
    });

    setTitle("");
    alert("✅ 일정 등록 완료");
  };

  const handleChange: CalendarProps["onChange"] = (value) => setDate(value);

  return (
    <div>
      <h2>📅 일정 관리</h2>
      <Calendar value={date} onChange={handleChange} />
      <input
        placeholder="일정 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addEvent}>추가</button>
    </div>
  );
}
