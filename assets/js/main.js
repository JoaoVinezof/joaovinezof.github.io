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

today = yyyy + '-' + mm + '-' + dd;

var app = new Vue({
	el: '#app',
	data: {
		paginaVirtual: 'index',
		// hoje: today
	},
	methods: {
		corrigirScroll: function (id) {
			if (id == 'meuTrabalho') {
				$("#menu-meuTrabalho").click();
			}
		},
		trocarPagina: function (pagina, ancora) {

			let pasta = "paginas";
			let extensao = "html";
			let url = pasta + '/' + pagina + '.' + extensao;

			if (ancora != undefined || typeof ancora != 'undefined') {

				var callback = function() {
					setTimeout(function() {
						$("#menu-" + ancora).click();
					}, 500);
				}
			} else {
				var callback = function() {};
			}

			axios.get(url).then(function (response) {
				app.paginaVirtual = pagina;
				$('html, body').scrollTop(0);
				$("#area-pagina").html(response.data);
				$("title").html($("#meta .title").val());
				callback();
			}).catch(function (error) {
				console.log(error);
			});

		}
	}
});