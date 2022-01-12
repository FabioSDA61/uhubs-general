


const buckets = document.getElementsByClassName("populate-w-data");
console.log(buckets)

for (let i = 0; i < buckets.length; i++) {
    ['bucket-name', 
    'bucket-description', 
    'bucket-description', 
    'bucket-duration', 
    'bucket-order',
    'bucket-status'].forEach( function (className) {
        console.log(className)
        const bucketName = buckets[i].querySelector(className).innerText;
        buckets[i].querySelector(className + "-input").value = bucketName;
    });
    
  }

