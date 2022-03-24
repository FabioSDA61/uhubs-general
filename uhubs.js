// global info 
let managerBuckets = document.querySelectorAll('.edit-view-bucket');
let previewBuckets = document.querySelectorAll('.preview-view-bucket');
let allMembers = [];
 let hiddenEmails = document.querySelectorAll('.team-member-email-hidden')
 for (var i = 0; i < hiddenEmails.length; i++) {
     let email = hiddenEmails[i].innerText;
     allMembers.push(email);
 }

 let calendars = document.querySelectorAll('.addeventatc');
 for (var i = 0; i < calendars.length; i++) {
  calendars[i].style.zIndex = "93"
}

document.getElementById('trigger-edit-view-button').onclick = function (){ 
  console.log('click')
  document.getElementById('target-edit-view-button').click();
};

// set calendar events all to tomorrow 9am
const startDates = document.getElementsByClassName('addeventatc') 
for (let i = 0; i < startDates.length; i++) {
  const startDate = startDates[i].querySelector('.start') 
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  tomorrow.setHours(9);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0)
  let dateStringWithTime = moment(tomorrow).format('YYYY-MM-DD HH:00:00')
  startDate.innerHTML = dateStringWithTime
}


const buckets = document.getElementsByClassName("bucket");


// Populate the update forms of tasks and buckets with the according data
      function populateForms() {
          for (let i = 0; i < managerBuckets.length; i++) {
        ['.bucket-name',
        '.bucket-description', 
        '.bucket-duration', 
        '.bucket-order',
        '.bucket-status'].forEach( function (className) {
          let element = managerBuckets[i].querySelector(className)
          if (element) {
            const data = element.innerText;
            managerBuckets[i].querySelector(className + "-input").value = data;}
            
        });
        
        for (let a = 1; a < 6; a++) {
            ['.task-name',
            '.task-description', 
            '.task-duration',
            '.task-link',
            '.task-type'].forEach( function (classNameTask) {
              let classNameTaskIteration = classNameTask + "-" + [a].toString()
              let data = "";
              const taskElement = managerBuckets[i].querySelector(classNameTaskIteration)

              if (taskElement) {        
                if (classNameTask !='.task-link') {
                  data = managerBuckets[i].querySelector(classNameTaskIteration).innerText;
                  managerBuckets[i].querySelector(classNameTaskIteration + "-input").value = data
                } else {
                  data = managerBuckets[i].querySelector(classNameTaskIteration).href;
                  
                  if ( !data.includes("home-profile")) {
                    managerBuckets[i].querySelector(classNameTaskIteration + "-input").value = data 
                  } else {
                    data = null
                  }
                 
                }
                
              }
                  
            });
          }
      }
    }
    populateForms();
    
    
    // Handle update of buckets and tasks i.e. update tasks and bucket immediately after form submission
    
    function handleUpdate () {
    
      
        for (let i = 0; i < managerBuckets.length; i++) {

          
    
          let updateBucketButton = managerBuckets[i].querySelector(".update-bucket-button") 
          let bucketId = managerBuckets[i].querySelector(".bucket-id").innerText;
          if (updateBucketButton) {
            updateBucketButton.onclick = function(){
              console.log('bucket_updated')
              let eventProperties = { 
                collection_item: '{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}',
                bucket_id : bucketId
                }
              window.getEventProperties(eventProperties)
                .then(function(response) {
                    amplitude.getInstance().logEvent('bucket_updated', response);
                })

              let description = managerBuckets[i].querySelector('.bucket-description')
            
              managerBuckets[i].querySelector('.bucket-name').innerHTML = managerBuckets[i].querySelector('.bucket-name-input').value
    
              description.innerHTML = managerBuckets[i].querySelector('.bucket-description-input').value
              if (managerBuckets[i].querySelector('.bucket-description-input').value) {
                description.style.display = 'block';
                description.classList.remove('w-dyn-bind-empty', '.w-condition-invisible', '.w-dyn-hide');            
              }
    
    
              managerBuckets[i].querySelector('.bucket-duration').innerHTML = managerBuckets[i].querySelector('.bucket-duration-input').value
              if (managerBuckets[i].querySelector('.bucket-duration-input').value) {
                managerBuckets[i].querySelector('.duration-container').style.display = 'flex';
                managerBuckets[i].querySelector('.bucket-duration').style.display = 'block';
                managerBuckets[i].querySelector('.bucket-duration-empty-statement').style.display = 'none';
                managerBuckets[i].querySelector('.duration-container').classList.remove('w-dyn-bind-empty', '.w-condition-invisible', '.w-dyn-hide');
                managerBuckets[i].querySelector('.bucket-duration').classList.remove('w-dyn-bind-empty', '.w-condition-invisible', '.w-dyn-hide');
                
              }
    
              managerBuckets[i].querySelector('.bucket-order').innerHTML = managerBuckets[i].querySelector('.bucket-order-input').value
              if (managerBuckets[i].querySelector('.bucket-order-input').value) {
                managerBuckets[i].querySelector('.bucket-order-empty-statement').style.display = 'none';
                managerBuckets[i].querySelector('.order-container').style.display = 'flex';
                managerBuckets[i].querySelector('.bucket-order').style.display = 'block';
                managerBuckets[i].querySelector('.order-container').classList.remove('w-dyn-bind-empty', 'w-condition-invisible', 'w-dyn-hide');
                managerBuckets[i].querySelector('.bucket-order').classList.remove('w-dyn-bind-empty', 'w-condition-invisible', 'w-dyn-hide');
              }
    
              managerBuckets[i].querySelector('.bucket-status').innerHTML = managerBuckets[i].querySelector('.bucket-status-input').value
              managerBuckets[i].querySelector('.bucket-color').style.backgroundColor = managerBuckets[i].querySelector('.bucket-color-input').value
              updateBucketButton.closest('.bucket-info-form').previousSibling.click();
      
          };
      
          for (let a = 1; a < 6; a++) {
            let selector = ".update-task-button-" + [a].toString();
            managerBuckets[i].querySelector(selector).onclick = function(){
              console.log(a)
              
              ['.task-name',
                '.task-description', 
                '.task-duration',
                '.task-link'
                ].forEach( function (classNameTask) {
                    let classNameTaskIteration = classNameTask + "-" + [a].toString()
                    console.log(classNameTaskIteration)
                    let data = managerBuckets[i].querySelector(classNameTaskIteration + "-input").value;

                    if (data) {
                      managerBuckets[i].querySelector(classNameTaskIteration).style.display = 'block!important';
                      managerBuckets[i].querySelector(classNameTaskIteration).classList.remove('w-dyn-bind-empty', 'w-condition-invisible', 'w-dyn-hide');
                      }
                    
                    if (classNameTask =='.task-link') {
                      managerBuckets[i].querySelector(classNameTaskIteration).href = data;
                      managerBuckets[i].querySelector(classNameTaskIteration).setAttribute("target", "_blank");
                    } else if (classNameTask =='.task-type') {
                      managerBuckets[i].querySelector(classNameTaskIteration).value = data;
                    } else {
                      managerBuckets[i].querySelector(classNameTaskIteration).innerText = data;
                    }
    
                    
                });
                managerBuckets[i].querySelector(selector).closest('.task-update-form-container').previousSibling.click();
                let eventProperties = { 
                  collection_item: '{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}',
                  bucket_id : bucketId,
                  task_number: [a]
                 }
                window.getEventProperties(eventProperties)
                      .then(function(response) {
                          amplitude.getInstance().logEvent('task_updated', response);
                      })
              }
            }
    
          }
    
          
      };
    };
    handleUpdate();




    
