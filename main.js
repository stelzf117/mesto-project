(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{MN:()=>I,nq:()=>N});var t=document.querySelector(".profile__edit"),n=document.querySelector(".profile__add"),r=document.querySelector(".popup_type_profile"),o=r.querySelector(".popup__form_type_profile"),c=o.querySelector(".popup__text-field_type_name"),u=o.querySelector(".popup__text-field_type_status"),i=document.querySelector(".profile__name"),a=document.querySelector(".profile__description"),l=document.querySelector(".profile__avatar-conainer"),s=document.querySelector(".popup__type_edit-avatar"),d=document.querySelector(".profile__avatar"),f=document.querySelector(".popup__text-field_type_link-picture"),p=document.querySelector(".popup__form_type_avatar"),_=document.querySelector(".elements"),m=document.querySelector("#card-blank").content,y=document.querySelector(".popup_type_add-card"),h=y.querySelector(".popup__form_type_add-card"),v=document.querySelector(".popup__type_view-card"),S=v.querySelector(".popup__picture"),b=v.querySelector(".popup__description"),q=document.querySelector(".popup__type_delete-card"),E=document.querySelector(".popup__button-delete-card"),L="popup_opened";function g(e){"Escape"===e.key&&C(document.querySelector(".".concat(L)))}function k(e){(e.target.classList.contains(L)||e.target.classList.contains("popup__close"))&&C(e.currentTarget)}function x(e){e.classList.add("popup_opened"),document.addEventListener("keydown",g),e.addEventListener("click",k)}function C(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",g),e.removeEventListener("click",k)}function A(e,t,n){e.querySelector(t).textContent=n?"Сохранение...":"Сохранить"}var U=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function B(e,t,n,r,o,c,u){var i=m.querySelector(".element").cloneNode(!0),a=i.querySelector(".element__photo"),l=i.querySelector(".element__name"),s=i.querySelector(".element__trash"),d=i.querySelector(".element__heart"),f=i.querySelector(".element__hearts-count");return a.src=t,a.setAttribute("alt",e),l.textContent=e,a.addEventListener("click",(function(){N(e,t),x(v)})),d.addEventListener("click",(function(){d.classList.contains("element__heart_active")?function(e,t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return U(e)})).catch((function(e){return console.log(e)}))}(u,c).then((function(e){f.textContent=e.likes.length,d.classList.remove("element__heart_active")})):function(e,t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){return U(e)})).catch((function(e){return console.log(e)}))}(u,c).then((function(e){f.textContent=e.likes.length,d.classList.add("element__heart_active")}))})),n.length?(f.textContent=n.length,n.find((function(e){e._id===o&&d.classList.add("element__heart_active")}))):f.textContent="0",r===o&&s.classList.remove("element__trash_disabled"),s.addEventListener("click",(function(){x(q),E.addEventListener("click",(function(){I(u,c,s,E)}))})),i}function w(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){e.querySelector(".".concat(t.id,"-error")).textContent="",t.classList.remove(n)}(e,t,n):function(e,t,n,r){e.querySelector(".".concat(t.id,"-error")).textContent=n,t.classList.add(r)}(e,t,t.validationMessage,n)}function O(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.removeAttribute("disabled"):t.setAttribute("disabled",!0)}function T(e,t){e.querySelector(t).setAttribute("disabled",!0)}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var P,D={baseUrl:"https://nomoreparties.co/v1/plus-cohort-14",headers:{authorization:"a75084ed-65ff-46b2-92ef-67cae42fb5b5","Content-Type":"application/json"}},M={formSelector:".popup__form",inputSelector:".popup__text-field",submitButtonSelector:".popup__button-save",inputErrorClass:"popup__text-field__error"};function N(e,t){S.src=t,S.alt=e,b.textContent=e}function I(e,t,n,r){(function(e,t){return fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return U(e)})).catch((function(e){return console.log(e)}))})(e,t).then((function(){return n.closest(".element").remove()})).then((function(){return C(q)})).then((function(){return r.removeEventListener("click",I)}))}n.addEventListener("click",(function(){x(y)})),l.addEventListener("click",(function(){x(s)})),t.addEventListener("click",(function(){!function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector));t.reset(),c.value=i.textContent,u.value=a.textContent,n.forEach((function(n){w(t,n,e.inputErrorClass)})),T(t,e.submitButtonSelector)}(M,o),x(r)})),p.addEventListener("submit",(function(e){e.preventDefault(),A(p,M.submitButtonSelector,!0),function(e,t){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:t})}).then((function(e){return U(e)})).catch((function(e){return console.log(e)}))}(D,f.value).then((function(){return e=d,t=f.value,void(e.src=t);var e,t})).then((function(){return C(s)})).finally((function(){return A(p,M.submitButtonSelector,!1)}))})),o.addEventListener("submit",(function(e){e.preventDefault(),A(p,M.submitButtonSelector,!0),function(e,t,n){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return U(e)})).catch((function(e){return console.log(e)}))}(D,c.value,u.value).then((function(){return e=c.value,t=u.value,i.textContent=e,void(a.textContent=t);var e,t})).then((function(){return C(r)})).finally((function(){return A(p,M.submitButtonSelector,!1)}))})),h.addEventListener("submit",(function(e){e.preventDefault(),A(p,M.submitButtonSelector,!0),function(e,t,n){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return U(e)})).catch((function(e){return console.log(e)}))}(D,document.querySelector(".popup__text-field_type_picture-name").value,document.querySelector(".popup__text-field_type_picture-link").value).then((function(e){return function(e,t,n){var r=h.querySelector(".popup__text-field_type_picture-name").value,o=h.querySelector(".popup__text-field_type_picture-link").value;_.prepend(B(r,o,0,!0,!0,t,n)),h.reset(),T(h,e.submitButtonSelector)}(M,e._id,D)})).then((function(){return C(y)})).finally((function(){return A(p,M.submitButtonSelector,!1)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t,n,r){var o=Array.from(e.querySelectorAll(t)),c=e.querySelector(n);O(o,c),o.forEach((function(t){t.addEventListener("input",(function(){w(e,t,r),O(o,c)}))}))}(t,e.inputSelector,e.submitButtonSelector,e.inputErrorClass)}))}(M),Promise.all([function(e){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return U(e)})).catch((function(e){return console.log(e)}))}(D),function(e){return fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return U(e)})).catch((function(e){return console.log(e)}))}(D)]).then((function(e){var t,n,r,o,c,u,l,s,f=(s=2,function(e){if(Array.isArray(e))return e}(l=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],u=!0,i=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);u=!0);}catch(e){i=!0,o=e}finally{try{u||null==n.return||n.return()}finally{if(i)throw o}}return c}}(l,s)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}}(l,s)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),p=f[0],m=f[1];t=i,n=p.name,r=a,o=p.about,c=d,u=p.avatar,t.textContent=n,r.textContent=o,c.src=u,P=p._id,m.forEach((function(e){!function(e,t,n,r,o,c,u){_.append(B(e,t,n,r,o,c,u))}(e.name,e.link,e.likes,e.owner._id,P,e._id,D)}))}))})();