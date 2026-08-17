import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB66QZWEpLCrMQxhOkjmCfTugu7elvz-zc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "teddy-cf444.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "teddy-cf444",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "teddy-cf444.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "51238941602",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:51238941602:web:e9b0a39a21ecdcf3ab78fb",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-5YLP7ZB4LL"
};

// Initialize Firebase (prevent duplicate initialization)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };

export function trackAnalyticsEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  try {
    import('firebase/analytics').then(({ logEvent }) => {
      if (analytics) {
        logEvent(analytics, eventName, eventParams);
      }
    }).catch(() => {});
  } catch (e) {
    // ignore
  }
}