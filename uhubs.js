

const buckets = document.getElementsByClassName("populate-w-data");


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

  function handleUpdate () {
    
      for (let i = 0; i < buckets.length; i++) {

        buckets[i].querySelector("update-bucket-button").onclick = function(){

        ['.bucket-name',
        '.bucket-description', 
        '.bucket-duration', 
        '.bucket-order',
        '.bucket-status'].forEach( function (className) {
          let data = buckets[i].querySelector(className + "-input").value
          buckets[i].querySelector(className).innerText = data
        });
      };
    };

    for (let a = 1; a < 6; a++) {
      buckets[i].querySelector("update-task-button" + [a].toString()).onclick = function(){
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

