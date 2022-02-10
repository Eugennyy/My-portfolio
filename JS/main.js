'use strict';

const nodes = document.querySelectorAll('.section'),
    array = Array.from(nodes);

let links = document.querySelectorAll('.menu__link'),
    element = array[0],
    id = array.indexOf(element),
    color = 'white';

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

( function setAllListeners() {
    links.forEach(element => {
        element.addEventListener('click', function(event) {
            event.preventDefault();

            id = array.indexOf(document.querySelector(`#${this.getAttribute('href').slice(1)}`));
    
            document.querySelectorAll('.menu__item').forEach(elem => {
                elem.classList.remove('menu__item_active');
            });

            links.forEach(elem => {
                elem.classList.remove('menu__link_active');
            });

            this.closest('.menu__item').classList.add('menu__item_active');

            this.classList.add('menu__link_active');

            if (this.getAttribute('href').slice(1) === 'contacts') {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    block: 'end',
                    behavior: 'smooth'
                });
            }

            else {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                });
            };
        });
    });

    setHoverMenuListener();

    window.addEventListener('wheel', function(event) {
        event.preventDefault();

        if (event.deltaY > 0) {
            id++;
        
            if (id > array.length - 1) id = array.length - 1;
        
            element = array[id];
        
            scrollPage(element);
        }
        
        else {
            id--;
        
            if (id < array.indexOf(array[0])) id = array.indexOf(array[0]);
        
            element = array[id];
        
            scrollPage(element);
        };
 
    }, {passive: false});

    window.addEventListener('scroll', changeMenuStyles);

    document.querySelector('#toProjects').addEventListener('click', function(event) {
        event.preventDefault(); 

        id = array.indexOf(document.querySelector(this.getAttribute('href')));
 
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });

        document.querySelectorAll('.menu__item').forEach(elem => {
            elem.classList.remove('menu__item_active');
        });

        links.forEach(elem => {
            elem.classList.remove('menu__link_active');
        });

        document.querySelector(`a[href="${this.getAttribute('href')}"]`).closest('.menu__item').classList.add('menu__item_active');

        document.querySelector(`a[href="${this.getAttribute('href')}"]`).classList.add('menu__link_active');
    });

    document.querySelector('#sendMessage').addEventListener('click', function(event) {
        event.preventDefault();

        validateName(document.querySelector('#name').value);

        validateEmail(document.querySelector('#email').value);

        validateMessage(document.querySelector('#message').value);

        if (validateName(document.querySelector('#name').value) === true && validateEmail(document.querySelector('#email').value) === true && validateMessage(document.querySelector('#message').value) === true) {
            sendMessage();
        }; 
    });

} () );

function scrollPage(element) {
    if (element.id === 'contacts') {
        element.scrollIntoView({
            "block": "end",
            "behavior": "smooth"
        });
    }

    else {
        element.scrollIntoView({
            "block": "start",
            "behavior": "smooth"
        });
    };

    document.querySelectorAll('.menu__item').forEach(elem => {
        elem.classList.remove('menu__item_active');
    });

    links.forEach(elem => {
        elem.classList.remove('menu__link_active');
    });

    document.querySelector(`a[href='#${element.id}'`).closest('.menu__item').classList.add('menu__item_active');

    document.querySelector(`a[href='#${element.id}'`).classList.add('menu__link_active');
};

function changeMenuStyles() {
    switch(true) {
        case (document.elementFromPoint(0, array[1].getBoundingClientRect().top) === array[1]):
            document.querySelector('.line').style.backgroundColor = '#010101';
            document.querySelector('.menu').style.backgroundColor = '#010101';

            document.querySelectorAll('.menu__item').forEach(element => {
                element.style.backgroundColor = '#010101';
            });

            document.querySelectorAll('.menu__link').forEach(element => {
                element.style.cssText = 'border: 1px solid #010101; color: #010101';
            });

            color = 'black';

            setHoverMenuListener();

            break;

        case (document.elementFromPoint(0, array[2].getBoundingClientRect().top) === array[2]):
            document.querySelector('.line').style.backgroundColor = '#010101';
            document.querySelector('.menu').style.backgroundColor = '#010101';

            document.querySelectorAll('.menu__item').forEach(element => {
                element.style.backgroundColor = '#010101';
            });

            document.querySelectorAll('.menu__link').forEach(element => {
                element.style.cssText = 'border: 1px solid #010101; color: #010101';
            });

            color = 'black';

            setHoverMenuListener();

            break;

        default:
            document.querySelector('.line').style.backgroundColor = 'white';
            document.querySelector('.menu').style.backgroundColor = 'white';

            document.querySelectorAll('.menu__item').forEach(element => {
                element.style.backgroundColor = 'white';
            });

            document.querySelectorAll('.menu__link').forEach(element => {
                element.style.cssText = 'border: 1px solid white; color: white';
            });

            color = 'white';

            setHoverMenuListener();

            break;
    };
};

