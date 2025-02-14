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
            hours = Math.floor((time / (1000 * 60 * 60)) % 24)
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
            seconds = timer.querySelector('#seconds');
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
    setClock('.timer', deadline)


});