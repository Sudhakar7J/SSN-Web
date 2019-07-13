let db = firebase.firestore();
filesArray = [];
imageArray = [];
downloadUrls = [];

document.getElementById("post").addEventListener('click',function () {

    downloadUrls=[];
    filesArray = [];
    imageArray = [];
    var storageRef = firebase.storage().ref("post/");
    selectedFiles = document.getElementById("inputFile").files;
    numberOfFiles = selectedFiles.length;
    if( numberOfFiles == 0 )
        getUrls();
    count=0;
    for( i=0; i<numberOfFiles; i++ )
    {
        file = selectedFiles[i];
        fileName = file.name;
        var uploadTask = storageRef.child(fileName).put(file);
        uploadTask.on('state_changed',function(snapshot) {
            //upload under progress
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById("progress").innerHTML=progress+"%";
        }, function (error) {
            /*Handles error in uploading*/
            switch (error.code)
            {
                case 'storage/unauthorized':
                {
                    alert("unauthorised");
                    break;
                }
                case 'storage/canceled':
                {
                    alert("user canceled");
                    break;
                }
                case 'storage/unknown':
                {
                    alert("unknown error");
                    break;
                }
            }
        },function () {
            //upload successful
            count=count+1;
            if( count == numberOfFiles ) {
                getUrls();
            }
        });
    }
});

function getUrls()
{
    var storageRef = firebase.storage().ref("post/");
    selectedFiles = document.getElementById("inputFile").files;
    numberOfFiles = selectedFiles.length;
    if( numberOfFiles == 0 )
        sendData();
    count=0;
    for (i = 0; i < numberOfFiles; i++) {
        file = selectedFiles[i];
        fileName = file.name;
        storageRef.child(fileName).getDownloadURL().then(function (downloadURL) {
            downloadUrls.push(downloadURL);
            alert(downloadURL);
            count=count+1;
            if( count == numberOfFiles )
                sendData();

        });
    }
}
function sendData()
{
    var postTitle = document.getElementById("postTitle").value;
    var postBody = document.getElementById("postBody").value;

    var allYear = document.getElementById("checkBox0").checked;
    var firstYear = document.getElementById("checkBox1").checked || allYear;
    var secondYear = document.getElementById("checkBox2").checked || allYear;
    var thirdYear = document.getElementById("checkBox3").checked || allYear;
    var fourthYear = document.getElementById("checkBox4").checked || allYear;


    department = [];
    if( document.getElementById("dept1").checked )
    {
        department.push("cse");
    }
    if( document.getElementById("dept2").checked )
    {
        department.push("it");
    }
    if( document.getElementById("dept3").checked )
    {
        department.push("mec");
    }
    if( document.getElementById("dept4").checked )
    {
        department.push("bme");
    }
    if( document.getElementById("dept5").checked )
    {
        department.push("ece");
    }
    if( document.getElementById("dept6").checked )
    {
        department.push("eee");
    }
    if( document.getElementById("dept7").checked )
    {
        department.push("civ");
    }
    if( document.getElementById("dept8").checked )
    {
        department.push("che");
    }
    if( document.getElementById("allDept").checked )
    {
        department = ["cse","it","mec","bme","ece","eee","civ","che"]
    }

    selectedFiles = document.getElementById("inputFile").files;
    numberOfFiles = selectedFiles.length;

    for( i=0; i<numberOfFiles; i++ ) {
        file = selectedFiles[i];
        fileName = file.name;
        fileType = file.type;
        if (fileType == "image/png" || fileType == "image/jpg" || fileType == "image/jpeg")
        {
            imageArray.push(downloadUrls[i]);
        }
        else {

            var fileArrayData = new Map();
            fileArrayData.set("name",fileName);
            fileArrayData.set("url",downloadUrls[i]);
            filesArray.push(fileArrayData);
        }
    }
    for(i=0;i<filesArray.length;i++)
        alert(filesArray[i]);
    alert("hello");
    db.collection("post").add({
        title:postTitle,
        description :  postBody,
        author:"dummyid1",
        img_urls : imageArray,
        file_urls : [{name:"iijkjk",url:"hbjbjhbb"}],
        dept: department,
        time :firebase.firestore.FieldValue.serverTimestamp(),
        year : {
            2016 : fourthYear,
            2017 : thirdYear,
            2018 : secondYear,
            2019 : firstYear
        }
    })
        .then(function(docRef) {
            alert("Document written with ID: " + docRef.id);
        })
        .catch(function(error) {
            alert("Error adding document: " + error);
        });
}
/*
db.collection("post").add({
         title:postTitle,
         description :  postBody,
         author:"dummyid1",
         file_urls : filesArray,
         img_urls : imageArray,
         dept: department,
         time :firebase.firestore.FieldValue.serverTimestamp(),
         year : {
             2016 : fourthYear,
             2017 : thirdYear,
             2018 : secondYear,
             2019 : firstYear
         }
     })
         .then(function(docRef) {
             alert("Document written with ID: " + docRef.id);
         })
         .catch(function(error) {
             alert("Error adding document: " + error);
         });
 */
