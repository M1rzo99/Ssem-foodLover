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






});