
//ADD YOUR FIREBASE LINKS HERE

var firebaseConfig = {
      apiKey: "AIzaSyBSH12-a3sUh8d7LfG3kc8W6-JLoKkfz3w",
      authDomain: "kwitter-f99d4.firebaseapp.com",
      databaseURL: "https://kwitter-f99d4-default-rtdb.firebaseio.com",
      projectId: "kwitter-f99d4",
      storageBucket: "kwitter-f99d4.appspot.com",
      messagingSenderId: "33529130855",
      appId: "1:33529130855:web:106dd7ff1e45547e1bc9c2"
};
firebase.initializeApp(firebaseConfig);

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("trending_rooms").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  row = "<div class= 'room_name' id= " + Room_names + " onclick = 'redirect_room(this.id)' >" + Room_names + "</div><hr>"

                  document.getElementById("trending_rooms").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirect_room(r_name){
      localStorage.setItem("new_room", r_name);
      window.location= "kwitter_page.html";
}

function add_room() {
      new_room_name = document.getElementById("new_room").value;
      localStorage.setItem("new_room", new_room_name);
      firebase.database().ref("/").child(new_room_name).update({
            purpose: "adding new room"
      });
      window.location.replace("kwitter_page.html");
}


username = localStorage.getItem("username");
document.getElementById("welcome").innerHTML = "Welcome " + username + "!";

function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("new_room");
      window.location= "index.html";
}