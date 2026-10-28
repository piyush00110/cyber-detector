/** Tiny global toast bus — no provider needed. */

export type ToastKind = "ok" | "err" | "info";

export interface ToastPayload {
  message: string;
  kind: ToastKind;
}

const EVENT = "cyber-toast";

export function toast(message: string, kind: ToastKind = "ok") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ToastPayload>(EVENT, { detail: { message, kind } })
  );
}

export function onToast(handler: (payload: ToastPayload) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<ToastPayload>).detail;
    if (detail?.message) handler(detail);
  };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
