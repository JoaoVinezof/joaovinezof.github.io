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
	created: function() {
		this.trocarPagina('index', false, function() {
			$('body').removeClass('d-none');
		});
	},
	data: {
		paginaVirtual: '',
		// hoje: today
	},
	methods: {
		corrigirScroll: function (id) {
			$("#menu-" + id).click();
		},
		trocarPagina: function (pagina, ancora, _callback) {

			if (this.paginaVirtual == pagina) {
				if (ancora != undefined || typeof ancora != 'undefined' || ancora != false) {
					$("#menu-" + ancora).click();
					if (typeof _callback == 'function') _callback();
					return true;
				}
			}

			let pasta = "paginas";
			let extensao = "html";
			let url = pasta + '/' + pagina + '.' + extensao;

			console.log(_callback);

			if ((ancora != undefined || typeof ancora != 'undefined' || ancora != false) && typeof _callback != "boolean" && _callback != false) {

				var callback = function() {
					setTimeout(function() {
						$("#menu-" + ancora).click();
					}, 500);
				}
			} else {
				var callback = false;
			}

			axios.get(url).then(function (response) {
				app.paginaVirtual = pagina;
				$('html, body').scrollTop(0);
				$("#area-pagina").html(response.data);
				$("title").html($("#meta .title").val());
				if (typeof callback == 'function') callback();
				
				if (typeof _callback == 'function') _callback();
			}).catch(function (error) {
				console.log(error);
			});

		}
	}
});