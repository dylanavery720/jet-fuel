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




$(function() {
  axios
    .get("/api/folders/")
    .then((folder)=>{
      folder.data.map(folder => {
        return renderArea.innerHTML = renderArea.innerHTML + `<li><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored nav" id=${folder.id}>${folder.name}</button></li>`})
      })
})

submitBtn.addEventListener('click', function(){
axios
  .post("/api/folders/", {
    body: inputVal.value
  })
  .then(()=>{
    folder.data.map(folder => {
      return renderArea.innerHTML = renderArea.innerHTML + `<li><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored nav" id=${folder.id}>${folder.name}</button></li>`})
    })
})

function renderFolder(folders) {
  console.log(folders)
  let urls = folders.map(url => {
  return  `<br /><a href=${url.url} class="url-link">${url.shortUrl}</a>`
  })

 $individualFolder.html(`<h2>Folder: </h2>
     <input type="text" id="input-url" placeholder="input a url"></input>
   <input type="submit" class="submit-url"></input> ${urls}`)
}

folderLink.addEventListener('click', function(e){
 folderName = e.target.id;
  axios
  .get(`/api/urls/${folderName}`)
  .then(response => response.data)
  .then(data => renderFolder(data))

  })

$individualFolder.on('click', '.submit-url', function(e){
  e.preventDefault()
  urlName = $('#input-url').val()
  axios
  .post(`/api/urls/${folderName}`, {
    url: `${urlName}`
  })
  .then((response)=> {
    $('.individual-folder').empty()
    renderFolder(response.data)
  })
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
