const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin:true});
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

        let existingDocRef;

        // Check if member already exists in the "StudentGroup" collection
        return admin.firestore().collection('StudentGroup').where('member', '==', newMember).get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // Member already exists, so remove them from the "members" array of their current group
                    existingDocRef = querySnapshot.docs[0].ref;
                    const existingData = querySnapshot.docs[0].data();
                    return admin.firestore().collection('Groups').doc(existingData.groupId).update({
                        "data.members" : admin.firestore.FieldValue.arrayRemove(newMember)
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

exports.uploadImage = functions.https.onRequest((request, response) =>{
    cors(request, response,  () => {

        return admin.firestore().collection('Images').add(request.body).then(() => {
            response.json({data: "Saved in the database"});
        });
    });
});

exports.postURL = functions.https.onRequest((request, response) => {

    cors(request, response, () => {

        return admin.firestore().collection('Houses').doc('Houses', 'xcU9PcJAlGgqq5c5uKJu').update(request.body.data.image).then(() => {
            response.json({data: "Updated document in database"});
        });
    });
});
exports.gethouses = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        console.log("The request made it in here");
        const user = request.body.data.user;
        console.log(user);
        let myData = [];

        return admin.firestore().collection('LandlordHouse').where('user', '==', user).get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.json({data: {message : 'No data in database'}});
                return;
            }

            let promises = [];
            snapshot.forEach(doc => {
                console.log(doc.id);
                const houseId = doc.data().houseId;
                promises.push(admin.firestore().collection('House').doc(houseId).get());
            });

            Promise.all(promises).then((houseDocs) => {
                houseDocs.forEach((houseDoc) => {
                    myData.push(Object.assign(houseDoc.data(), {id: houseDoc.id}));
                });
                console.log(myData);

                // 2. Send data back to client
                response.json({data: myData});
            }).catch((error) => {
                console.log("Error getting house documents:", error);
                response.json({data: {message : 'Error getting house documents'}});
            });
        });
    });
});

exports.uploadHouse = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.body);
        const landlord = request.body.data.user;
        const houseData = {
            name: request.body.data.name,
            location: request.body.data.location,
            description: request.body.data.description,
            numBed: request.body.data.numBed,
            numBath: request.body.data.numBath,
            image: request.body.data.image, // Save the image array as a field in the document
            user: landlord
        };
        return admin.firestore().collection('House').add(houseData).then((docRef) => {
            const newHouseData = {
                user: landlord,
                houseId: docRef.id
            };
            return admin.firestore().collection('LandlordHouse').add(newHouseData);
        }).then(() => {
            response.json({data: "Saved in the database"});
        }).catch((error) => {
            console.error("Error adding document: ", error);
            response.status(500).send("Error adding document: ", error);
        })
    });
});



exports.updateImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const id = request.body.data.id;
        const image = request.body.data.image
        console.log("This is the body" + request.body.data);
        return admin.firestore().collection('House').doc(id).update({
            "data.image" : image
        }).then(() => {
            response.json({data: "Updated document in database"});
        });
    });
});

