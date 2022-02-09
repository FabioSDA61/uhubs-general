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

//--------------------------------------------------------------------- Manager code wrapper

  function assignTeamMembers() {


    // global info 
    const buckets = document.getElementsByClassName('bucket')
    let allMembers = [];
    let hiddenEmails = document.querySelectorAll('.team-member-email-hidden')
    for (var i = 0; i < hiddenEmails.length; i++) {
        allMembers.push(hiddenEmails[i])
    }

    //global functions
    function toggle(el, bool) {
        el.style.display = bool == 'on' ? 'block' : 'none';
    }



    //enable team member assignment on every bucket    
    for (var i = 0; i < buckets.length; i++) {
        console.log(buckets[i].querySelector('.assigned-members-container'));



        // ------------ Bucket Element Start
        function sortAssignmentsForAllBuckets() {
          
        
            // bucket state
            const bucket = buckets[i]
            let assignedList = bucket.querySelector('.assigned-team-members').value ? bucket.querySelector('.assigned-team-members').value.split(', ') : [];
            let notAssignedList = [];
            
        

            // Bucket-scope elements
            const assignAllButton = bucket.querySelector('.assign-all-button');
            const removeAllButton = bucket.querySelector('.remove-all-button');

            const assignedMembersContainer = bucket.querySelector('.assigned-members-container');
            const allMembersContainer = bucket.querySelector('.all-members-container');

            const hiddenInput = bucket.querySelector('.assigned-input');

            

            //add not assignement members to noAssignedList
            for (var a = 0; a < allMembers.length; a++) {
                if (!assignedList.includes(allMembers[a])) {
                    notAssignedList.push(allMembers[a])
                }
            }

            console.log(assignedList);
            console.log(notAssignedList);

            //toggle assign-all button of and delete-all on if all members are already invited
            function toggleManageAllButtons() {
                        
                if (assignedList.length == allMembers.length) {    
                    toggle(removeAllButton, 'on')
                    toggle(assignAllButton, 'off') 
                } else if (assignedList.length == 0) {
                    toggle(removeAllButton, 'off')
                    toggle(assignAllButton, 'on') 
                } else {
                    toggle(assignAllButton, 'off')
                }
            }


            function assignAll() {

                    toggle(assignAllButton, 'off')
                    toggle(removeAllButton, 'on')

                    assignedList.push(...notAssignedList)
                    notAssignedList = [];

                    assignedMembersContainer.innerHTML = '';
                    allMembersContainer.innerHTML = '';
                    hiddenInput.value = '';
                    hiddenInput.value = assignedList.toString();

                    for (let a = 0; a < assignedList.length; a++) {
                        let childNode = document.createElement("p")
                        childNode.style.color = "green"
                        childNode.innerText = assignedList[a]
                        childNode.className = "member assigned"
                        childNode.id = assignedList[a]
                        childNode.onclick = function (){ 
                            updateItem(this);
                        }
                        assignedMembersContainer.appendChild(childNode);
                }
            }

            function removeAll() {
                toggle(removeAllButton, 'off')
                toggle(assignAllButton, 'on')


                notAssignedList.push(...assignedList)
                assignedList= [];

                bucket.querySelector('.assigned-members-container');

                assignedMembersContainer.innerHTML = '';
                allMembersContainer.innerHTML = '';
                hiddenInput.value = '';
                hiddenInput.value = assignedList.toString();

                for (let c = 0; c < notAssignedList.length; c++) {
                    let childNode = document.createElement("p")
                    childNode.style.color = "red"
                    childNode.innerText = notAssignedList[c]
                    childNode.className =  notAssignedList[c].split('@')[0]
                    childNode.onclick = function (){ 
                        updateItem(this);
                    }
                    allMembersContainer.appendChild(childNode);
                }
            }

            function updateItem (element) {

                let isAssigned = assignedList.includes(element.innerText)


                if (isAssigned) {
                    notAssignedList.push(element.innerText)
                    const index = assignedList.indexOf(element.innerText);
                    if (index > -1) {
                        assignedList.splice(index, 1); 
                }
                    bucket.querySelector("." + element.className).style.color = "red";
                } else {
                    assignedList.push(element.innerText)
                    const index = notAssignedList.indexOf(element.innerText);
                    if (index > -1) {
                        notAssignedList.splice(index, 1); 
                    }
                    bucket.querySelector("." + element.className).style.color = "green";
                }
                
                assignedMembersContainer.innerHTML = '';
                //allMembersContainer.innerHTML = '';
                
                hiddenInput.value = '';
                hiddenInput.value = assignedList.toString();
                
                console.log('assigned: ' + assignedList);
                console.log('not assigned: ' + notAssignedList);
                
                for (var i = 0; i < assignedList.length; i++) {
                    let childNode = document.createElement("p")
                    childNode.innerText = assignedList[i]
                    assignedMembersContainer.appendChild(childNode);
                }                
                

            }



            toggleManageAllButtons();

            //initial population with (if existend) assigned members
            for (let d = 0; d < assignedList.length; d++) {
                let childNode = document.createElement("p")
                childNode.style.color = "green"
                childNode.innerText = assignedList[d]
                childNode.className = assignedList[d].split('@')[0]
                childNode.onclick = function (){ 
                    updateItem(this);
                }
                allMembersContainer.appendChild(childNode);
            }

            for (var b = 0; b < assignedList.length; b++) {
                let childNode = document.createElement("p")
                childNode.innerText = assignedList[b]
                assignedMembersContainer.appendChild(childNode);
                
            }

            for (let c = 0; c < notAssignedList.length; c++) {
                let childNode = document.createElement("p")
                childNode.style.color = "red"
                childNode.innerText = notAssignedList[c]
                childNode.className = notAssignedList[c].split('@')[0]
            
                childNode.onclick = function (){ 
                    updateItem(this);
                }
                allMembersContainer.appendChild(childNode);
            }


            removeAllButton.onclick = function (){ 
                removeAll();
            }

            assignAllButton.onclick = function (){ 
                assignAll();
            }


            
        }
        // ------------ Bucket Element End

        sortAssignmentsForAllBuckets();       
        
    }
  }

  assignTeamMembers();

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
          console.log(updateBucketButton.closest('.bucket-info-form'))
          console.log(updateBucketButton.closest('.bucket-info-form').previousSibling)
          updateBucketButton.closest('.bucket-info-form').previousSibling.click();
  
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
  
//-------------------------------------------------------- Manager code wrapper End


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




