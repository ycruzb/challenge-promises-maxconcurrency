import fetch from "node-fetch";

function fetchWithMaxConcurrency(urls = [], maxConcurrency = 999999) {
  var index = 0;
  var fetchingCount = 0;
  var results = [];

  return new Promise(function (resolve, reject) {
    function doFetchs() {
      while (index < urls.length && fetchingCount < maxConcurrency) {
		// console.log("fetching: ", index);
        fetch(urls[index])
          .then((response) => response.json())
          .then((json) => {
            results.push(json);
			// console.log("resolving", json);
            fetchingCount--;
            if (results.length < urls.length) {
              doFetchs();
            } else {
              resolve(results);
            }
          });
        index++;
        fetchingCount++;
      }
    }
    doFetchs();
  });
}

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
  "https://jsonplaceholder.typicode.com/posts/6",
  "https://jsonplaceholder.typicode.com/posts/7",
  "https://jsonplaceholder.typicode.com/posts/8",
  "https://jsonplaceholder.typicode.com/posts/9",
  "https://jsonplaceholder.typicode.com/posts/10",
];

// running with .then
/* fetchWithMaxConcurrency(urls, 4).then((result) => {
  console.log(result);
}); */

// running with await
const results = await fetchWithMaxConcurrency(urls, 5);
console.log(results);
