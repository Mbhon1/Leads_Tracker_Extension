let myLeads = []
const inputEl = document.getElementById("input-el")
const saveInput = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage){ // saving the input even after page refresh
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

tabBtn.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})
// const tabs = [
  // {url:"https://www.linkedin.com/in/per-harald-borgen/"}
// ]

function render(leads){
  let listItems = ""
  for(let i = 0;i < leads.length;i++){
    listItems += `
    <li>
      <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
      </a>    
    </li>
    `
}
ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function(){
  // console.log("Double click")
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

saveInput.addEventListener("click", function(){
  myLeads.push(inputEl.value)
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
  console.log(localStorage.getItem("myLeads"))
})