function setHoverMenuListener() {
    links.forEach(element => {
        element.addEventListener('mouseover', function() {
            this.style.cssText = 'border: 1px solid rgb(190, 166, 124); color: rgb(190, 166, 124)';
            this.closest('.menu__item').style.backgroundColor = 'rgb(169, 148, 110)';
        });

        element.addEventListener('mouseout', function() {
            this.style.cssText = `border: 1px solid ${color}; color: ${color}`;
            this.closest('.menu__item').style.backgroundColor = `${color}`; 
        });
    });
};

function validateName(value) {
    let noteName = document.querySelector('#noteName'),
        inputName = document.querySelector('#name'),
        avail = false;

    value = value.replace(/\s+/g, '');

    switch (true) {
        case (!value.trim() === true):
            noteName.textContent = 'Имя не должно быть пустым!';
            inputName.style.border = '1.5px solid red';

            break;

        case (value.length < 2):
            noteName.textContent = 'Имя слишком короткое!';
            inputName.style.border = '1.5px solid red';

            break;

        case (/[~`!?@_"'#$№;:.,%^&*/()+=|{}[<>\]-]/g.test(value) === true):
            noteName.textContent = 'Имя не должно содержать знаков!';
            inputName.style.border = '1.5px solid red';

            break;

        case (/[0-9]/g.test(value) === true):
            noteName.textContent = 'Имя не должно содержать цифр!';
            inputName.style.border = '1.5px solid red';
            
            break;

        default:
            avail = true;
            noteName.textContent = '';
            inputName.style.border = '1.5px solid transparent';

            break;
        };

    return avail;
};

function validateEmail(value) {
    let avail = false;

    value = value.replace(/\s+/g, '');

    if (emailRegexp(value) === false) {
        document.querySelector('#noteEmail').textContent = 'Неверный email!';
        document.querySelector('#email').style.border = '1.5px solid red';
    }

    else {
        avail = true;
        document.querySelector('#noteEmail').textContent = '';
        document.querySelector('#email').style.border = '1.5px solid transparent';
    };

    return avail;
};

function emailRegexp(value) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return regexp.test(value);
};

function validateMessage(value) {
    let avail = false; 

    value = value.replace(/\s+/g, '');

    if (!value.trim() === true) {
        document.querySelector('#noteMessage').textContent = 'Это поле не должно быть пустым!';
        document.querySelector('#message').style.border = '1.5px solid red';
    }

    else {
        avail = true;
        document.querySelector('#noteMessage').textContent = '';
        document.querySelector('#message').style.border = '1.5px solid transparent';
    };

    return avail;
};

function sendMessage() {
    const data = new FormData(document.querySelector('#form')),
        request = new XMLHttpRequest();

    request.open('POST', '../PHP/main.php');

    request.send(data);

    request.addEventListener('load', () => {
        if (request.readyState === 4 && request.status === 200) {
            let answer = document.createElement('p');

            answer.classList.add('answer');

            answer.textContent = 'Ваше сообщение успешно отправлено.';

            if (document.querySelector('.answer')) document.querySelector('.answer').remove();

            document.body.prepend(answer);

            setTimeout(function() {
                answer.style.opacity = '1';
            }, 200);

            setTimeout(function() {
                answer.style.opacity = '0';

                setTimeout(function() {
                    answer.remove();
                }, 1000);
            }, 5000);

            document.querySelector('#form').reset();
        }

        else {
            let answer = document.createElement('p');

            answer.classList.add('answer');

            answer.textContent = 'Ошибка. Попробуйте снова позже.';

            if (document.querySelector('.answer')) document.querySelector('.answer').remove();

            document.body.prepend(answer);

            setTimeout(function() {
                answer.style.opacity = '1';
            }, 200);

            setTimeout(function() {
                answer.style.opacity = '0';
                
                setTimeout(function() {
                    answer.remove();
                }, 1000);
            }, 5000);

            document.querySelector('#form').reset();
        };
    });

    request.addEventListener('error', () => {
        console.log(request.readyState, request.statusText);
    });
};