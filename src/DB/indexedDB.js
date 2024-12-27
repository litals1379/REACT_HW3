export function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("UserImagesDB", 1);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("images")) {
          db.createObjectStore("images", { keyPath: "email" });
        }
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject("Error opening IndexedDB:", event.target.error);
      };
    });
  }
  
  export async function saveImageToDB(email, file) {
    const db = await openDB();
    const reader = new FileReader();
  
    reader.onload = async (event) => {
      const imageData = event.target.result;
      const transaction = db.transaction("images", "readwrite");
      const store = transaction.objectStore("images");
      
      store.put({ email: email, image: imageData });
      
      transaction.oncomplete = () => {
        alert("העלאת תמונה הושלמה!");
      };
    };
  
    reader.readAsDataURL(file); // המרה ל-Base64
  }
  
  export async function loadImageFromDB(email) {
    const db = await openDB();
    const transaction = db.transaction("images", "readonly");
    const store = transaction.objectStore("images");
    const request = store.get(email);
  
    request.onsuccess = (event) => {
      const result = event.target.result;
      if (result) {
        const img = document.getElementById("profile-image");
        img.src = result.image;
      } else {
        console.log("לא נמצאה תמונה עבור משתמש זה.");
      }
    };
  }
  