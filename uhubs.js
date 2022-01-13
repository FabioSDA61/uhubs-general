


const buckets = document.getElementsByClassName("populate-w-data");


for (let i = 0; i < buckets.length; i++) {
    ['.bucket-name',
    '.bucket-description', 
    '.bucket-duration', 
    '.bucket-order',
    '.bucket-status'].forEach( function (className) {
        console.log(className)
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
            console.log(classNameTaskIteration)
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



