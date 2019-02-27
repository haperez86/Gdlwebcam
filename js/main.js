(function (){
    "use strict";

      var regalo = document.getElementById('regalo');
      document.addEventListener('DOMContentLoaded', function(){


        if(document.getElementById('mapa') ) {

          var map = L.map('mapa').setView([4.577794, -74.08905], 16);  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
    
          L.marker([4.577794, -74.08905]).addTo(map)
              .bindPopup('GDLWebCamp 2018 <br> Boletos ya disponibles')
              .openPopup()
          
          }


        //Campos Datos Usuario
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        //Campos pases
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias =document.getElementById('pase_dosdias');
        var pase_completo =document.getElementById('pase_completo');

        //Botones y divs
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        //Extras

        var camisas = document.getElementById('camisa_evento');
        var etiquetas = document.getElementById('etiquetas');

        if(document.getElementById('calcular')){

        
        calcular.addEventListener('click', calcularMontos);
        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarMail);

        function validarCampos(){
          if(this.value == ''){
            errorDiv.style.display= 'block';
            errorDiv.innerHTML ="este campo es obligatorio";
            this.style.border = '1px solid red';
            errorDiv.style.border = '1px solid red';
          }else{
            errorDiv.style.display = 'none';
            this.style.border = '1px solid #cccccc';
          }
        }

      function validarMail(){
        if(this.value.indexOf("@") > -1){
          errorDiv.style.display = 'none';
          this.style.border = '1px solid #cccccc';
        }else{
          errorDiv.style.display= 'block';
          errorDiv.innerHTML ="debe tener una @";
          this.style.border = '1px solid red';
          errorDiv.style.border = '1px solid red';
        }
      }


        function calcularMontos(event){
          event.preventDefault();
          if( regalo.value === ''){
            alert("Debes elegir un regalo");
            regalo.focus("");
          }else{
              var boletoDia = parseInt(pase_dia.value, 10)|| 0,
                  boleto2Dias = parseInt(pase_dosdias.value, 10)|| 0,
                  boletoCompleto = parseInt(pase_completo.value,10)||0, 
                  cantCamisas = parseInt(camisas.value,10) ||0,
                  cantEtiquetas = parseInt(etiquetas.value,10)||0;

                  var totalPagar = (boletoDia * 30) + (boleto2Dias * 45) + (boletoCompleto * 50) + 
                  ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);

                  var listadoProductos = [];

                  if(boletoDia >= 1) {
                    listadoProductos.push(boletoDia + " " + 'Pase por día');
                  }if(boleto2Dias >= 1){
                    listadoProductos.push(boleto2Dias + " " +'Pase por dos días');
                  }if(boletoCompleto >= 1){
                    listadoProductos.push(boletoCompleto + " " + 'Pases Completos');
                  }
                  if(cantCamisas >= 1){
                    listadoProductos.push(cantCamisas + " " + 'Camisas');
                  }
                  if(cantEtiquetas >= 1){
                    listadoProductos.push(cantEtiquetas + " " + 'Etiquetas');
                  }
                  lista_productos.style.display = "block";
                  lista_productos.innerHTML ='';
                  for(var i = 0; i < listadoProductos.length; i ++){
                    lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                  }
                  suma.innerHTML = "$" + totalPagar.toFixed(2);

          }
        }

        function mostrarDias(){
          var boletoDia = parseInt(pase_dia.value, 10)|| 0,
          boleto2Dias = parseInt(pase_dosdias.value, 10)|| 0,
          boletoCompleto = parseInt(pase_completo.value,10)||0;

          var diasElegidos = [];

          if(boletoDia > 0 ){
            diasElegidos.push('viernes');
            console.log(diasElegidos);
          }
          if(boleto2Dias > 0 ){
            diasElegidos.push('viernes', 'sabado');
            console.log(diasElegidos);
          }
          if(boletoCompleto > 0){
            diasElegidos.push('viernes', 'sabado', 'domingo');
            console.log(diasElegidos);
          }
          // muestra los selecciona
          for(var i = 0; i < diasElegidos.length; i++ ){
            document.getElementById(diasElegidos[i]).style.display = 'block';
          }
          // los oculta si vuelven a 0
          if(diasElegidos.length == 0 ) {
            var todosDias = document.getElementsByClassName('contenido-dia');
            for(var i = 0; i < todosDias.length; i++) {
               todosDias[i].style.display = 'none';
            }
        }

      }
    } 
        


      }); // DOM CONTENT LOADES 
})();


$(function (){

  //lettering
  $('.nombre-sitio').lettering();

  //Menu fijo
  var windowHeidht = $(window).height();
  var barraAltura = $('.barra').innerHeight();
  
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    
    if(scroll > windowHeidht ){
      $('.barra').addClass('fixed');
      $('body').css({'margin-top': barraAltura + 'px'});
    } else {
      $('.barra').removeClass('fixed');
      $('body').css({'margin-top': '0px'});
    }

  });

  // Menu Responsive

  $('.menu-movil').on('click', function(){
    $('.navegacion-principal').slideToggle();
    
  });

  var breakpoint = 768;
  $(window).resize(function() {
       if($(document).width() >= breakpoint){
         $('.navegacion-principal').show();
       } else {
         $('.navegacion-principal').hide();
       }
  });

  //Programa de Conferencias
  $('.programa-evento .info-curso:first').show();
  $('.menu-programa a:first').addClass('activo');

  $('.menu-programa a').on('click', function(){
    $('.menu-programa a').removeClass('activo');
    $(this).addClass('activo');
    $('.ocultar').fadeOut(1000);
    var enlace = $(this).attr('href');
    $(enlace).fadeIn(1000);
    return false;

  });

  //Animaciones para los Numeros
  $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200);
  $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
  $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1500);
  $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1500);

  //Cuenta Regresiva

  $('.cuenta-regresiva').countdown('2019/04/10 09:00:00', function(event){
    $('#dias').html(event.strftime('%D'));
    $('#horas').html(event.strftime('%H'));
    $('#minutos').html(event.strftime('%M'));
    $('#segundos').html(event.strftime('%S'));
  });

});