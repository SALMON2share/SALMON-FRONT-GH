import axios from "axios";
import StorageKeys from "./StorageKeys";
const LINK_PREVIEW =
  "http://api.linkpreview.net/?key=5b34416685a7ce81e7408aa64be981a91c4c742b33c57&q=";
const BASE_API_URL = StorageKeys.BASE_API_URL;
const REGISTER = BASE_API_URL + "user/userRegister.do";
const CREATE_BOARD = BASE_API_URL + "boards/create";
const BOARD = BASE_API_URL + "boards/";
const CREATE_REFERENCE = BASE_API_URL + "references/create/";
const LOGIN = BASE_API_URL + "user/userLogin.do";
const CHANGE_PASSWORD = BASE_API_URL + "users/changePassword";
const VOTE = BASE_API_URL + "votes/create";
const UPLOAD_PHOTO = BASE_API_URL + "users/uploadPhoto";
const SEMANTIC_TAGS = BASE_API_URL + "action/tag.do";
const UPDATE_TITLE = BASE_API_URL + "action/initialTags.do";
const SAVE_TITLE = BASE_API_URL + "action/updateTags.do";
const GET_ANNOTATION = BASE_API_URL + "action/getAnnotation.do";
const SET_ANNOTATION = BASE_API_URL + "action/setAnnotation.do";

export {
  getLinkPreviewData,
  parseUrlData,
  createNewBoardData,
  getBoardsData,
  getBoardResourcesData,
  addNewReferenceData,
  loginData,
  registerData,
  changePasswordData,
  voteData,
  uploadPhotoData,
  getSemanticTags,
  updateSemanticTags,
  getAnnotation,
  setAnnotation
};

function getLinkPreviewData(url) {
  return axios
    .get(LINK_PREVIEW + url)
    .then(response => response.data)
    .catch(error => {
      console.log("error: " + error);
      console.log("error.data" + error.data);
      console.log("error.status" + error.status);
      console.log("error.statusText" + error.statusText);
      console.log("error.headers" + error.headers);
      console.log("error.config" + error.config);
    });
}

function parseUrlData(url) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "JgHJdlmSTEedg5wt6JYnGNAn64zUmfAte8FgtFHV"
      //'x-api-key': 'BaQ58I3piLMBRrPx2WBFMMASMx65XwxI1wqYIGtc'
    }
  };
  return axios
    .get("https://mercury.postlight.com/parser?url=" + url, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + error);
      console.log("error.data: " + error.data);
      console.log("error.status: " + error.status);
      console.log("error.statusText: " + error.statusText);
      console.log("error.headers: " + error.headers);
      console.log("error.config: " + error.config);
      return error;
    });
}

function createNewBoardData(title) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "BaQ58I3piLMBRrPx2WBFMMASMx65XwxI1wqYIGtc"
    }
  };
  var data = {
    title: title
  };
  return axios
    .post(CREATE_BOARD, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}

function getBoardResourcesData(tagCode, uid) {
  return axios
    .get(BOARD + tagCode + "/" + uid)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}

function getBoardsData() {
  return axios
    .get(BOARD)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}

function addNewReferenceData(link, board, userId) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  var data = {
    link: link,
    board: board,
    userId: userId
  };
  return axios
    .post(CREATE_REFERENCE, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}

function loginData(username, userpass) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  var data = {
    username: username,
    userpass: userpass
  };
  return axios
    .post(LOGIN, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response.data));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}
// function loginData(username, userpass) {
//     debugger;
//     var data = {
//         'username': username,
//         'userpass': userpass
//     }
//     return axios.get(LOGIN)
//       .then(response => {
//           // console.log("response: " + JSON.stringify(response));
//           return response
//       })
//       .catch(error => {
//           console.log("error: " + JSON.stringify(error));
//           return error
//       });
// }

function registerData(username, userpass) {
  //debugger;
  var sendData = {
    username: username,
    userpass: userpass
  };
  return axios
    .post(REGISTER, sendData) //"//localhost:8080/user/userRegister.do"
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}

function changePasswordData(userId, oldPassword, newPassword) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  var data = {
    userId: userId,
    oldPassword: oldPassword,
    newPassword: newPassword
  };
  return axios
    .post(CHANGE_PASSWORD, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}

function voteData(referenceId, userId, value) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  var data = {
    referenceId: referenceId,
    userId: userId,
    value: value
  };
  return axios
    .post(VOTE, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}
function getSemanticTags(pdfCore) {
  //debugger;
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
      // "Access-Control-Allow-Origin" : "*",
    }
  };
  var data = {
    pdfCore: pdfCore
  };
  return axios
    .post(SEMANTIC_TAGS, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response.data));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error.response));
      if (error.response.status === 302) {
        return error.response;
      } else if (error.response.status === 503) {
        return error.response;
      }
      return error;
    });
}

function updateSemanticTags(data, isInitial) {
  console.log("data to update", data, isInitial);
  debugger;
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
      // "Access-Control-Allow-Origin" : "*",
    }
  };
  const url = isInitial ? UPDATE_TITLE : SAVE_TITLE;
  if (isInitial) data["pdfCore"] = data["pdfCoreLink"];
  return axios
    .post(url, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}

function uploadPhotoData(userId, photo) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  var data = {
    userId: userId,
    photo: photo
  };
  return axios
    .post(UPLOAD_PHOTO, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}

function setAnnotation(payload) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  var data = {
    pdfCore: payload.pdfCore,
    annotate: JSON.stringify(payload.annotation),
    };
  console.log("data to add in annotation",data)
  return axios
    .post(SET_ANNOTATION, data, axiosConfig)
    .then(response => {
      //console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      //console.log("error: " + JSON.stringify(error));
      return error;
    });
}

function getAnnotation(pdfCoreLink) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  var data = {
    pdfCore: pdfCoreLink,
  };
  return axios
    .post(GET_ANNOTATION,data,axiosConfig)
    .then(response => {
      //console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      //console.log("error: " + JSON.stringify(error));
      return error;
    });
}
