// ========== إعدادات Firebase ==========
const firebaseConfig = {
  apiKey: "AIzaSyBupgHPh8rPrvpt9NJGkKx7_4OJW9S8MQo",
  authDomain: "fadfad-7a8e8.firebaseapp.com",
  databaseURL: "https://fadfad-7a8e8-default-rtdb.firebaseio.com",
  projectId: "fadfad-7a8e8",
  storageBucket: "fadfad-7a8e8.firebasestorage.app",
  messagingSenderId: "864033940454",
  appId: "1:864033940454:web:7e67b727f5d625dafcac27"
};

// ========== تهيئة Firebase ==========
firebase.initializeApp(firebaseConfig);

// ========== إنشاء مرجع لقاعدة البيانات (مهم جداً!) ==========
const database = firebase.database();

// ========== رسالة تأكيد في Console ==========
console.log('✅ Firebase متصل بنجاح!');
console.log('📍 Database URL:', firebaseConfig.databaseURL);
console.log('💾 Database جاهز:', database);