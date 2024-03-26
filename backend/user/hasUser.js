function hasUserAndPassword(arr, username, password) {
	for(let elm of arr) {
		if(elm.username === username && elm.password === password) {
			return true
		}
	}

	return false;
}

function hasUser(arr, username) {
	for (let elm of arr) {
		if (elm.username === username) {
			return true
		}
	}

	return false;
}

function getUser(arr, username) {
	for(let elm of arr) {
		if(elm.username === username)
			return elm;
	}
}

module.exports = { hasUserAndPassword, hasUser, getUser };