const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin:true});

admin.initializeApp();



exports.isLoggedIn = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Not logged in");
});

exports.echo = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("The data passed in is " + request.query.data);
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

exports.uploadImage = functions.https.onRequest((request, response) =>{
    cors(request, response,  () => {

        return admin.firestore().collection('Images').add(request.body).then(() => {
            response.json({data: "Saved in the database"});
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
            numlikes: request.body.data.numlikes,
            mRent: request.body.data.mRent,
            area:request.body.data.area,
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
exports.getLikes = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        console.log("The request made it in here");
        console.log()
        const houseId = request.body.data.houseId;
        console.log(houseId);
        let myData = [];

        return admin.firestore().collection('GroupLikes').where('houseId', '==', houseId).get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.json({data: {message : 'No data in database'}});
                return;
            }

            let promises = [];
            snapshot.forEach(doc => {
                console.log(doc.id);
                const groupId = doc.data().groupId;
                promises.push(admin.firestore().collection('Groups').doc(groupId).get());
            });

            Promise.all(promises).then((groupDocs) => {
                groupDocs.forEach((groupDoc) => {
                    myData.push(Object.assign(groupDoc.data(), {id: groupDoc.id}));
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

exports.updatedetails = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const groupId = request.body.data.groupId;
        const owneremail = request.body.data.email;
        const hId = request.body.data.houseId;
        const docRef = `${groupId}_${hId}`;
        console.log(docRef);
                const groupLikesRef = admin.firestore().collection('GroupLikes').doc(docRef);

                return groupLikesRef.update({
                    email: owneremail
                }).then(() => {
                    response.json({ data: "Updated Document in Database" });
                });

    });
});


exports.deleteHouse = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const houseId = request.body.data.houseId;
        console.log(houseId);

        const deleteGLQuery = admin.firestore().collection("GroupLikes").where('houseId', '==', houseId);
        return deleteGLQuery.get().then((querySnapshot) => {

            const deleteBatch = admin.firestore().batch();
            querySnapshot.forEach((doc) => {
                deleteBatch.delete(doc.ref);
            });
            return deleteBatch.commit().then(() => {
                const deleteQuery = admin.firestore().collection("LandlordHouse").where('houseId', '==', houseId);
                return deleteQuery.get().then((querySnapshot) => {
                    console.log(querySnapshot.docs[0].data());
                    const lHouseId = querySnapshot.docs[0].id;
                    const lHouseRef = admin.firestore().collection('LandlordHouse').doc(lHouseId);
                    return lHouseRef.delete().then(() => {
                        admin.firestore().collection("House").doc(houseId).delete().then(() => {
                            response.json({data: "Document successfully deleted"});
                        });
                    });
                });
            });
        });
    });
});



