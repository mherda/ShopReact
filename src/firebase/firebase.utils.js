import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAQc5V58TLP4e_g2YAGAuFEMzeyfCJN5Kk",
    authDomain: "crwn-db-5d917.firebaseapp.com",
    databaseURL: "https://crwn-db-5d917.firebaseio.com",
    projectId: "crwn-db-5d917",
    storageBucket: "crwn-db-5d917.appspot.com",
    messagingSenderId: "613553436678",
    appId: "1:613553436678:web:2e059a2a19dadc90b9eb87"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
}


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc(); // Create an empty doc in the collection and randomly generate its Id.
        batch.set(newDocRef, obj);
    });
    return await batch.commit()
    // it'll return a promise (hence async await). When commit succeeds, it'll resolve a null value.
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items} = doc.data()
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    console.log('transformed collection below:');
    console.log(transformedCollection);
    return transformedCollection.reduce((accumulator, collection ) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

