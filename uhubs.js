
    const formsToPersist = document.getElementsByClassName("form-to-persist");
    console.log(formsToPersist);
    for (var n = 0; n < formsToPersist.length; n++) {
      const form = formsToPersist[n]
      console.log('on submit set')
      form.onsubmit = function () {
        console.log('reset triggered')
        setTimeout(() => {
          console.log("timeout elapsed")
          form.style.display = "block";
          form.nextElementSibling.style.display = "none";
          console.log(form.nextElementSibling)
        }, 500)
        
      }
    }
    

  
    




//------------------------------------------------ OLD START

/*
auth0EventEmitter.addEventListener("ready", () => {
//start auth0 Eventemitter Wrap  


// get all buckets
const buckets = document.getElementsByClassName("bucket");




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






 // global info 
 let managerBuckets = document.querySelectorAll('.edit-view-bucket');
 let allMembers = [];
  let hiddenEmails = document.querySelectorAll('.team-member-email-hidden')
  for (var i = 0; i < hiddenEmails.length; i++) {
      let email = hiddenEmails[i].innerText;
      allMembers.push(email);
  }



  function assignmentCreateBucket() {
    // bucket state
    const bucket = document.querySelector('.bucket-create-form')
    let assignedList = [];
    let notAssignedList = [];
    for (var i = 0; i < hiddenEmails.length; i++) {
      let email = hiddenEmails[i].innerText;
      notAssignedList.push(email);
  }

    let allMembersContainer = bucket.querySelector('.all-members-container');
    let hiddenInputAssigned = bucket.querySelector('.assigned-input');
    let hiddenInputUnassigned = bucket.querySelector('.unassigned-input');

    hiddenInputAssigned.value = assignedList.join(', ');
    hiddenInputUnassigned.value = notAssignedList.join(', ');

    




    //toggle assign-all button of and delete-all on if all members are already invited
    function toggleAll() {
        if (assignedList.length == allMembers.length) {
            removeAll();
        } else {
            assignAll();
        }
    }

    function createToggleAllButton(){


        let toggleAllButton = bucket.querySelector('.toggle-all-button');
            if (toggleAllButton) { toggleAllButton.remove()};

        let childNode = document.createElement('input');
        childNode.type = "checkbox"
        childNode.className = 'toggle-all-button'
        childNode.checked =  assignedList.length == allMembers.length ? true : false;
        childNode.onclick = function (){ 
            toggleAll();
        }
        bucket.querySelector('.toggle-all-container').appendChild(childNode);
    }
    createToggleAllButton();


    function assignAll() {

            assignedList = [];
            assignedList.push(...allMembers)
            notAssignedList = [];            

            allMembersContainer.innerHTML = '';
            hiddenInputAssigned.value = '';
            hiddenInputUnassigned.value = '';
            hiddenInputAssigned.value = assignedList.join(', ')

            for (let d = 0; d < assignedList.length; d++) {
                createMemberToggler(assignedList[d]);
            }
            createToggleAllButton();
    }

    function removeAll() {

      notAssignedList = [];
      notAssignedList.push(...allMembers)
      assignedList= [];

        allMembersContainer.innerHTML = '';
        hiddenInputAssigned.value = '';
        hiddenInputUnassigned.value = '';
        hiddenInputUnassigned.value = notAssignedList;

        for (let d = 0; d < notAssignedList.length; d++) {
            createMemberToggler(notAssignedList[d]);
            }

        for (let d = 0; d < assignedList.length; d++) {
            createMemberToggler(assignedList[d]);
        }

        createToggleAllButton();
    }



    function updateItem (element, id) {

        let isAssigned = assignedList.includes(element.id);

        if (isAssigned) {
            notAssignedList.push(element.id)
            const index = assignedList.indexOf(element.id);
            if (index > -1) {
                assignedList.splice(index, 1); 
            }
        } else {
            assignedList.push(element.id)
            const index = notAssignedList.indexOf(element.id);
            if (index > -1) {
                notAssignedList.splice(index, 1); 
            }
        }

        hiddenInputAssigned.value = '';
        hiddenInputAssigned.value = assignedList.join(', ');
        hiddenInputUnassigned.value = '';
        hiddenInputUnassigned.value = notAssignedList.join(', ');

    
        createToggleAllButton();                
    }


    function createMemberToggler(email){
        let name = email.split('@')[0];

        let containerChildNode = document.createElement('div');
        containerChildNode.className = name + '-container member-toggler-container';

        let checkboxChildNode = document.createElement('input');
        checkboxChildNode.type = "checkbox"
        checkboxChildNode.className = name
        checkboxChildNode.id = email
        checkboxChildNode.checked =  assignedList.includes(email)
        checkboxChildNode.onclick = function (){ 
            updateItem(this);
        }
        containerChildNode.appendChild(checkboxChildNode);

        let childNodeText = document.createElement('p');   
        childNodeText.className = 'paragraph small no-margin _12px opaque50';                    
        childNodeText.innerText = email
        childNodeText.style.paddingLeft = '10px'
        containerChildNode.appendChild(childNodeText);

        allMembersContainer.appendChild(containerChildNode);
    }

    //initialPopulation


    for (let d = 0; d < assignedList.length; d++) {
        createMemberToggler(assignedList[d]);
    }

    for (let d = 0; d < notAssignedList.length; d++) {
        createMemberToggler(notAssignedList[d]);
    }

}
assignmentCreateBucket();
 
 //enable team member assignment on every bucket    
 for (var n = 0; n < managerBuckets.length; n++) {

  function sortAssignmentsPerBucket() {

         // bucket state
         const bucket = managerBuckets[n]
         let assignedList = [];
         if (bucket.querySelector('.assigned-team-members')) {
          assignedList = bucket.querySelector('.assigned-team-members').innerText ? bucket.querySelector('.assigned-team-members').innerText.split(', ') : [];
        } 
         let notAssignedList = [];
         let assignedMembersContainer = bucket.querySelector('.assigned-members-container');
         let allMembersContainer = bucket.querySelector('.all-members-container');
         let hiddenInputAssigned = bucket.querySelector('.assigned-input');
         let hiddenInputUnassigned = bucket.querySelector('.unassigned-input');
         //add not assignement members to noAssignedList
         for (var a = 0; a < allMembers.length; a++) {
             if (!assignedList.includes(allMembers[a])) {
                 notAssignedList.push(allMembers[a])
             }
         }


     
    

         //toggle assign-all button of and delete-all on if all members are already invited
         function toggleAll() {
             if (assignedList.length == allMembers.length) {
                 removeAll();
             } else {
                 assignAll();
             }
         }

         function createToggleAllButton(){

             let toggleAllButton = bucket.querySelector('.toggle-all-button');
                 if (toggleAllButton) { toggleAllButton.remove()};

             let childNode = document.createElement('input');
             childNode.type = "checkbox"
             childNode.className = 'toggle-all-button'
             childNode.checked =  assignedList.length == allMembers.length ? true : false;
             childNode.onclick = function (){ 
                 toggleAll();
             }
             bucket.querySelector('.toggle-all-container').appendChild(childNode);
         }
         createToggleAllButton();


         function assignAll() {


                assignedList = [];
                 assignedList.push(...allMembers)
                 notAssignedList = [];

                 assignedMembersContainer.innerHTML = '';
                 allMembersContainer.innerHTML = '';

                 hiddenInputAssigned.value = '';
                 hiddenInputAssigned.value = assignedList.join(', ')
                 hiddenInputUnassigned.value = '';
                 hiddenInputUnassigned.value = notAssignedList.join(', ')

                 for (let d = 0; d < assignedList.length; d++) {
                     createMemberToggler(assignedList[d]);
                 }


                 for (var b = 0; b < assignedList.length; b++) {
                     let childNode = document.createElement("p")
                     childNode.className = 'paragraph small no-margin _12px opaque50';
                    childNode.style.marginBottom = '5px';
                     childNode.innerText = assignedList[b]
                     assignedMembersContainer.appendChild(childNode);
                 }

                 createToggleAllButton();
         }

         function removeAll() {

            notAssignedList = [];
             notAssignedList.push(...allMembers)
             assignedList= [];


             bucket.querySelector('.assigned-members-container');

             assignedMembersContainer.innerHTML = '';
             allMembersContainer.innerHTML = '';
    
             hiddenInputAssigned.value = '';
             hiddenInputAssigned.value = assignedList.join(', ')
             hiddenInputUnassigned.value = '';
             hiddenInputUnassigned.value = notAssignedList.join(', ')

             for (let d = 0; d < notAssignedList.length; d++) {
                 createMemberToggler(notAssignedList[d]);
                 }

             for (let d = 0; d < assignedList.length; d++) {
                 createMemberToggler(assignedList[d]);
             }

             for (var b = 0; b < assignedList.length; b++) {
                 let childNode = document.createElement("p")
                 childNode.className = 'paragraph small no-margin _12px opaque50';
                 childNode.style.marginBottom = '5px';
                 childNode.innerText = assignedList[b]
                 assignedMembersContainer.appendChild(childNode);
             }

             createToggleAllButton();
         }



         function updateItem (element, id) {
             let isAssigned = assignedList.includes(element.id);
  
             if (isAssigned) {
                 notAssignedList.push(element.id)
                 const index = assignedList.indexOf(element.id);
                 if (index > -1) {
                     assignedList.splice(index, 1); 
                 }
             } else {
                 assignedList.push(element.id)
                 const index = notAssignedList.indexOf(element.id);
                 if (index > -1) {
                     notAssignedList.splice(index, 1); 
                 }
             }

             assignedMembersContainer.innerHTML = '';

             hiddenInputAssigned.value = '';
             hiddenInputAssigned.value = assignedList.join(', ')
             hiddenInputUnassigned.value = '';
             hiddenInputUnassigned.value = notAssignedList.join(', ')


             for (var i = 0; i < assignedList.length; i++) {
                 let childNode = document.createElement("p")
                 childNode.className = 'paragraph small no-margin _12px opaque50';
                 childNode.style.marginBottom = '5px';
                 childNode.innerText = assignedList[i]
                 assignedMembersContainer.appendChild(childNode);
             }
    
             createToggleAllButton();                
         }


         function createMemberToggler(email){
             let name = email.split('@')[0];

             let containerChildNode = document.createElement('div');
             containerChildNode.className = name + '-container member-toggler-container';

             let checkboxChildNode = document.createElement('input');
             checkboxChildNode.type = "checkbox"
             checkboxChildNode.className = name
             checkboxChildNode.id = email
             checkboxChildNode.checked =  assignedList.includes(email)
             checkboxChildNode.onclick = function (){ 
                 updateItem(this);
             }
             containerChildNode.appendChild(checkboxChildNode);

             let childNodeText = document.createElement('p');   
             childNodeText.className = 'paragraph small no-margin _12px opaque50';                    
             childNodeText.innerText = email
             childNodeText.style.paddingLeft = '10px'
             containerChildNode.appendChild(childNodeText);

             allMembersContainer.appendChild(containerChildNode);
         }

         //initialPopulation

         hiddenInputAssigned.value = assignedList.join(', ');
         hiddenInputUnassigned.value = notAssignedList.join(', ');

         for (let d = 0; d < assignedList.length; d++) {
             createMemberToggler(assignedList[d]);
         }

         for (let d = 0; d < notAssignedList.length; d++) {
             createMemberToggler(notAssignedList[d]);
         }

         for (var b = 0; b < assignedList.length; b++) {
  
             let childNode = document.createElement("p")
             childNode.className = 'paragraph small no-margin _12px opaque50';
              childNode.style.marginBottom = '5px';
             childNode.innerText = assignedList[b]
             assignedMembersContainer.appendChild(childNode);
             
         }   


  
  }
  sortAssignmentsPerBucket();
}

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

          let description = buckets[i].querySelector('.bucket-description')
        
          buckets[i].querySelector('.bucket-name').innerHTML = buckets[i].querySelector('.bucket-name-input').value

          description.innerHTML = buckets[i].querySelector('.bucket-description-input').value
          if (buckets[i].querySelector('.bucket-description-input').value) {
            description.style.display = 'block';
            description.classList.remove('w-dyn-bind-empty', '.w-condition-invisible', '.w-dyn-hide');            
          }


          buckets[i].querySelector('.bucket-duration').innerHTML = buckets[i].querySelector('.bucket-duration-input').value
          if (buckets[i].querySelector('.bucket-duration-input').value) {
            buckets[i].querySelector('.duration-container').style.display = 'flex';
            buckets[i].querySelector('.bucket-duration').style.display = 'block';
            buckets[i].querySelector('.duration-container').classList.remove('w-dyn-bind-empty', '.w-condition-invisible', '.w-dyn-hide');
            buckets[i].querySelector('.bucket-duration').classList.remove('w-dyn-bind-empty', '.w-condition-invisible', '.w-dyn-hide');
            
          }

          buckets[i].querySelector('.bucket-order').innerHTML = buckets[i].querySelector('.bucket-order-input').value
          if (buckets[i].querySelector('.bucket-order-input').value) {
            buckets[i].querySelector('.order-container').style.display = 'flex';
            buckets[i].querySelector('.bucket-order').style.display = 'block';
            buckets[i].querySelector('.order-container').classList.remove('w-dyn-bind-empty', '.w-condition-invisible', '.w-dyn-hide');
            buckets[i].querySelector('.bucket-order').classList.remove('w-dyn-bind-empty', '.w-condition-invisible', '.w-dyn-hide');
          }

          buckets[i].querySelector('.bucket-status').innerHTML = buckets[i].querySelector('.bucket-status-input').value
          buckets[i].querySelector('.bucket-color').style.backgroundColor = buckets[i].querySelector('.bucket-color-input').value
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

*/


