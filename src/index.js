import './styles.css';
import fetchCountries from "./components/fetchCountries.js"
import template from "./templates/listTemplate.hbs"
import {alert,info} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const input = document.querySelector(".input");
const ul = document.querySelector(".list");

const debaunce = require("lodash.debounce");
const countries = function (e) {
        
    e.target.value.length >= 1 ? fetchCountries(e.target.value)
            .then((array) => {
                if (array.length >= 10) {                  
                    alert("Слишком много вариантов найдено, введите более специфический запрос.")                    
                }
                if (array.length >= 0) {
                    ul.innerHTML = ""
                }
                array.forEach((el) => {
                    if (array.length >= 2 && array.length < 10) {
                        ul.insertAdjacentHTML("beforeend", `<li>${el.name}</li>`);
                    }
                    if (array.length === 1) {
                        ul.innerHTML = "";
                        ul.insertAdjacentHTML("beforeend", template(array));                        
                    }
                })
            })
            .catch(err => { 
                 ul.innerHTML = "";
                info("Такой страны не существует. Введите другое название")
            })            
            : ul.innerHTML = "";            
    }
    input.addEventListener("input", debaunce((e) => {
        countries(e)
    },500) 
    )    