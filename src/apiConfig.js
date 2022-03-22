let apiUrl
const apiUrls = {
	production: 'https://contactkeeper223-backend.herokuapp.com',
	development: 'http://localhost:5000',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
