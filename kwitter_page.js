//YOUR FIREBASE LINKS
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

username = localStorage.getItem("username");
new_room_name = localStorage.getItem("new_room");

function send_msg() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(new_room_name).push({
            name: username,
            message: msg,
            likes: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {

      firebase.database().ref("/" + new_room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; 
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; 
                  childData = childSnapshot.val(); 
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        user_name= message_data['name'];
                        message = message_data['message'];
                        likes = message_data['likes'];

                        name_tag = "<h3> " + user_name + " </h3> <br>";

                        message_tag = "<h4>" + message + "</h4> <br>";

                        like_button = "<button class = 'btn btn-primary'  id = " + firebase_message_id + " value = " + likes + " onclick = 'add_likes(this.id)'><span class = 'glyphicon glyphicon-thumbs-up'> </span> Likes : "+ likes + " </button> <hr>";

                        output_data = name_tag + message_tag + like_button;

                        document.getElementById("output").innerHTML += output_data;

                        //End code
                  }
            });
      });
}
getData();


function add_likes(button_id){

      like_count = document.getElementById(button_id).value;

      updated_likes = Number(like_count) + 1;

      firebase.database().ref(new_room_name).child(button_id).update({

            likes: updated_likes
      });

}


/*

*/