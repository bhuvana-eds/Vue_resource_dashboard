<template>
  <!-- <div>
      <h2>Three Column Table</h2>
      <table class="table_tag">
          <thead>
              <tr>
                  <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
              </tr>
          </thead>
          <tbody id="Employee_Data">
          </tbody>
      </table>
  </div> -->
  <div>
    <div class="div-container">
      <div id="search_container">
          <input type="text" id="search-input" ref="searchInput" placeholder="   Search...">
          <button id="search-button" ref="SearchButton"><span class="custom-icon">&#x1F50D;</span></button>
      </div>
  </div>

  <div class="div-container2">
      <table class="table_tag">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Title</th>
                  <th>State</th>
                  <th>Revision</th>
                  <th style="display: none">fileid</th>
                  <th></th>
              </tr>
          </thead>
          <tbody id="Employee_Data">

          </tbody>
      </table>
  </div>
  </div>
</template>

<style>
.div-container{
width: 100%;
display: flex;
justify-content: center;
}

#search_container{
display: flex;
}

#search_container input[type="text"]{
height:45px;
width: 230px;
border-radius: 15px 0px 0px 15px;
outline: none;
border-color: #005685;
font-size: 16px;
}

      /* Basic button styling */
      #search-button {
        /* background-color: #005685; */
        border: none;
        color: white;
        padding: 10px 20px;
        display: inline-block;
        cursor: pointer;
        border-radius: 0px 15px 15px 0px;
        border-right: 2px solid #005685;
        border-top: 2px solid #005685;
        border-bottom: 2px solid #005685;
        border-left: 0px;
    }

    .custom-icon{
        font-size: 20px;
      }

    body {
      overflow: scroll;
    }
   
    .table_Body_Container {
      width: 100%;
      margin: 0 auto;
      height: 700px;
      overflow: scroll;
    }
   
    .table_tag {
      width: 85%;
      border-collapse: collapse;
      margin: 25px 0;
      /* font-size: 0.9em; */
      min-width: 70%;
      border-radius: 20px 20px 0 0;
      overflow: hidden;
      box-shadow: 0 0 20px rgb(171, 171, 171);
      /* height: 50px; */
    }
   
    .table_tag thead tr {
      /* background-color: #009879; */
      background-color: #005685;
      color: white;
      text-align: left;
      font-size: 18px;
      height: 60px;
    }
   
    .table_tag th,
    .table_tag td {
      padding: 20px 15px;
    }

    .table_tag td{
      color: black;
    }
   
    .table_tag tbody tr {
      border-bottom: 1px solid #dddddd;
      height: 35px;
    }
   
    .table_tag tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }
   
    .table_tag tbody tr:nth-of-type(even) input[type="text"],
    .table_tag tbody tr:nth-of-type(even) select {
      background-color: #f3f3f3;
    }
    .table_tag tbody tr:last-of-type {
      /* border-bottom: 2px solid #009879; */
      border-bottom: 3px solid #005685;
    }
    .table_tag tbody tr:hover {
      /* color: #009879; */
      color: #005685;
      background: #E8F0FE;
    }
    .input_Select {
      min-width: 80px;
      width: 100%;
      padding: 10px;
      border: none;
      outline: none;
    }
   
    tbody tr .input_Box {
      border: none;
      outline: none;
      height: 100%;
      width: 100%;
      padding: 5px;
      font-size: 15px;
    }
    .div-container2 {
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      color: #005685;
    }
   
    .table_tag tbody tr td {
      font-size: 15px;
    }

    /* tr:hover{
      background: #E8F0FE;
    } */
   
    .fileid {
      display: none;
    }
   
    .filename:hover {
      cursor: pointer;
    }

    .downloadFile{
      height: 35px;
      padding: 0 10px 0 10px;
      width: 100px;
      border-radius: 14px;
      color: white;
      background-color: #005685;
      border: none;
      outline: none;
      box-shadow: 5px 5px 5px rgb(217, 215, 215);
      transition: 0.3s ease-in-out;
    }

    .downloadFile:focus{
      box-shadow: 0px 0px 0px rgb(217, 215, 215);
    }
   
</style>