function letFormsPersist() {
  const formsToPersist = document.querySelectorAll(".form-to-persist");
    for (var n = 0; n < formsToPersist.length; n++) {
      const form = formsToPersist[n]
      form.onsubmit = function () {
        setTimeout(() => {
          form.style.display = "block";
          form.nextElementSibling.style.display = "none";
        }, 2000)
        
      }
    }
}

setTimeout(() => {
  letFormsPersist();
}, 2000)





 function assignmentCreateBucket() {
   // bucket state
   const bucket = document.querySelector('.bucket-create-form')
   let assignedList = [];
   let notAssignedList = [];
   for (var i = 0; i < hiddenEmails.length; i++) {
     let email = hiddenEmails[i].innerText;
     assignedList.push(email);
 }

   let allMembersContainer = bucket.querySelector('.all-members-container');
   let hiddenInputAssigned = bucket.querySelector('.assigned-input');
   let hiddenInputUnassigned = bucket.querySelector('.unassigned-input');

   hiddenInputAssigned.value = assignedList.join(',');
   hiddenInputUnassigned.value = notAssignedList.join(',');


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
           hiddenInputAssigned.value = assignedList.join(',')

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
         assignedList = bucket.querySelector('.assigned-team-members').innerText ? bucket.querySelector('.assigned-team-members').innerText.split(',') : [];
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
                hiddenInputAssigned.value = assignedList.join(',')
                hiddenInputUnassigned.value = '';
                hiddenInputUnassigned.value = notAssignedList.join(',')

                for (let d = 0; d < assignedList.length; d++) {
                    createMemberToggler(assignedList[d]);
                }

                /*
                for (var b = 0; b < assignedList.length; b++) {
                    let childNode = document.createElement("p")
                    childNode.className = 'paragraph small no-margin _12px opaque50';
                   childNode.style.marginBottom = '5px';
                    childNode.innerText = assignedList[b]
                    assignedMembersContainer.appendChild(childNode);
                }
                */
                let childNode = document.createElement("p")
                childNode.innerHTML = "All Team Members"
                childNode.className = 'paragraph small no-margin';
                assignedMembersContainer.appendChild(childNode);

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
            hiddenInputAssigned.value = assignedList.join(',')
            hiddenInputUnassigned.value = '';
            hiddenInputUnassigned.value = notAssignedList.join(',')

            for (let d = 0; d < notAssignedList.length; d++) {
                createMemberToggler(notAssignedList[d]);
                }

            for (let d = 0; d < assignedList.length; d++) {
                createMemberToggler(assignedList[d]);
            }
            /*
            for (var b = 0; b < assignedList.length; b++) {
                let childNode = document.createElement("p")
                childNode.className = 'paragraph small no-margin _12px opaque50';
                childNode.style.marginBottom = '5px';
                childNode.innerText = assignedList[b]
                assignedMembersContainer.appendChild(childNode);
            }
            */
            let childNode = document.createElement("p")
            childNode.className = 'paragraph small no-margin _12px opaque50';
            childNode.style.opacity = '0.25'
            childNode.innerHTML = "none"
            assignedMembersContainer.appendChild(childNode);

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
            hiddenInputAssigned.value = assignedList.join(',')
            hiddenInputUnassigned.value = '';
            hiddenInputUnassigned.value = notAssignedList.join(',')


            for (var i = 0; i < assignedList.length; i++) {
                let childNode = document.createElement("p")
                childNode.className = 'paragraph small no-margin';
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
            childNodeText.className = 'paragraph small no-margin';                    
            childNodeText.innerText = email
            childNodeText.style.paddingLeft = '10px'
            containerChildNode.appendChild(childNodeText);

            allMembersContainer.appendChild(containerChildNode);
        }

        //initialPopulation

        hiddenInputAssigned.value = assignedList.join(',');
        hiddenInputUnassigned.value = notAssignedList.join(',');

        for (let d = 0; d < assignedList.length; d++) {
            createMemberToggler(assignedList[d]);
        }

        for (let d = 0; d < notAssignedList.length; d++) {
            createMemberToggler(notAssignedList[d]);
        }

        
        if (assignedList.length == 0) {
          let childNode = document.createElement("p")
        childNode.className = 'paragraph small no-margin';
        childNode.style.opacity = '0.2'
        childNode.innerHTML = "none"
        assignedMembersContainer.appendChild(childNode);

        } else if (assignedList.length == allMembers.length) {
          let childNode = document.createElement("p")
            childNode.innerHTML = "All Team Members"
            childNode.className = 'paragraph small no-margin';
            assignedMembersContainer.appendChild(childNode);
        } else {
          for (let d = 0; d < assignedList.length; d++) {
          let childNode = document.createElement("p")
          childNode.className = 'paragraph small no-margin';
          childNode.style.marginBottom = '5px';
          childNode.innerText = assignedList[d]
          assignedMembersContainer.appendChild(childNode);
          }
        }
            
           
 }
 sortAssignmentsPerBucket();
}

