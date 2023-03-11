document.querySelector(".settings_cog").addEventListener("click", function () {
    let element = document.querySelector(".sidebar")
    let selectors = element.classList
    if (selectors.contains("sidebar_closed")) {
        element.classList.remove("sidebar_closed")
        element.classList.add("sidebar_visible")
        document
            .querySelector(".settings_hidden")
            .classList.add("content_settings_visibile")
    } else {
        element.classList.remove("sidebar_visible")
        element.classList.add("sidebar_closed")
        document
            .querySelector(".settings_hidden")
            .classList.remove("content_settings_visibile")
    }
})

document.querySelector(".close_button").addEventListener("click", function () {
    let element = document.querySelector(".sidebar")
    let selectors = element.classList
    if (selectors.contains("sidebar_closed")) {
        element.classList.remove("sidebar_closed")
        element.classList.add("sidebar_visible")
        document
            .querySelector(".settings_hidden")
            .classList.add("content_settings_visibile")
    } else {
        element.classList.remove("sidebar_visible")
        element.classList.add("sidebar_closed")
        document
            .querySelector(".settings_hidden")
            .classList.remove("content_settings_visibile")
    }
})
