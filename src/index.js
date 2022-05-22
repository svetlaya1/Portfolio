import 'normalize.css'
import './styles/main.scss'


// СЛАЙДЕР 

import Swiper, { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

var swiper = new Swiper(".portfolioSwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    modules: [Pagination]
  });



 // ДРОПДАУН

 // Полифилл для метода forEach для NodeList
 if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}


document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
	const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
	const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
	const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
	const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');            
	const button_arrow = document.querySelector('.dropdown__button_arrow');
	dropDownInput.value = dropDownBtn.innerText;
	
	// Клик по кнопке. Открыть/Закрыть select
	dropDownBtn.addEventListener('click', function (e) {
		dropDownList.classList.toggle('dropdown__list--visible');
		button_arrow.classList.toggle('dropdown__button_arrow-active');
		this.classList.add('dropdown__button--active');
	});
	// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
	dropDownListItems.forEach(function (listItem) {
		listItem.addEventListener('click', function (e) {
			e.stopPropagation();
			dropDownBtn.innerText = this.innerText;
			dropDownBtn.focus();
			dropDownInput.value = this.dataset.value;
			dropDownList.classList.remove('dropdown__list--visible');
			button_arrow.classList.remove('dropdown__button_arrow-active');
		});
	});

	// Клик снаружи дропдауна. Закрыть дропдаун
	document.addEventListener('click', function (e) {
		if (e.target !== dropDownBtn) {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});

	// Нажатие на Tab или Escape. Закрыть дропдаун
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Tab' || e.key === 'Escape') {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});
});

 

// КНОПКА ОТПРАВИТЬ С КРАСИВЫМ ХОВЕР

const button = document.getElementById('btn');

button.addEventListener("mousemove", (e)=> {
  
  const posX = e.offsetX==undefined?e.layerX:e.offsetX;
  const posY = e.offsetY==undefined?e.layerY:e.offsetY;
  
  e.target.style.setProperty("--x", `${posX}px`);
  e.target.style.setProperty("--y", `${posY}px`);
  
}); 

const button2 = document.getElementById('btn2');

button2.addEventListener("mousemove", (e)=> {
  
	const posX2 = e.offsetX==undefined?e.layerX:e.offsetX;
	const posY2 = e.offsetY==undefined?e.layerY:e.offsetY;
  
  e.target.style.setProperty("--x2", `${posX2}px`);
  e.target.style.setProperty("--y2", `${posY2}px`);
  
})

// ПОЯВЛЕНИЕ МЕНЮ ПРИ СКРОЛЛЕ ВВЕРХ И СКРЫТИЕ ПРИ СКРОЛЛЕ ВНИЗ

var header = $('.header'),
		scrollPrev = 0;

$(window).scroll(function() {
	var scrolled = $(window).scrollTop();
 
	if ( scrolled > 100 && scrolled > scrollPrev ) {
		header.addClass('out');
	} else {
		header.removeClass('out');
	}
	scrollPrev = scrolled;
});


// ПЛАВНЫЙ ПЕРЕХОД ПО ЯКОРНЫМ ССЫЛКАМ МЕНЮ

$(document).ready(function(){
	$("#menu").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top-90}, 1500);
	});
});


// Pop-up Обсудить проект

$('.open_popup').click(function() {
    var popup_id = $('#' + $(this).attr("rel"));
	var body = document.querySelector("body"); // Переменная для запрета прокрутки страницы при открытии модалки
    $(popup_id).show();
    $('.overlay').show();
	body.style.overflow = 'hidden'; // Запрещаем прокрутку станицы при открытии модалки
})
$('.close, .overlay').click(function() {
	var body = document.querySelector("body"); // Переменная для запрета прокрутки страницы при открытии модалки (повторяется)
    $('.overlay, .popup').hide();
	body.style.overflow = ''; // Разрешаемм прокрутку станицы при закрытии модалки
})


// Pop-up Бургер меню 

$('.open_burger').click(function() {
    var burger_id = $('#' + $(this).attr("rel"));
	var body = document.querySelector("body"); // Переменная для запрета прокрутки страницы при открытии модалки
    $(burger_id).show();
    $('.overlay').show();
	body.style.overflow = 'hidden'; // Запрещаем прокрутку станицы при открытии модалки
})
$('.burger .close, .overlay, .footer__link').click(function() {
	var body = document.querySelector("body"); // Переменная для запрета прокрутки страницы при открытии модалки (повторяется)
    $('.overlay, .burger').hide();
	body.style.overflow = ''; // Разрешаемм прокрутку станицы при закрытии модалки
})



// ОТПРАВКА ФОРМЫ ОБРАТНОЙ СВЯЗИ 
/*
"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidete(form);

		if (error === 0) {
			form.classList.add('_sending'); 
			let response = await fetch('/src/sendmail.php', {
				method: 'POST',
				body: FormData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.resert();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
		else {
			alert('Заполните обязательные поля');
		}
	}


	function formValidete(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.value === "") {
				formAddError(input);
				error++;
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
});*/
