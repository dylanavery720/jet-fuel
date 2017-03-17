var $submitBtn = $('#submit')
var $renderArea = $('#folder-render')
var $inputVal = $('#input-field')
var $folderLink = $('.folder-click')
var $individualFolder = $('.individual-folder')
var $shortUrl = $('.short-url')
var folderName;
var urlName;





$(function() {
  axios
    .get("/api/folders/")
    .then((folder)=>{
      folder.data.map(folder => {
        return $renderArea.html($renderArea.html() + `<li><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored nav" id=${folder.id}>${folder.name}</button></li>`)})
      })
})

$submitBtn.on('click', function(){
axios
  .post("/api/folders/", {
    body: $inputVal.val()
  })
  .then((folder)=>{
    console.log(folder)
    folder.data.map(folder => {
      var ren = $renderArea.html()
      $renderArea.empty()
      return $renderArea.html(ren + `<li><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored nav" id=${folder.id}>${folder.name}</button></li>`)
    })
  })
})

function renderFolder(folders) {
  console.log(folders)
  let urls = folders.map(url => {
  return  `<br /><a href=${url.id} class="url-link">${url.id}</a>`
  })

 $individualFolder.html(`<h2>Folder: </h2>
     <input type="text" id="input-url" placeholder="input a url"></input>
   <input type="submit" class="submit-url"></input> ${urls}`)
}

$folderLink.on('click', function(e){
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