for (var n = 0; n < previewBuckets.length; n++) {

  function previewBucketAssignments() {
 
         // bucket state
         const bucket = previewBuckets[n]
         let assignedList = [];
         if (bucket.querySelector('.assigned-team-members')) {
          assignedList = bucket.querySelector('.assigned-team-members').innerText ? bucket.querySelector('.assigned-team-members').innerText.split(',') : [];
        } 
         let notAssignedList = [];
         let assignedMembersContainer = bucket.querySelector('.assigned-members-container');
         let allMembersContainer = bucket.querySelector('.all-members-container');
         //add not assignement members to noAssignedList
         for (var a = 0; a < allMembers.length; a++) {
             if (!assignedList.includes(allMembers[a])) {
                 notAssignedList.push(allMembers[a])
             }
         }
        
         //initialPopulation

         
         if (assignedList.length == 0) {
           let childNode = document.createElement("p")
         childNode.className = 'paragraph small no-margin';
         childNode.style.opacity = '0.2'
         childNode.innerHTML = "none"
         assignedMembersContainer.appendChild(childNode);
 
         } else if (assignedList.length == allMembers.length) {
           let childNode = document.createElement("p")
             childNode.innerHTML = "All Team Members"
             childNode.className = 'paragraph small no-margin';
             assignedMembersContainer.appendChild(childNode);
         } else {
           for (let d = 0; d < assignedList.length; d++) {
           let childNode = document.createElement("p")
           childNode.className = 'paragraph small no-margin';
           childNode.style.marginBottom = '5px';
           childNode.innerText = assignedList[d]
           assignedMembersContainer.appendChild(childNode);
           }
         }
             
            
  }
  previewBucketAssignments();
 }

