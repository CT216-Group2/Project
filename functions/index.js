const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase again!");
});

exports.isLoggedIn = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Not logged in");
});

exports.echo = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("The data passed in is " + request.query.data);
});


exports.postcomment = functions.https.onRequest((request, response) => {
// 1. Receive comment data in here from user POST request
// 2. Connect to our Firestore database
cors(request, response, () => {
    const currentTime = admin.firestore.Timestamp.now();
    request.body.data.timestamp = currentTime;

    return admin.firestore().collection('comments').add(request.body).then(() => {
        response.json({data: "Saved in the database"});
    });
});
});

exports.poststudent = functions.https.onRequest((request, response) => {
// 1. Receive comment data in here from user POST request
// 2. Connect to our Firestore database
    cors(request, response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        request.body.data.timestamp = currentTime;


        return admin.firestore().collection('Student').add(request.body).then(() => {
            response.json({data: "Saved in the database"});
        });
    });
});

exports.postowner = functions.https.onRequest((request, response) => {
// 1. Receive comment data in here from user POST request
// 2. Connect to our Firestore database
    cors(request, response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        request.body.data.timestamp = currentTime;


        return admin.firestore().collection('Landlord').add(request.body).then(() => {
            response.json({data: "Saved in the database"});
        });
    });
});
exports.getstudents = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        console.log("The request made it in here");
        let myData = [];
        return admin.firestore().collection('Student').get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.json({data: {message : 'No data in database'}});
                return;
            }

            snapshot.forEach(doc => {
                console.log(doc.id);
                myData.push(Object.assign(doc.data(), {id:doc.id}));
            });
            console.log(myData);

            // 2. Send data back to client
            response.json({data: myData});
        });
    });
});


exports.getcomments = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        console.log("The request made it in here");
        let myData = [];
        return admin.firestore().collection('comments').orderBy('data.timestamp').get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.json({data: {message : 'No data in database'}});
                return;
            }

            snapshot.forEach(doc => {
                console.log(doc.id);
                myData.push(Object.assign(doc.data(), {id:doc.id}));
            });
            console.log(myData);

            // 2. Send data back to client
            response.json({data: myData});
        });
    });
});

exports.deletecomment = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        // deletes a comment using the id of the document
        console.log(request.query.id);
        admin.firestore().collection("comments").doc(request.query.id).delete().then(() => {
            response.json({data: "Document successfully deleted"});
        })
    });
});

exports.securefunction =
    functions.https.onCall((data, context) => {
// context.auth contains information about the user, if they are logged in etc.
        if(typeof context.auth === undefined)
        {
// request is made from user that is logged in
            return "User is logged in"
        }
    else
        {
            return "User is not Logged in"
        }
    });


exports.getemails = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
            // 1. Connect to our Firestore database



            console.log("The request made it in here");
            let myData = [];
            return admin.firestore().collection('Student').get().then((snapshot) => {
    
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    response.json({data: {message : 'No data in database'}});
                    return;
                }
    
                snapshot.forEach(doc => {
                    console.log(doc.id);
                    myData.push(doc.data.email);
                });
                console.log(myData);
    
                // 2. Send data back to client
                response.json({data: myData});
            });
        });
    });





    

exports.create = functions.https.onRequest((request, response) => {
// 1. Receive comment data in here from user POST request
// 2. Connect to our Firestore database
    cors(request, response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        request.body.data.timestamp = currentTime;


        return admin.firestore().collection('Groups').add(request.body).then(() => {
            response.json({data: "Saved in the database"});
        });
    });
});


exports.getgroups = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        console.log("The request made it in here");
        let myData = [];
        return admin.firestore().collection('Groups').orderBy('data.timestamp').get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.json({data: {message : 'No data in database'}});
                return;
            }

            snapshot.forEach(doc => {
                console.log(doc.id);
                myData.push(Object.assign(doc.data(), {id:doc.id}));
            });
            console.log(myData);

            // 2. Send data back to client
            response.json({data: myData});
        });
    });
});

exports.joingroup = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log("This is the body" + request.body.data);
        return admin.firestore().collection('Groups').doc(request.query.id).update(request.body.data.members).then(() => {
            response.json({data: "Updated document in database"});
        });
    });
});

exports.leavegroup = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log("This is the body" + request.body.data);
        return admin.firestore().collection('Groups').doc(request.query.id).delete(request.body.data.members).then(() => {
            response.json({data: "Updated document in database"});
        });
    });
});

    