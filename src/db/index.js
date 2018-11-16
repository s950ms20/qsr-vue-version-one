import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'


const config = {
  apiKey: 'AIzaSyAcWhwwLUE5moH6zBtmRh5cDBtK59tURlk',
  authDomain: 'qsr-vue.firebaseapp.com',
  databaseURL: 'https://qsr-vue.firebaseio.com',
  projectId: 'qsr-vue',
  storageBucket: 'qsr-vue.appspot.com',
  messagingSenderId: '563341311329'
};
const firebaseapp = firebase.initializeApp(config)

export default firebase.firestore()

const firestore = firebase.firestore();
const settings = { /* your settings... */
  timestampsInSnapshots: true
};
firestore.settings(settings);

var storage = firebase.storage();
var storageRef = storage.ref();
// var imagesRef = storageRef.child('images/space.jpg')


export {
  storage,
  storageRef,
  // imagesRef

}
