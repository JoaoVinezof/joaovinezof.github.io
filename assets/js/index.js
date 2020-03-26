// Add a request interceptor
axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	NProgress.start();
	return config;
}, function (error) {
	// Do something with request error
	console.error(error)
	return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	// Do something with response data
	NProgress.done();
	return response;
}, function (error) {
	// Do something with response error
	console.error(error)
	return Promise.reject(error);
});

var indexApp = new Vue({
	el: '#contato',
	data: {
		enviando: false
	},
	computed: {
		textoBtn: function() {

			if (this.enviando) {
				return 'Enviando <i class="fas fa-circle-notch fa-spin"></i>';
			} else {
				return "Enviar";
			}

		}
	},
	methods: {
		enviar: function() {
			this.enviando = true;

			var formData = new FormData($('#form-contato')[0]);
			var url = "http://joaovinezof.000webhostapp.com/contato.php";
			axios.post(url, formData).then(function(response) {
				console.log(response);
			}).catch(function(error) {
				console.log(error);
			});
		}
	}
});