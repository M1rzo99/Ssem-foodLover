window.addEventListener("DOMContentLoaded", () => {
    const tabParents = document.querySelector(".tabheader__items"),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabContents = document.querySelectorAll(".tab_content")

    function hideTabContents() {
        tabContents.forEach(tabContent => {
            tabContent.classList.add("hide");
            tabContent.classList.remove("show")
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active')
        });
    }

    function showTabsContent(index = 0) {
        tabContents[index].classList.add("show", "fade");
        tabContents[index].classList.remove("hide")
        tabs[index].classList.add("tabheader__item_active")
    }

    hideTabContents();
    showTabsContent();

    tabParents.addEventListener('click', event => {
        const target = event.target; // eventlarni har safar target qilmasdan "target" nomli obj ga olamiz
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((tab, idx) => {
                if (target === tab) {
                    hideTabContents();
                    showTabsContent(idx);
                }
            })
        }
    })

    // loader
    const loaderWrapper = document.querySelector('.loader-wrapper')
    setTimeout(() => {
        loaderWrapper.style.display = 'none'
    }, 1500)

    // Timer 2025/01/14

    const deadline = '2026-04-28';

    function getTimeRemaining(endTime) {
        const time = Date.parse(endTime) - Date.parse(new Date()), // belgilangan vaqtdan hozirgi vaqtni ayirib beradi
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor((time / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((time / (1000 * 60)) % 60),
            seconds = Math.floor((time / (1000)) % 60);

        return {
            totalTime: time,
            days,
            hours,
            minutes,
            seconds,
        }
    };

    function formatNum(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock() // agar projectimizda loader bolmsa pastdagi clockimiz 12 sec turib ishlaydi. bu hunuk ko'rinihsga olib keladi.shuni oldini olish un updateClock() ni tashqarida ham bir chaqirib olamiz!

        function updateClock() {
            const time = getTimeRemaining(endTime)
            days.textContent = formatNum(time.days)
            hours.textContent = formatNum(time.hours)
            minutes.textContent = formatNum(time.minutes)
            seconds.textContent = formatNum(time.seconds)

            if (time.totalTime <= 0) {
                clearInterval(timeInterval)
            }

        }

    }
    setClock('.timer', deadline);


    // Modal

    const openModalBtn = document.querySelectorAll("[data-modal]"), // querySelectortAll bolgani un tog'ridan - to'g'ri amal qo'sha olmaymiz
        modal = document.querySelector('.modal'),
        modalContent = document.querySelector(".modal__content");


    function OpenModal() {
        modal.classList.add('show'); // fade bu animation 
        modal.classList.remove('hide')
        modalContent.classList.add('modal__fade')
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerOut) // agar user contact us ga 5 sek dan oldin click qilsa, contact us ni boshqa ko'rsatmaslik functioni 
    }
    openModalBtn.forEach(btn => {
        btn.addEventListener('click', OpenModal)
    });


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''
    };



    // ekranni click qilganda ochilib turgan element yopilish functioni
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-modal-close') === '') {
            closeModal()
        }
    })

    // escape ni bosganda modal oynamiz yopilish functioni;
    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    // user saytga kirganda 5 sek dan kn contact Us elementi ko'rsanadi
    const modalTimerOut = setTimeout(OpenModal, 4000)


    //Class

    // HTML dagi elementlarni js ga ko'chirib ishlatib ko'rdik 'class' lar yordamida:
    class OfferMenu {
        constructor(src, alt, title, descr, discount, sale, parentSelector) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.discount = discount
            this.sale = sale
            this.parent = document.querySelector(parentSelector)
            this.formtToUSD()
        }

        formtToUSD() { // Bizni numberlarimizni USD ga ozgartirib beradi:
            this.discount = this.discount.toLocaleString("en-US", { style: "currency", currency: "USD" });
            this.sale = this.sale.toLocaleString("en-US", { style: "currency", currency: "USD" });
        }

        render() { // render - websaytga nimadir yuklab qoyamiz; 
            // element nomli div yaratib uni html ga qoshib qoyamiz;
            const element = document.createElement('div');

            element.innerHTML = `
                    
                        <img src="${this.src}" alt="${this.alt}">
                        <div>
                            <h3>${this.title}</h3>
                            <p>${this.descr}</p>
                            <p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
                        </div>
                        `
            this.parent.append(element) // parent div iga element nomli div ni elementlarini yuklab qoyayapmiz
        }
    }

    // const offers = [{
    //     src: "./img/offer1.png",
    //     alt: "Quattro Pasta",
    //     title: "Quattro Pasta",
    //     descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
    //     discount: 55,
    //     sale: 20
    // }, {
    //     src: "./img/offer2.png",
    //     alt: "Gluten-Free Pasta",
    //     title: "Gluten-Free Pasta",
    //     descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
    //     discount: 75,
    //     sale: 25
    // }, {
    //     src: "./img/offer3.png",
    //     alt: "Vegertarian Pasta",
    //     title: "Vegertarian Pasta",
    //     descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.',
    //     discount: 80,
    //     sale: 40
    // }];



    // change html daytime-items section to class

    class DayTime {
        constructor(src, alt, title, descr, parElement) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.parent1 = document.querySelector(parElement)
        }
        render() {
            const parDiv = document.createElement('div')
            parDiv.innerHTML = `
            <img src="${this.src}"
             alt="${this.alt}">
             <h3>${this.title}</h3>
                <p>${this.descr}</p>
            `
            this.parent1.append(parDiv)
        }
    }

    fetch("http://localhost:3000/offers", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json())
        .then((data) => {
            data.forEach(event => {
                const { src, alt, title, descr, discount, sale } = event
                new OfferMenu(src, alt, title, descr, discount, sale, ".offers-items").render()
            })
        })


    const offers1 = [{
        src: "./img/breckfastIcon.png",
        alt: "Breakfast",
        title: "Breakfast",
        descr: '8:00 am to 10:00 am'
    }, {
        src: "./img/lunchIcon.png",
        alt: "Lunch",
        title: "Lunch",
        descr: '04:00 pm to 07:00 pm'
    }, {
        src: "./img/dinnerIcon.png",
        alt: "Dinner",
        title: "Dinner",
        descr: '9:00 pm to 1:00 Am'
    }, {
        src: "./img/dessertIcon.png",
        alt: "dessert",
        title: "Dessert",
        descr: ' all day'
    }]

    offers1.forEach(event => {
        const { src, alt, title, descr } = event
        new DayTime(src, alt, title, descr, ".daytime-items").render()
    })

    // form - telegram bot orqali ulash

    const form = document.querySelector("form"),
        telegramTookenBot = '7947212224:AAHsHSmafFsn8ZlWz8xt7odpXXkqcN4VovU',
        chatID = '424383040';

    const message = {
        loading: 'Loading...',
        succes: 'Thanks for contacting us',
        failure: 'Somthing went wrong'
    }


    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const loader = document.createElement('div')
        loader.classList.add('loader')
        loader.style.width = '20px'
        loader.style.height = '20px'
        loader.style.marginTop = "20px"
        form.append(loader)

        const formData = new FormData(form)
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value
        })
        fetch(`https://api.telegram.org/bot${telegramTookenBot}/sendMessage`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatID,
                text: `Name : ${object.name} Phone: ${object.phone}`
            })
        }).then(() => { showStatus(message.succes) })
        form.reset()
            .catch(() => { showStatus(message.failure) })
            .finally(() => loader.remove())
    })

    function showStatus(message) {
        const modalDialog = document.querySelector('.modal__dialog')
        modalDialog.classList.add('hide')
        OpenModal()

        const statusModal = document.createElement('div')
        statusModal.classList.add('modal__dialog')
        statusModal.innerHTML =
            ` <div class="modal__content">
                <div data-modal-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
                </div>
            `
        document.querySelector('.modal').append(statusModal)
        setTimeout(() => {
            statusModal.remove()

            modalDialog.classList.remove('hide')
            closeModal()
        }, 4000)
    }
});