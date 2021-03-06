const debounce = (func, delay = 1000) => {
	let timeoutID;
	return (...args) => {
		if (timeoutID) {
			clearTimeout(timeoutID);
		}
		timeoutID = setTimeout(() => {
			func.apply(null, args);
		}, delay);
	};
};

const address = "https://ajkilmurray.github.io/Filmflix/",
	keyJSON = "apikey.json";
const apiKey = async () => {
	return await fetch(`${address}/${keyJSON}`)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`Status Code ${res.status}`);
			}

			return res.json();
		})
		.then((data) => data.key)
		.catch((err) => console.log(err));
};
