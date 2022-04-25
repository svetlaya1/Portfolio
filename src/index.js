import 'normalize.css'
import './styles/main.scss'

import Swiper, { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

var swiper = new Swiper(".portfolioSwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    modules: [Pagination]
  });



 // 	ДРОПДАУН   
  
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

	// Клик по кнопке. Открыть/Закрыть select
	dropDownBtn.addEventListener('click', function (e) {
		dropDownList.classList.toggle('dropdown__list--visible');
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

// СТРЕЛКА ДЛЯ ДРОПДАУНА

$(".dropdown__button").click(function() {
    $(this).toggleClass("open");
});

// КНОПКА ОТПРАВИТЬ С КРАСИВЫМ ХОВЕР

const button = document.getElementById('btn');

button.addEventListener("mousemove", (e)=> {
  
  const posX = e.pageX - e.target.offsetLeft;
  const posY = e.pageY - e.target.offsetTop;
  
  e.target.style.setProperty("--x", `${posX}px`);
  e.target.style.setProperty("--y", `${posY}px`);
  
})



// ОТПРАВКА ФОРМЫ ОБРАТНОЙ СВЯЗИ 

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
});