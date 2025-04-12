## fetchdata.js
### getPokemon()
#### what is async in javascript?
- async keyword in js before a function makes the function return a promise
- a promise contains both the producing code and calls to the consuming code
	- when the producing code obtains the result, it should call one of the two callbacks
		- success: ```myResolve(result value);```
		- error: ```myRejection(result value);```
	- promise object can be:
		- pending
		- fulfilled
		- rejected
	- promise object supports two properties: **state** and **result**:
		- "pending" => undefined
		- "fulfilled" => result value
		- "rejected" => an error object
- async makes a function return a *Promise*
- await makes a function wait for a *Promise*
#### what is fetch?
- fetch api provides an interface for fetching resources (including across networks).
	- it is the successor of ```XMLHTTPRequest```.
	- uses ```Request``` & ```Response``` objects as well as other objects
		- I added a `method` and a `header`
			- method: specifies which type of request
				- in this case `GET`
			- header: the expected content of the request
- `fetch()` takes on mandatory argument, the path to the resource you want to fetch
	- in this case an api endpoint
- `fetch()` takes returns a promise that must be resolved to a `Response`
### breakdown:
- declare `getPokemon()` as an async function
- build the request object, `req`
- use `fetch()` w/await and pass in `api_url` & `req`
- use `.then` to resolve the promise w/async arrow function declaring response in the function
- handle the success callback checking if the response returns `ok`
	- `response.ok`
	- if ok return the `json()` data using `await response.json()`
	- once the json data is returned pass it into `displayPokemonData` to map the data to html.
- if not ok handle the failure call back
	- return the response as is in this case.
- `catch()` is executed when a promise is outright rejected

### displayPokemon()
- `displayPokemon()` takes data as an argument.
- data will be the response.json() return from `fetch` in `getPokemon()`
- variables will be declared locally to use in the function:
	- table_data: html string
	- id: pokemon id
	- name: pokemon name
	- type: pokemon types
	- height: pokemon height
	- weight: pokemon weight
- loop through the pokemon `data` and access each pokemon json by index
- assign values to the variables created
	- type uses a function `handleTypes()` b/c types can be a list of types, so the type values need to be extracted from the list.

### handleTypes()
- `handleTypes()` takes `types` as an argument.
- `types` will be a list of strings returns from `pokemon[types]` from the api
- to make things fast and easy, if the len of the types list is exactly 1 then types[0] is returned
- else extract the string at each index, add it to `typeStr` and separate using a comma except for the last value in the list.

## filter.js
### filterTable()
- if the table tag cant be found then return an error msg to the user
- grab all rows by tag name
- loop through all rows
- grab each row
	- note: each column has an input field
- create an inner loop to loop through all inputs in input query selector
- grab the text value from the input
	- this is the `filter`
- grab the column from the current row using the index of the current input
	- this is the `cell`
- if the cell exists
	- grab the inner text value from the cell
		- this is the `cellTxt`
	- compare the `cellTxt` to the `filter` using `indexOf()`
			- `indexOf` returns the position of the first occurrence of a sub-string
				- if `cellTxt.indexOf(filter) < 0` then there is no match
		- if there is not a match then set `shouldDisplay` to false
- evaluate if the row should be displayed
- filter function will wait for user to enter a value into the filterable input tags and call filterTable on keystroke using `.addEventListener();`