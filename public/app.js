var submitBtn = document.getElementById('submit')
var renderArea = document.getElementById('folder-render')
var inputVal = document.getElementById('input-field')
var folderLink = document.querySelector('.folder-click')
var individualFolder = document.querySelector('.individual-folder')
var folderName;
var urlName;

submitBtn.addEventListener('click', function(){
axios
  .post("/api/folders/", {
    body: inputVal.value
  })
  .then(()=>{
    return renderArea.innerHTML = renderArea.innerHTML + `<li><button>${inputVal.value}</button></li>`})
})

folderLink.addEventListener('click', function(e){
 folderName = e.target.innerHTML;
  axios
  .get(`/api/folders/${folderName}`)
  .then(function(response){

    // var folderName = response.data.payload[].message;
    individualFolder.innerHTML =
    `<h1>${folderName}</h1>
      <input type="text" id="input-url" placeholder="input a url"></input>
    <input type="submit" class="submit-url"></input>
  <br />`
  })
})

individualFolder.addEventListener('click', function(e){
  urlName = e.target.parentNode.childNodes[2]
  console.log(urlName)
  axios
  .post(`/api/urls/${folderName}`, {
    body: `${urlName.value}`
  })
})
