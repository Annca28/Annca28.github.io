function getWelcolmeMsg() {
    console.log("inside wellcome message")
    return "Wellcome to my site!";
}

function getColor() {
    var date = new Date();
    console.log(date.getMinutes());
    if (date.getMinutes () > 18) {
        return "green"
    }
    return "blue";
}


var wellcome = getWelcolmeMsg();
console.log("after wellcome message")
console.info(wellcome);

var summaryElement = document.getElementById("summary");
console.info("summaryElement", summaryElement);
var color = getColor();
summaryElement.style.color = color;


function hidePage(page){
    var el = document.getElementById(page);
    el.style.display= 'none';
}
function showPage(page){
    document.getElementById(page).style.display = 'block';
}


function initMenu() {
    var links = document.querySelectorAll("#top-menu-bar a");
    console.info(links);
    for(var i = 0; i < links.length; i++) {
        links[i].onclick = clickOnMenuItem;
    }
}

function clickOnMenuItem () {
    console.warn('clicked on menu', this);
    hideAllPages();
    var pageId = this.getAttribute('data-page');
    console.warn({pageId});
    showPage(pageId);
}

function hideAllPages() {
    var pages = document.querySelectorAll('.page');
    for(var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
}
initMenu();

function showSkills(skills) {
    skills.sort(function(a, b){
        return b.endorsements - a.endorsements;
});

    var htmlSkills = skills.map(function(skill) {
        var endorsedBy = skill.endorsedBy ? ' - ' + skill.endorsedBy : '';
        var endorsements = `<span class="endorsements">(${skill.endorsements}${skill.endorsedBy})</span>`;
        return '<li>' + skill.name.toUpperCase() + endorsements + '</li>';
    });

    var ul = document.querySelector('#skills-page ul')
    ul.innerHTML = htmlSkills.join('');
}


hideAllPages();
showPage ('skills-page');

//TODO: load skills.json and pass them to showSkills

console.log('1. before loading')
fetch('data/skills.json')
  .then(function(response) {
      console.info('loaded skills.json')
      return response.json();
  })
  .then(function(skills) {
    console.log('3 skills', skills);
    showSkills(skills);
  });

console.log('4 after load')