<script>
import {  widget, requirejsPromise } from "@widget-lab/3ddashboard-utils";
console.log("app.vue prog =====>"+widget);
export default {
name: "App",
data() {
  return {
    headers: ["File Name", "Title", "File Id"],
    rows: [
      { fileName: "irish", fileTitle: "wdjwhj", fileId: "sdjsaj" }
    ],
    spaceUrl: "",
    securityContext:"",
    CSRFToken:""
   
  };
},
async mounted(){
  await this.getURL();
  console.log("hey djjdskhdfkj");
  this.getCollaborativeSpace();
  // //console.log("data barthide===>"+this.getRequirementInfo());
  // this.getData();
  // console.log(this.Data);

  this.$refs.SearchButton.addEventListener("click", this.handleInput);
  this.$refs.searchInput.addEventListener("keyup",this.clearTable);
 
 
},
methods:{
  handleInput() {
    var query = document.getElementById("search-input").value;
    this.getData(query);
  },

  clearTable(){
    if(document.getElementById("search-input").value === ""){
      document.getElementById("Employee_Data").innerHTML = "";
    }
  },

   async getURL() {
          console.log("Devika I am coming");
          const i3DXCompassServices = await requirejsPromise("DS/i3DXCompassServices/i3DXCompassServices");
          return new Promise((resolve, reject) => {
              i3DXCompassServices.getServiceUrl({
                  serviceName: "3DSpace",
                  platformId: widget.getValue("x3dPlatformId"),
                  onComplete: URLResult => {
                      console.log("The URL of 3DSpace", URLResult);
                      this.spaceUrl = URLResult;
                      console.log("the 3dspace ul", this.spaceUrl);
                      resolve();
                  },
                  onFailure(error) {
                      console.log("Error while fetching the URL", error);
                      reject();
                  }
              });
          });
    },
    async getCollaborativeSpace() {
          console.log("hey devika I am coming");
          const securityContextURL = "/resources/modeler/pno/person?current=true&select=preferredcredentials&select=collabspaces";
          const WAFData = await requirejsPromise("DS/WAFData/WAFData");
          return new Promise((resolve, reject) => {
              WAFData.authenticatedRequest(this.spaceUrl+securityContextURL, {
                  type: "json",
                  onComplete: secContext => {
                      const role = secContext.preferredcredentials.role.name;
                      const collabspace = secContext.preferredcredentials.collabspace.name;
                      const org = secContext.preferredcredentials.organization.name;
                      this.securityContext = `${role}.${org}.${collabspace}`;
                      console.log("securityContext  ===>"+this.securityContext);
                      resolve();
                  },
                  onFailure(error) {
                      console.log("error while fetching the securtiy context ", error);
                  }
              });
          });
      },
      async getData(query){
        var SUrl = this.spaceUrl;
        document.getElementById("Employee_Data").innerHTML = "";
        const WAFData = await requirejsPromise("DS/WAFData/WAFData");
        //var url = "https://plm2023.eds.com/3dspace/resources/v1/modeler/documents/search?searchStr="+query;
        var url = query==="" ? "":this.spaceUrl+"/resources/v1/modeler/documents/search?searchStr="+query;
        WAFData.authenticatedRequest(url, {
                          method: "GET",
                          headers: {
                              "ENO_CSRF_TOKEN": this.CSRFToken
                          },
                          type: "json",
                          onComplete: function(dataResp) {
                              var Data = dataResp.data;
                              console.log(Data);
                             
                              for(var i=0;i<Data.length;i++){
                                var fileData = Data[i];
                                var fileId = fileData["id"];
                                console.log("fileId  "+fileId);
                                var DataElements = fileData["dataelements"];
                                var title = DataElements["title"];
                                console.log("title  "+title);
                                var state = DataElements["state"];
                                console.log("state  "+state);
                                var fileExtension = DataElements["fileExtension"];
                                console.log("fileExtension  "+fileExtension);
                                var fileRevision = DataElements["revision"];
                                var name = DataElements["name"];
                                console.log("name  "+ name);

                                if(fileExtension === ".pdf"){
                                  var tr = document.createElement("tr");

                                  var fileNametd = document.createElement("td");
                                  fileNametd.innerHTML = name;

                                  var titletd = document.createElement("td");
                                  titletd.innerHTML = title;

                                  var statetd = document.createElement("td");
                                  statetd.innerHTML = state;

                                  var revisiontd = document.createElement("td");
                                  revisiontd.innerHTML = fileRevision;

                                  var fileidtd = document.createElement("td");
                                  fileidtd.innerHTML = fileId;

                                  fileidtd.setAttribute("style","display:none");

                                  var downloadtd = document.createElement("td");
                                  //downloadtd.innerHTML = '<button class="downloadFile">download</button>';
                                  var downloadButton = document.createElement("button");

                                  // Set the class attribute
                                  downloadButton.setAttribute("class", "downloadFile");

                                  // Optionally set other attributes
                                  downloadButton.setAttribute("type", "button");
                                  downloadButton.textContent = "download";
                                  downloadButton.addEventListener("click",event =>{
                                    var fileid = event.target.parentNode.previousElementSibling.innerHTML;
                                    var fileName = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
                                    console.log(fileName);
                                    var csrfTokenUrl = SUrl+"/resources/v1/application/CSRF";
                                    var downloadTicketUrl =  SUrl+"/resources/v1/modeler/documents/" + fileid + "/files/DownloadTicket";
                                    console.log("csrfTokenUrl =====>"+csrfTokenUrl);
                                    // First, obtain CSRF token
                                    WAFData.authenticatedRequest(csrfTokenUrl, {
                                        method: "GET",
                                        type: "json",
                                        onComplete: function(csrfResp) {
                                            var CSRFToken = csrfResp.csrf.value;

                                     
                               
                                            // Then, get download ticket
                                            WAFData.authenticatedRequest(downloadTicketUrl, {
                                                method: "PUT",
                                                headers: {
                                                    "ENO_CSRF_TOKEN": CSRFToken
                                                },
                                                type: "json",
                                                onComplete: function(ticketResp) {
                                                    var ticketURL = ticketResp.data[0].dataelements.ticketURL;
                                                    console.log("Downloading from: " + ticketURL);

                                                    const UrlData = {
                                                      ticketurl:ticketURL,
                                                      filename:fileName
                                                    };

                                                    fetch("https://edstdev.com:8443/download", {
                                                              method: "POST",
                                                              headers: {
                                                                "Content-Type": "application/json"
                                                              },
                                                              body: JSON.stringify(UrlData)
                                                            })
                                                            .then(response => {
                                                              if (!response.ok) {
                                                                throw new Error("Network response was not ok.");
                                                              }
                                                              return response.blob(); // Handle the response as a Blob
                                                            })
                                                            .then(blob => {
                                                              const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
                                                              const a = document.createElement("a"); // Create an anchor element
                                                              a.href = url; // Set the href to the Blob URL
                                                              a.download = fileName+".pdf"; // Set the file name (change 'filename.ext' to desired file name)
                                                              document.body.appendChild(a); // Append the anchor to the body
                                                              a.click(); // Trigger the download
                                                              a.remove(); // Remove the anchor from the DOM
                                                              window.URL.revokeObjectURL(url); // Clean up the URL object
                                                            })
                                                            .catch(error => {
                                                              console.log("Error"+ error);
                                                            });

                                                    // Initiate download
                                                    // var link = document.createElement("a");
                                                    // link.href = ticketURL;
                                                    // link.setAttribute("download", "");
                                                    // document.body.appendChild(link);
                                                    // link.click();
                                                    // document.body.removeChild(link);
                                                },
                                                onFailure: function(error) {
                                                    console.log("Failed to get download ticket: " + error);
                                                }
                                            });
                                        },
                                        onFailure: function(error) {
                                            console.log("Failed to get CSRF token: " + error);
                                        }
                                    });
                                   
                                   
                                  });
                                  downloadtd.appendChild(downloadButton);
                                  tr.appendChild(fileNametd);
                                  tr.appendChild(titletd);
                                  tr.appendChild(statetd);
                                  tr.appendChild(revisiontd);
                                  tr.appendChild(fileidtd);
                                  tr.appendChild(downloadtd);
                                  document.getElementById("Employee_Data").appendChild(tr);
                                }

                              }  
                          },
                                        onFailure: function(error) {
                                            console.log("Failed to get CSRF token: " + error);
                                        }
                                    });
      }

    //   async getData(query){
    //     const WAFData = await requirejsPromise("DS/WAFData/WAFData");
    //     var url = "https://plm2023.eds.com/3dspace/resources/v1/modeler/documents/search?searchStr=*.pdf";
    //     WAFData.authenticatedRequest(url, {
    //                       method: "GET",
    //                       headers: {
    //                           "ENO_CSRF_TOKEN": this.CSRFToken
    //                       },
    //                       type: "json",
    //                       onComplete: function(dataResp) {
    //                           var Data = dataResp.data;
    //                           console.log(Data);
    //                           for(var i=0;i<Data.length;i++){
    //                             var indData = Data[i];
    //                             var fileId = indData["id"];
    //                             var DataElements = indData["dataelements"];
    //                             var title = DataElements["title"];
    //                             var fileName = DataElements["name"];


    //                             var tr = document.createElement("tr");

    //                             var fileNametd = document.createElement("td");
    //                             fileNametd.innerHTML = fileName;

    //                             var titletd = document.createElement("td");
    //                             titletd.innerHTML = title;
                             
    //                                // Add event listener to the title column
    //                             titletd.addEventListener("click", function() {
    //                                 // Add your attribute dynamically here
    //                                 this.setAttribute("data-clicked", "true"); // Example: Adding data-clicked attribute

    //                                 var titleName=this.innerHTML;
    //                                 var fileID = this.nextSibling.innerHTML;

    //                                 var csrfTokenUrl = "https://plm2023.eds.com/3dspace/resources/v1/application/CSRF";
    //                                 var downloadTicketUrl =  "https://plm2023.eds.com/3dspace/resources/v1/modeler/documents/" + fileID + "/files/DownloadTicket";
                               
    //                                 // First, obtain CSRF token
    //                                 WAFData.authenticatedRequest(csrfTokenUrl, {
    //                                     method: "GET",
    //                                     type: "json",
    //                                     onComplete: function(csrfResp) {
    //                                         var CSRFToken = csrfResp.csrf.value;
                               
    //                                         // Then, get download ticket
    //                                         WAFData.authenticatedRequest(downloadTicketUrl, {
    //                                             method: "PUT",
    //                                             headers: {
    //                                                 "ENO_CSRF_TOKEN": CSRFToken
    //                                             },
    //                                             type: "json",
    //                                             onComplete: function(ticketResp) {
    //                                                 var ticketURL = ticketResp.data[0].dataelements.ticketURL;
    //                                                 console.log("Downloading from: " + ticketURL);

    //                                                 const UrlData = {
    //                                                   ticketurl:ticketURL,
    //                                                   filename:titleName
    //                                                 };

    //                                                 fetch("http://localhost:8081/download",{
    //                                                   method: "POST",
    //                                                   headers: {
    //                                                     "Content-Type": "application/json"
    //                                                     // Add any other headers you need, like authorization headers
    //                                                   },
    //                                                   body: JSON.stringify(UrlData)
    //                                                 })
    //                                                 // .then(response => response.json())
    //                                                 .then(data => {
    //                                                   console.log("Success:", data);
    //                                                   alert("File downloaded successfully with watermark");
    //                                                 })
    //                                                 .catch(error => {
    //                                                   console.error("Error:", error);
    //                                                 });

    //                                                 // Initiate download
    //                                                 // var link = document.createElement("a");
    //                                                 // link.href = ticketURL;
    //                                                 // link.setAttribute("download", "");
    //                                                 // document.body.appendChild(link);
    //                                                 // link.click();
    //                                                 // document.body.removeChild(link);
    //                                             },
    //                                             onFailure: function(error) {
    //                                                 console.log("Failed to get download ticket: " + error);
    //                                             }
    //                                         });
    //                                     },
    //                                     onFailure: function(error) {
    //                                         console.log("Failed to get CSRF token: " + error);
    //                                     }
    //                                 });
                                   
    //                             });

    //                             var fileidtd = document.createElement("td");
    //                             fileidtd.innerHTML = fileId;

    //                             tr.appendChild(fileNametd);
    //                             tr.appendChild(titletd);
    //                             tr.appendChild(fileidtd);

    //                             document.getElementById("Employee_Data").appendChild(tr);







    //                           }
                             
    //                           fetch("http://localhost:8081/status")
    //                             .then(response => response.json())
    //                             .then(data => {
    //                               console.log(data); // This will log the array of books to the console
    //                               // Use the data as needed in your frontend application
    //                             })
    //                             .catch(error => console.error("Error fetching data:", error));
    //                         },    
    //                       onFailure: function(error) {
    //                           console.log(error);
    //                       }
    //                   });
    //   },

    //   async downloadFile(fileId) {
    //           console.log("Downloading file with fileId: " + fileId);
    //           const WAFData = await requirejsPromise("DS/WAFData/WAFData");
             
    //       }
         

}
};
</script>