exports.updateLikes = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const id = request.body.data.id;
        const image = request.body.data.image
        console.log("This is the body" + request.body.data);
        return admin.firestore().collection('House').doc(id).update({
            "data.image" : image
        }).then(() => {
            response.json({data: "Updated document in database"});
        });
    });
});
exports.getLikes = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        console.log("The request made it in here");
        const houseID = request.body.data.houseId;
        console.log(houseID);
        let myData = [];

        return admin.firestore().collection('GroupLikes').where('houseId', '==', houseID).get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.json({data: {message : 'No data in database'}});
                return;
            }

            let promises = [];
            snapshot.forEach(doc => {
                console.log(doc.id);
                const groupId = doc.data().groupId;
                promises.push(admin.firestore().collection('House').doc(groupId).get());
            });

            Promise.all(promises).then((groupDocs) => {
                groupDocs.forEach((groupDoc) => {
                    myData.push(Object.assign(groupDoc.data(), {id: groupDocs.id}));
                });
                console.log(myData);

                // 2. Send data back to client
                response.json({data: myData});
            }).catch((error) => {
                console.log("Error getting house documents:", error);
                response.json({data: {message : 'Error getting house documents'}});
            });
        });
    });
});

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

                return houseRef.update({
                    'numlikes': admin.firestore.FieldValue.increment(1)
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

exports.getgrouplikes = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log("The request made it in here");
        console.log(request.body.data.user);
        console.log(request.body);
        let myData = [];
        const studentGroupQuery = admin.firestore().collection('StudentGroup').where('member', '==', request.body.data.user);
        return studentGroupQuery.get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log('No matching documents.');
                response.json({ data: { message: 'No data in database' } });
                return;
            }
            const groupIds = [];
            querySnapshot.forEach(doc => {
                console.log(doc.data().groupId);
                groupIds.push(doc.data().groupId);
            });
            console.log("Group IDs:", groupIds);
            const groupLikesPromises = groupIds.map(groupId => {
                return admin.firestore().collection('GroupLikes').where('groupId', '==', groupId).get().then((groupLikesSnapshot) => {
                    if (groupLikesSnapshot.empty) {
                        console.log('No matching documents.');
                        return;
                    }
                    const houseIds = [];
                    groupLikesSnapshot.forEach(groupLikeDoc => {
                        houseIds.push(groupLikeDoc.data().houseId);
                    });
                    console.log("House IDs:", houseIds);
                    const housePromises = houseIds.map(houseId => {
                        return admin.firestore().collection('House').doc(houseId).get().then((houseDoc) => {
                            if (!houseDoc.exists) {
                                console.log('No such document!');
                                return;
                            }
                            console.log(houseDoc.id, " => ", houseDoc.data());
                            myData.push(houseDoc.data());
                        });
                    });
                    return Promise.all(housePromises);
                });
            });
            return Promise.all(groupLikesPromises).then(() => {
                console.log("Data:", myData);
                response.json({ data: myData });
            });
        })
    });
});


exports.removelike = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const studentGroupQuery = admin.firestore().collection('StudentGroup').where('member', '==', request.body.data.user);
        return studentGroupQuery.get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                response.status(404).send(`StudentGroup not found for user ${request.body.data.user}`);
            } else {
                const groupId = querySnapshot.docs[0].data().groupId;
                const houseId = request.body.data.houseId;
                const houseRef = admin.firestore().collection('House').doc(houseId);

                // Update the house document to remove the group ID from the Likes array
                return houseRef.update({
                    'numlikes': admin.firestore.FieldValue.increment(-1)
                }).then(() => {
                    // Remove the group ID and house ID from the GroupLikes collection
                    const groupLikesRef = admin.firestore().collection('GroupLikes').where('groupId', '==', groupId).where('houseId', '==', houseId);
                    return groupLikesRef.get().then((querySnapshot) => {
                        if (querySnapshot.empty) {
                            response.status(404).send(`GroupLikes not found for group ${groupId} and house ${houseId}`);
                        } else {
                            const docRef = querySnapshot.docs[0].ref;
                            return docRef.delete().then(() => {
                                response.json({data: "Updated Document in Database"});
                            });
                        }
                    });
                });
            }
        }).catch((error) => {
            response.status(500).send(error);
        });
    });
});

exports.getgrouplike = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        let houseIds = [];
        const studentGroupQuery = admin.firestore().collection('StudentGroup').where('member', '==', request.body.data.user);
        return studentGroupQuery.get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log('No matching documents.');
                response.json({ data: { message: 'No data in database' } });
                return;
            }
            const groupIds = [];
            querySnapshot.forEach(doc => {
                groupIds.push(doc.data().groupId);
            });
            const groupLikesPromises = groupIds.map(groupId => {
                return admin.firestore().collection('GroupLikes').where('groupId', '==', groupId).get().then((groupLikesSnapshot) => {
                    if (groupLikesSnapshot.empty) {
                        console.log('No matching documents.');
                        return;
                    }
                    groupLikesSnapshot.forEach(groupLikeDoc => {
                        houseIds.push(groupLikeDoc.data().houseId);
                    });
                });
            });
            return Promise.all(groupLikesPromises).then(() => {
                console.log("House IDs:", houseIds);
                response.json({ data: houseIds });
            });
        })
    });
});
