"use client";

import { useEffect, useRef, useState } from "react";
import { onToast, type ToastKind } from "@/lib/toast";

interface Item {
  id: number;
  message: string;
  kind: ToastKind;
}

export default function Toaster() {
  const [items, setItems] = useState<Item[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const off = onToast(({ message, kind }) => {
      const id = nextId.current++;
      setItems((prev) => [...prev.slice(-2), { id, message, kind }]);
      const timer = setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
        timers.delete(timer);
      }, 2800);
      timers.add(timer);
    });
    return () => {
      off();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast ${t.kind}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
