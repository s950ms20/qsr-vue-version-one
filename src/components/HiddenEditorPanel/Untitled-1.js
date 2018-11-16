/**
 * Two variables should already be set.
 * dropboxToken = OAuth access token, specific to the user.
 * file = file object selected in the file widget.
 */

// var xhr = new XMLHttpRequest();

// xhr.upload.onprogress = function (evt) {
//     var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
//     // Upload in progress. Do something here with the percent complete.
// };

// xhr.onload = function () {
//     if (xhr.status === 200) {
//         var fileInfo = JSON.parse(xhr.response);
//         // Upload succeeded. Do something here with the file info.
//     } else {
//         var errorMessage = xhr.response || 'Unable to upload file';
//         // Upload failed. Do something here with the error.
//     }
// };

// xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
// xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
// xhr.setRequestHeader('Content-Type', 'application/octet-stream');
// xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
//     path: '/' + file.name,
//     mode: 'add',
//     autorename: true,
//     mute: false
// }));

// xhr.send(file);
// ---------------------------------------------------------
// downloadFile: function(evt, file) {
//   evt.preventDefault();
//   var xhr = new XMLHttpRequest();
//   xhr.responseType = 'arraybuffer';
 
//   xhr.onload = function() {
//     if (xhr.status === 200) {
//       var blob = new Blob([xhr.response], {type: ’application/octet-stream’});
//       FileSaver.saveAs(blob, file.name, true);
//     }
//     else {
//       var errorMessage = xhr.response || 'Unable to download file';
//       // Upload failed. Do something here with the error.
//     }
//   };
 
//   xhr.open('POST', 'https://content.dropboxapi.com/2/files/download');
//   xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
//   xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
//     path: file.path_lower
//   }));
//   xhr.send();
// }