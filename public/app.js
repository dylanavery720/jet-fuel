const $submitBtn = $('#submit')
const $renderArea = $('#folder-render')
const $inputVal = $('#input-field')
const $folderLink = $('.folder-click')
const $individualFolder = $('.individual-folder')
const $sortButton = $('.sort-button')
const $sortDate = $('.sort-date')

let folderName;
let urlName;
let sortOrder = false;
let currentUrls;

const renderUrl = (folders) => {
  currentUrls = folders;
  let urls = folders.map(url => {
  return  `<br /><a href=${url.id} class="url-link">${url.id}</a>`
  })
 $individualFolder.html(` <input type="text" id="input-url" placeholder="input a url"></input>
   <input type="submit" class="submit-url mdl-button mdl-js-button mdl-button--raised mdl-button--accent"></input> ${urls}`)
   showSort()

}


const renderFolders = (array) => {
  array.data.map(folder => {
    return $renderArea.html($renderArea.html() + `<li><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored nav" id=${folder.id}>${folder.name}</button></li>`)})
}

const renderNewFolders = (array) => {
  const ren = $renderArea.html()
  $renderArea.html("")
  array.data.map(folder => {
    return $renderArea.html(ren + `<li><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored nav" id=${folder.id}>${folder.name}</button></li>`)
  })
}

const hideSort = () => {
  $sortButton.hide()
  $sortDate.hide()
}

const showSort = () => {
  $sortButton.show()
  $sortDate.show()
}

$(() => {
  axios
    .get("/api/folders/")
    .then((folder)=>{
      hideSort()
      renderFolders(folder)
    })
})

$submitBtn.on('click', () => {
axios
  .post("/api/folders/", {
    body: $inputVal.val()
  })
  .then((folder)=>{
    renderNewFolders(folder)
  })
})


$folderLink.on('click', (e) => {
 folderName = e.target.id;
  axios
  .get(`/api/urls/${folderName}`)
  .then(response => response.data)
  .then(data => {
    currentUrls = data;
    renderUrl(data)
  })
  })

$individualFolder.on('click', '.submit-url', (e) => {
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

$sortDate.on('click', () => {
  if (!sortOrder) {
    renderUrl(downSort('created_at'));
    sortOrder = !sortOrder;
  } else {
    renderUrl(upSort('created_at'));
    sortOrder = !sortOrder;
  }
})

$sortButton.on('click', () => {
  if (!sortOrder) {
    renderUrl(downSort('clicks'));
    sortOrder = !sortOrder;
  } else {
    renderUrl(upSort('clicks'));
    sortOrder = !sortOrder;
  }
})

const upSort = (prop) => {
  return currentUrls.sort((a, b) => a[prop] > b[prop])
}

const downSort = (prop) => {
  return currentUrls.sort((a, b) => a[prop] < b[prop]);
}
