var submitBtn = document.getElementById('submit')
var renderArea = document.getElementById('folder-render')
var inputVal = document.getElementById('input-field')
var folderLink = document.querySelector('.folder-click')

submitBtn.addEventListener('click', function(){
axios
  .post("/api/folders/", {
    body: inputVal.value
  })
  .then(()=>{
    return renderArea.innerHTML = renderArea.innerHTML + `<li><button>${inputVal.value}</button></li>`})
})

folderLink.addEventListener('click', function(){
  axios
  .get('/api/folders/')
  .then(function(response){
    console.log(response);
  })
})
