const searchInput = document.getElementById('search-input');
const suggestionList = document.getElementById('suggestion-list');

searchInput.addEventListener('input', function() {
  const inputValue = this.value.trim();

  // Clear existing suggestions
  suggestionList.innerHTML = '';

  if (inputValue !== '') {
    // Perform your search or API call here to get suggestions
    var suggestions = getSuggestions(inputValue);
    console.log(suggestions);
    console.log(Array.isArray(suggestions));
    getSuggestions(inputValue)
    .then(function(suggestions) {
      console.log(suggestions); // In ra danh sách suggestions
  
      // Truy cập từng phần tử trong danh sách suggestions
      for (var i = 0; i < suggestions.length; i++) {
        var suggestion = suggestions[i];
        console.log(suggestion.name); // In ra tên suggestion
        console.log(suggestion.symbol); // In ra symbol suggestion
        const li = document.createElement('li');
      // li.textContent = `(${suggestion.symbol}) ${suggestion.name}`;

      li.textContent = suggestion.name + ' (' + suggestion.symbol + ')';
      li.setAttribute("onclick", "choose('" + suggestion.symbol + "');");
      suggestionList.appendChild(li);
      }
    })
    .catch(function(error) {
      console.error("Error:", error);
    });

    for (var i = 0; i < suggestions.length; i++) {
      var suggestion = suggestions[i];
      // Thực hiện các xử lý với suggestion
      console.log(suggestion);
    }

    // Show the suggestion list
    suggestionList.style.display = 'block';
  } else {
    // Hide the suggestion list if the input is empty
    suggestionList.style.display = 'none';
  }
});

suggestionList.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    // Set the selected suggestion as the input value
    searchInput.value = event.target.textContent;

    // Hide the suggestion list
    suggestionList.style.display = 'none';
  }
});

document.addEventListener('click', function(event) {
  if (!searchInput.contains(event.target)) {
    // Hide the suggestion list if clicked outside the search input
    suggestionList.style.display = 'none';
  }
});

var dataArr = [];
function getSuggestions(inputValue) {
  return new Promise(function(resolve, reject) {
    //real
    var api = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+inputValue+"&apikey="+apikey;
    //demo
    api = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo";
    $.getJSON(api)
      .done(function(data) {
        var bestMatches = data["bestMatches"];
        var suggestions = [];
        for (var temp in bestMatches) {
          var value = bestMatches[temp];
          suggestions.push({ name: value["2. name"], symbol: value["1. symbol"] });
        }
        resolve(suggestions);
      })
      .fail(function(error) {
        reject(error);
      });
  });
}