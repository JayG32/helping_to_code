const atualPagina = location.pathname

// console.log(atualPagina)
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems){
    if(atualPagina.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}