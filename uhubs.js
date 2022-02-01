

// get all buckets
let buckets = document.getElementsByClassName("populate-w-data");

//If statement to dinstinguish between manager and team member 

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

console.log("{{wf {&quot;path&quot;:&quot;role&quot;,&quot;type&quot;:&quot;Option&quot;\} }}")
if ("{{wf {&quot;path&quot;:&quot;role&quot;,&quot;type&quot;:&quot;Option&quot;\} }}" == "Manager") {

//check if current user is manager
 console.log('current user is manager')


 // Populate the update forms of tasks and buckets with the according data
for (let i = 0; i < buckets.length; i++) {
  ['.bucket-name',
  '.bucket-description', 
  '.bucket-duration', 
  '.bucket-order',
  '.bucket-status'].forEach( function (className) {
      const data = buckets[i].querySelector(className).innerText;
      buckets[i].querySelector(className + "-input").value = data;
  });
  
  for (let a = 1; a < 6; a++) {
      ['.task-name',
      '.task-description', 
      '.task-duration',
      '.task-link',
      '.task-type'].forEach( function (classNameTask) {
          let classNameTaskIteration = classNameTask + "-" + [a].toString()
          let data = "";
          if (classNameTask !='.task-link') {
            data = buckets[i].querySelector(classNameTaskIteration).innerText;
          } else {
            data = buckets[i].querySelector(classNameTaskIteration).href;
          }
          buckets[i].querySelector(classNameTaskIteration + "-input").value = data;
      });
    }
}

// Handle update of buckets and tasks i.e. update tasks and bucket immediately after form submission

function handleUpdate () {

  
    for (let i = 0; i < buckets.length; i++) {

      buckets[i].querySelector(".update-bucket-button").onclick = function(){

        /*
        buckets[i].querySelector('.bucket-update-success-statement').style.display = "none"
        buckets[i].querySelector('.bucket-update-form').style.display = "block"
        */
        
        buckets[i].querySelector('.bucket-name').innerHTML = buckets[i].querySelector('.bucket-name-input').value
        buckets[i].querySelector('.bucket-description').innerHTML = buckets[i].querySelector('.bucket-description-input').value
        buckets[i].querySelector('.bucket-duration').innerHTML = buckets[i].querySelector('.bucket-duration-input').value
        buckets[i].querySelector('.bucket-order').innerHTML = buckets[i].querySelector('.bucket-order-input').value
        buckets[i].querySelector('.bucket-status').innerHTML = buckets[i].querySelector('.bucket-status-input').value
        buckets[i].querySelector('.bucket-color').style.backgroundColor = buckets[i].querySelector('.bucket-color-input').value

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
      }
    }
  };
};

handleUpdate();



//Enable users to reset a previously submitted create_bucket_form and add a infinite amount of buckets in a row without page refreshing




} else {
  

  const handleCreateBucketFormReset = document.getElementById("trigger-reset-create-bucket-form")
  console.log("attached bucket form reset handler")
  handleCreateBucketFormReset.onclick = function () {
    console.log("Click")
    document.getElementById("target-reset-create-bucket-form").click();
    document.getElementById("create_bucket").style.display = "block";
    document.getElementById("bucket-success-statement").style.display = "none";
  }

  console.log('current user is team member')

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




