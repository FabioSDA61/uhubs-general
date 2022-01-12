


const buckets = document.getElementsByClassName("populate-w-data");
console.log(buckets)

for (let i = 0; i < buckets.length; i++) {
    const bucketName = buckets[i].querySelector('.bucket-name').innerText
    buckets[i].querySelector('.bucket-name-input').value = bucketName
    
    console.log(bucketName)
  }

