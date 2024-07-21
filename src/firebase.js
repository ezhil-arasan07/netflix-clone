import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCVc4Et74h8A6OAt-_IKpGa1BaFiFT-wkQ",
  authDomain: "netflix-clone-44888.firebaseapp.com",
  projectId: "netflix-clone-44888",
  storageBucket: "netflix-clone-44888.appspot.com",
  messagingSenderId: "1006815305216",
  appId: "1:1006815305216:web:b7a6e95ef503098ce942e5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async(name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"), {
           uid: user.uid,
           name,
           authProvider: "local",
           email,
       });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};