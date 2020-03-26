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
		erro: function(error) {
			NProgress.done();
			$("#success-feedback").css('display', 'none');
			$("#error-feedback").slideDown();
			indexApp.enviando = false;
			console.log(error);
		},
		sucesso: function() {
			$("#error-feedback").css('display', 'none');
			$("#success-feedback").slideDown();
			indexApp.enviando = false;
		},
		enviar: function() {
			this.enviando = true;

			var formData = new FormData($('#form-contato')[0]);
			var url = "https://joaovinezof.000webhostapp.com/contato.php";
			axios.post(url, formData).then(function(response) {
				if (response.data.success) {
					indexApp.sucesso();
				} else {
					indexApp.erro(error);
				}
			}).catch(function(error) {
				indexApp.erro(error);
			});
		}
	}
});