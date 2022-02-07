auth0EventEmitter.addEventListener("ready", () => {
//start auth0 Eventemitter Wrap  


// get all buckets
let buckets = document.getElementsByClassName("populate-w-data");



//Sort buckets by order Position
function sortBuckets() {
  const bucketWrappers = document.querySelectorAll('.bucketwrapper')

  for (let y = 0; y < bucketWrappers.length; y++) {

      const buckets = bucketWrappers[y].querySelectorAll('.bucket')
      const newClassName = '.bucketwrapper' + y
      bucketWrappers[y].classList.add('bucketwrapper' + y);

      for (let i = 0; i < buckets.length; i++) {
          
      const orderPosition = buckets[i].querySelector('.order-position').innerText;
      buckets[i].setAttribute("orderPosition", orderPosition);
      }
          
      var $wrapper = $(newClassName);

          $wrapper.find('.bucket').sort(function(a, b) {
              return +a.getAttribute('orderPosition') - +b.getAttribute('orderPosition');
          })
          .appendTo($wrapper);
  }

}

sortBuckets();


const isManager = metadata.app.role == 'Manager'? true : false;

if (isManager) {

//check if current user is manager



 // Populate the update forms of tasks and buckets with the according data
for (let i = 0; i < buckets.length; i++) {
  ['.bucket-name',
  '.bucket-description', 
  '.bucket-duration', 
  '.bucket-order',
  '.bucket-status'].forEach( function (className) {
    let element = buckets[i].querySelector(className)
    if (element) {
      const data = element.innerText;
      buckets[i].querySelector(className + "-input").value = data;}
      
  });
  
  for (let a = 1; a < 6; a++) {
      ['.task-name',
      '.task-description', 
      '.task-duration',
      '.task-link',
      '.task-type'].forEach( function (classNameTask) {
        let classNameTaskIteration = classNameTask + "-" + [a].toString()
        let data = "";
        const taskElement = buckets[i].querySelector(classNameTaskIteration)

        if (taskElement) {        
          if (classNameTask !='.task-link') {
            data = buckets[i].querySelector(classNameTaskIteration).innerText;
          } else {
            data = buckets[i].querySelector(classNameTaskIteration).href;
          }
          buckets[i].querySelector(classNameTaskIteration + "-input").value = data
        }
            
      });
    }
}


// Handle update of buckets and tasks i.e. update tasks and bucket immediately after form submission

function handleUpdate () {

  
    for (let i = 0; i < buckets.length; i++) {

      let updateBucketButton = buckets[i].querySelector(".update-bucket-button") 

      if (updateBucketButton) {
        updateBucketButton.onclick = function(){
        
          buckets[i].querySelector('.bucket-name').innerHTML = buckets[i].querySelector('.bucket-name-input').value
          buckets[i].querySelector('.bucket-description').innerHTML = buckets[i].querySelector('.bucket-description-input').value
          buckets[i].querySelector('.bucket-duration').innerHTML = buckets[i].querySelector('.bucket-duration-input').value
          buckets[i].querySelector('.bucket-order').innerHTML = buckets[i].querySelector('.bucket-order-input').value
          buckets[i].querySelector('.bucket-status').innerHTML = buckets[i].querySelector('.bucket-status-input').value
          buckets[i].querySelector('.bucket-color').style.backgroundColor = buckets[i].querySelector('.bucket-color-input').value

          buckets[i].closest('.bucket-info-form').previousSibling.click();
  
      };
  
      for (let a = 1; a < 6; a++) {
        let selector = ".update-task-button-" + [a].toString();
        buckets[i].querySelector(selector).onclick = function(){
          ['.task-name',
            '.task-description', 
            '.task-duration',
            '.task-link',
            '.task-type'].forEach( function (classNameTask) {
                let classNameTaskIteration = classNameTask + "-" + [a].toString()
                let data = buckets[i].querySelector(classNameTaskIteration + "-input").value;
                
                if (classNameTask !='.task-link') {
                  buckets[i].querySelector(classNameTaskIteration).innerText = data;
                } else {
                  buckets[i].querySelector(classNameTaskIteration).href = data;
                }

                
            });
            buckets[i].querySelector(selector).closest('.task-update-form-container').previousSibling.click();
          }
        }

      }

      
  };
};

handleUpdate();



//Enable users to reset a previously submitted create_bucket_form and add a infinite amount of buckets in a row without page refreshing
 

const handleCreateBucketFormReset = document.getElementById("trigger-reset-create-bucket-form")


  handleCreateBucketFormReset.onclick = function () {
    document.getElementById("target-reset-create-bucket-form").click();
    document.getElementById("create_bucket").style.display = "block";
    document.getElementById("bucket-success-statement").style.display = "none";
  }

  document.getElementById("refresh-page-button").onclick = function (){
    location.reload();
  }
  



} else {
  //Else statement for team member code


  

  //Apply confetti interaction effect to all elements with according class
  let confettiButtons = document.getElementsByClassName("confetti-button");

  for (let a = 0; a < confettiButtons.length; a++) {

    
    confettiButtons[a].onclick = function(){

      function random(max){
          return Math.random() * (max - 0) + 0;
      }
  

    
      var c = document.createDocumentFragment();
      for (var i=0; i<100; i++) {
        var styles = 'transform: translate3d(' + (random(500) - 250) + 'px, ' + (random(200) - 150) + 'px, 0) rotate(' + random(360) + 'deg);\
                      background: hsla('+random(360)+',100%,50%,1);\
                      animation: bang 700ms ease-out forwards;\
                      opacity: 0';
          
        var e = document.createElement("i");
        e.style.cssText = styles.toString();
        c.appendChild(e);
    }
    // document.body.appendChild(c);
      $(this).append(c);
    }

    }
  
  
};

//end auth0 Eventemitter Wrap
})




