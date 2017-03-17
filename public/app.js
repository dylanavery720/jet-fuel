var $submitBtn = $('#submit')
var $renderArea = $('#folder-render')
var $inputVal = $('#input-field')
var $folderLink = $('.folder-click')
var $individualFolder = $('.individual-folder')
var $shortUrl = $('.short-url')
var $sortButton = $('.sort-button')
var folderName;
var urlName;
var sortOrder = false;
var currentUrls;

function renderUrl(folders) {
  console.log(folders)
  let urls = folders.map(url => {
  return  `<br /><a href=${url.id} class="url-link">${url.id}</a>`
  })
 $individualFolder.html(`<h2>Folder: </h2>
     <input type="text" id="input-url" placeholder="input a url"></input>
   <input type="submit" class="submit-url"></input> ${urls}`)
}


function renderFolders(array) {
  array.data.map(folder => {
    return $renderArea.html($renderArea.html() + `<li><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored nav" id=${folder.id}>${folder.name}</button></li>`)})
}

function renderNewFolders(array) {
  var ren = $renderArea.html()
  $renderArea.html("")
  array.data.map(folder => {
    return $renderArea.html(ren + `<li><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored nav" id=${folder.id}>${folder.name}</button></li>`)
  })
}

$(function() {
  axios
    .get("/api/folders/")
    .then((folder)=>{
      renderFolders(folder)
    })
})

$submitBtn.on('click', function(){
axios
  .post("/api/folders/", {
    body: $inputVal.val()
  })
  .then((folder)=>{
    renderNewFolders(folder)
  })
})


$folderLink.on('click', function(e){
 folderName = e.target.id;
  axios
  .get(`/api/urls/${folderName}`)
  .then(response => response.data)
  .then(data => {
    currentUrls = data;
    renderUrl(data)
  })
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
    renderUrl(response.data)
  })
})

$shortUrl.on('click', '.sort-button', function(e){
  // grab urls specific to what is loaded on screen currently so ..
 //
 // on backend if clicks > then clicks i + 1 sort clicks
})

$('.sort-date').on('click', () => {
  // $('.url-container').children().remove()
  if (!sortOrder) {
    renderUrl(downSort('created_at'));
    sortOrder = !sortOrder;
  } else {
    renderUrl(upSort('created_at'));
    sortOrder = !sortOrder;
  }
})

$('.sort-button').on('click', () => {
  // $('.url-container').children().remove()
  if (!sortOrder) {
    renderUrl(downSort('clicks'));
    sortOrder = !sortOrder;
  } else {
    renderUrl(upSort('clicks'));
    sortOrder = !sortOrder;
  }
})

function upSort(prop) {
  return currentUrls.sort((a, b) => a[prop] > b[prop])
}

function downSort(prop) {
  return currentUrls.sort((a, b) => a[prop] < b[prop]);
}
