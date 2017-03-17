var submitBtn = document.getElementById('submit')
var renderArea = document.getElementById('folder-render')
var inputVal = document.getElementById('input-field')
var folderLink = document.querySelector('.folder-click')
var $individualFolder = $('.individual-folder')
var shortUrl = document.querySelector('.short-url')
var $shortUrl = $('.short-url')
var folderName;
var urlName;
var shortUrl;
var idCount = 1;



$(function() {
  axios
    .get("/api/folders/")
    .then((folder)=>{
      folder.data.map(folder => {
        return renderArea.innerHTML = renderArea.innerHTML + `<li><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored nav" id=${idCount}>${folder.name}</button></li>`})
      })
      .then(()=> {
        idCount++
      })
})

function returnUrl(urlN) {

  axios
  .get(`/api/urls/${urlN}`)
  .then(function(response){
      shortUrl.innerHTML =
      response.data.reduce((acc, url) => {
      return `<a href=${url.url} class="url-link">${url.shortUrl}</a>`
    }, "")
  })
}

submitBtn.addEventListener('click', function(){
axios
  .post("/api/folders/", {
    body: inputVal.value
  })
  .then(()=>{
    return renderArea.innerHTML = renderArea.innerHTML + `<li><button id=${idCount}>${inputVal.value}</button></li>`})
    .then(()=> {
      idCount++
    })
})

function renderFolder(array) {
  console.log(array)
  let newAr = array.map(url => {
  return  `<br /><a href=${url.url} class="url-link">${url.shortUrl}</a>`
  })

 $individualFolder.html(`<h2>Folder: </h2>
     <input type="text" id="input-url" placeholder="input a url"></input>
   <input type="submit" class="submit-url"></input> ${newAr}`)
}

folderLink.addEventListener('click', function(e){
  console.log(e)
 folderName = e.target.id;
  axios
  .get(`/api/urls/${folderName}`)
  .then(response => response.data)
  .then(data => renderFolder(data))

  })
// })

// function folderURLs(){
//   folderName = e.target.id;
//
//   axios
//   .get(`/api/urls/${folderName}`)
// }

$individualFolder.on('click', '.submit-url', function(e){
  e.preventDefault()
  urlName = e.target.parentNode.childNodes[2]
  axios
  .post(`/api/urls/${folderName}`, {
    body: `${urlName.value}`
  })
  returnUrl(folderName)
})

$shortUrl.on('click', '.url-link', function(e){
  e.preventDefault()
  let sub = e.target.innerHTML.substring(22)
  axios
    .get(`/${sub}`)
    .then(function(response){
      console.log(response)
    })
})
