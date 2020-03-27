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


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd

$("#celular").mask('(00) 0 0000 0000');

var orcamentoApp = new Vue({
    el: '#app-orcamento',
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
			orcamentoApp.enviando = false;
			console.log(error);
		},
		sucesso: function() {
			$("#error-feedback").css('display', 'none');
			$("#success-feedback").slideDown();
			orcamentoApp.enviando = false;
		},
		enviar: function() {
			this.enviando = true;

			var formData = new FormData($('#form-orcamento')[0]);
			var url = "https://joaovinezof.000webhostapp.com/orcamento.php";
			axios.post(url, formData).then(function(response) {
                console.log(response.data);
				if (response.data.success) {
                    orcamentoApp.sucesso();
                    $("#menu-orcamento").click();
				} else {
					orcamentoApp.erro("Erro no servidor");
				}
			}).catch(function(error) {
				orcamentoApp.erro(error);
			});
		}
	}
});
