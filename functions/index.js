const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin:true});
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.addLikes = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const studentGroupQuery = admin.firestore().collection('StudentGroup').where('member', '==', request.body.data.user);
        return studentGroupQuery.get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                response.status(404).send(`StudentGroup not found for user ${request.body.data.user}`);
            } else {
                const groupId = querySnapshot.docs[0].data().groupId;
                const houseId = request.body.data.houseId;
                const houseRef = admin.firestore().collection('House').doc(houseId);

                // Update the house document to add the group ID to the Likes array
                return houseRef.update({
                    'data.Likes': admin.firestore.FieldValue.arrayUnion(groupId)
                }).then(() => {
                    // Add the group ID and house ID to the GroupLikes collection
                    const groupLikesRef = admin.firestore().collection('GroupLikes').doc(`${groupId}_${houseId}`);
                    return groupLikesRef.set({
                        groupId: groupId,
                        houseId: houseId
                    }).then(() => {
                        response.json({data: "Updated Document in Database"});
                    });
                });
            }
        }).catch((error) => {
            response.status(500).send(error);
        });
    });
});



exports.getHouse = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        console.log("The request made it in here");
        let myData = [];
        return admin.firestore().collection('House').get().then((snapshot) => {

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


exports.getImage = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        console.log("The request made it in here");
        let myData = [];
        return admin.firestore().collection('House.image').get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.json({data: {message: 'No data in database'}});
                return;
            }

            snapshot.forEach(doc => {
                console.log(doc.id);
                myData.push(Object.assign(doc.data(), {id: doc.id}));
            });
            console.log(myData);

            // 2. Send data back to client
            response.json({data: myData});
        });
    });
});

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

exports.create = functions.https.onRequest((request, response) => {
    // 1. Receive comment data in here from user POST request
    // 2. Connect to our Firestore database
    cors(request, response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        const newMember = request.body.data.members[0];
        request.body.data.timestamp = currentTime;
        request.body.data.size = 1;

        // Add the document to the "Groups" collection
        return admin.firestore().collection('Groups').add(request.body).then((docRef) => {
            // Create a new collection named "NewMembers" and add the new member along with the document id
            const newMemberData = {
                member: newMember,
                groupId: docRef.id
            };
            return admin.firestore().collection('StudentGroup').add(newMemberData);
        }).then(() => {
            response.json({data: "Saved in the database"});
        }).catch((error) => {
            console.error("Error adding document: ", error);
            response.status(500).send("Error adding document: ", error);
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
        const newMember = request.body.data.member;
        const newSize = request.body.data.size + 1;
        const groupId = request.query.id;
        const currentTime = admin.firestore.Timestamp.now();

        let existingDocRef;

        // Check if member already exists in the "StudentGroup" collection
        return admin.firestore().collection('StudentGroup').where('member', '==', newMember).get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // Member already exists, so remove them from the "members" array of their current group
                    existingDocRef = querySnapshot.docs[0].ref;
                    const existingData = querySnapshot.docs[0].data();
                    return admin.firestore().collection('Groups').doc(existingData.groupId).update({
                        "data.members" : admin.firestore.FieldValue.arrayRemove(newMember),
                        "data.size": admin.firestore.FieldValue.increment(-1)
                    });
                } else {
                    // Member does not exist, so just add them to the "StudentGroup" collection
                    return Promise.resolve();
                }
            })
            .then(() => {
                // Update the "members" array in the "Groups" collection for the specified document id
                return admin.firestore().collection('Groups').doc(groupId).update({
                    "data.members" : admin.firestore.FieldValue.arrayUnion(newMember)
                });
            })
            .then(() => {
                // Add the new member along with the document id to the "StudentGroup" collection
                const newMemberData = {
                    member: newMember,
                    groupId: groupId,
                    timestamp: currentTime
                };
                if (existingDocRef) {
                    // Member already exists, so update the existing document in the "StudentGroup" collection
                    return existingDocRef.update(newMemberData);
                } else {
                    // Member does not exist, so create a new document in the "StudentGroup" collection
                    return admin.firestore().collection('StudentGroup').add(newMemberData);
                }
            })
            .then(() => {
                // Update the "size" field in the "Groups" collection for the specified document id
                return admin.firestore().collection('Groups').doc(groupId).update({
                    "data.size": newSize
                });
            })
            .then(() => {
                response.json({data: "Updated document in database"});
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
                response.status(500).send("Error updating document: ", error);
            });
    });
});


exports.leavegroup = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const memberToRemove = request.body.data.member;
        const groupId = request.query.id;
        const newSize = request.body.data.size -1;

        // Update the "members" array in the "Groups" collection for the specified document id
        return admin.firestore().collection('Groups').doc(groupId).update({
            "data.members" : admin.firestore.FieldValue.arrayRemove(memberToRemove)
        }).then(() => {
            // Delete the member data of the particular member from the "NewMembers" collection
            const newMembersCollection = admin.firestore().collection('StudentGroup');
            const query = newMembersCollection.where("groupId", "==", groupId).where("member", "==", memberToRemove);
            return query.get().then((querySnapshot) => {
                const docToDelete = querySnapshot.docs[0];
                return docToDelete.ref.delete();
            });
        }).then(() => {
            // Update the "size" field in the "Groups" collection for the specified document id
            return admin.firestore().collection('Groups').doc(groupId).update({
                "data.size": newSize
            });
        }).then(() => {
                response.json({data: "Updated document in database"});
            })
            .then(() => {
            response.json({data: "Updated document in database"});
        }).catch((error) => {
            console.error("Error updating document: ", error);
            response.status(500).send("Error updating document: ", error);
        });
    });
});



exports.checkEmail = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        console.log("The request made it in here");
        let myData = [];
        return admin.firestore().collection('Student').orderBy('data.timestamp').get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.json({data: {message : 'No data in database'}});
                return;
            }

            snapshot.forEach(doc => {
                console.log(doc.id);
                const email = doc.data().data.email;
                myData.push(email);
            });
            console.log(myData);

            // 2. Send data back to client
            response.json({data: myData});
        });
    });
});
