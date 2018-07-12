var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';

  if(df){
    df.prompt();
    df.userChoice.then(function(UserResult){
      console.log(UserResult.outcome);
      if(UserResult.outcome === 'dismissed'){
        console.log("dismissed");
      }
      else {
        console.log("accepted");
      }
    });
    df = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
