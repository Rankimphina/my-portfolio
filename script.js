const grid       = document.getElementById("grid");
const titleList  = document.getElementById("title-list");
const empty      = document.getElementById("empty");
const search     = document.getElementById("search");
const menuBtn    = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");


// ─── MOBILE MENU ─────────────────────────────────────────────────
menuBtn.addEventListener("click", function() {
  if (mobileMenu.style.display === "flex") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "flex";
  }
});

mobileMenu.querySelectorAll("a").forEach(function(link) {
  link.addEventListener("click", function() {
    mobileMenu.style.display = "none";
  });
});


// ─── PROJECT CLASS ───────────────────────────────────────────────
class Project {
  constructor(id, title, description, tags, link) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.link = link;
  }

  toCard() {
    const tagPills = this.tags.map(function(tag) {
      return '<span style="background:#374151;color:#d1d5db;font-size:12px;padding:3px 10px;border-radius:999px;">' + tag + '</span>';
    }).join(" ");

    return '<div style="background:#1f2937;border:1px solid #374151;border-radius:12px;padding:24px;display:flex;flex-direction:column;gap:12px;">'
      + '<h2 style="font-size:1.1rem;font-weight:700;">' + this.title + '</h2>'
      + '<p style="color:#9ca3af;font-size:0.875rem;flex:1;">' + this.description + '</p>'
      + '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + tagPills + '</div>'
      + '<a href="' + this.link + '" target="_blank" style="color:#4ade80;font-size:0.875rem;text-decoration:none;">View Project →</a>'
      + '</div>';
  }

  toTitleRow(index) {
    return '<li style="display:flex;align-items:center;justify-content:space-between;background:#1f2937;border:1px solid #374151;border-radius:10px;padding:16px 20px;">'
      + '<span style="color:#6b7280;font-size:0.875rem;margin-right:16px;">' + String(index + 1).padStart(2, "0") + '</span>'
      + '<span style="flex:1;font-weight:600;">' + this.title + '</span>'
      + '<span style="color:#6b7280;font-size:0.75rem;">' + this.tags[0] + '</span>'
      + '</li>';
  }
}


// ─── DEVELOPER CLASS ─────────────────────────────────────────────
class Developer {
  constructor(name, projectsCount, techCount) {
    this.name = name;
    this.projectsCount = projectsCount;
    this.techCount = techCount;
  }

  renderStats() {
    const statsEl = document.getElementById("about-stats");
    statsEl.innerHTML =
      '<div style="text-align:center;">'
      + '<p style="font-size:1.5rem;color:#4ade80;">' + this.projectsCount + '+</p>'
      + '<p style="color:#9ca3af;font-size:0.75rem;font-weight:400;">Projects</p>'
      + '</div>'
      + '<div style="text-align:center;">'
      + '<p style="font-size:1.5rem;color:#4ade80;">' + this.techCount + '+</p>'
      + '<p style="color:#9ca3af;font-size:0.75rem;font-weight:400;">Technologies</p>'
      + '</div>';
  }
}


// ─── DATA ────────────────────────────────────────────────────────
const me = new Developer("Rankim Nendelmwa", 5, 4);
me.renderStats();

const projects = [
  new Project(1, "Simple Food Timetable", "A simple periodic table for food items.", ["HTML"], "https://github.com/Rankimphina/WID_PRACTICE.git"),
  new Project(2, "Personal Bio Page", "A simple personal biography page.", ["HTML", "CSS"], "https://github.com/Rankimphina/WID_DEV.git"),
  new Project(3, "Todo List", "A simple todo list where you can add tasks.", ["HTML", "Tailwind", "JavaScript"], "https://github.com/Rankimphina/Rankim-js-project.git"),
  new Project(4, "Business Landing Page", "A simple business landing page.", ["HTML", "Tailwind"], "https://github.com/Rankimphina/Rankim-Evaluation-test-.git"),
  new Project(5, "Task Manager", "A simple task manager that helps you organize your tasks and delete the ones you no longer need.", ["HTML", "Tailwind", "JavaScript"], "https://github.com/Rankimphina/Arrays-objects.git")
];


// ─── ARRAY METHODS ───────────────────────────────────────────────
function getFilteredProjects(query) {
  return projects.filter(function(project) {
    return project.title.toLowerCase().includes(query.toLowerCase());
  });
}

function getProjectById(id) {
  return projects.find(function(project) {
    return project.id === id;
  });
}

function countByTag(tag) {
  return projects.reduce(function(count, project) {
    return project.tags.includes(tag) ? count + 1 : count;
  }, 0);
}

function buildCards(list) {
  return list.map(function(project) {
    return project.toCard();
  }).join("");
}

function buildTitleList(list) {
  return list.map(function(project, index) {
    return project.toTitleRow(index);
  }).join("");
}


// ─── RENDER ──────────────────────────────────────────────────────
function showTitles() {
  titleList.innerHTML = buildTitleList(projects);
  titleList.style.display = "flex";
  titleList.style.flexDirection = "column";
  grid.classList.remove("active");
  grid.innerHTML = "";
  empty.style.display = "none";
}

function showCards(list) {
  titleList.style.display = "none";

  if (list.length === 0) {
    grid.classList.remove("active");
    grid.innerHTML = "";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    grid.innerHTML = buildCards(list);
    grid.classList.add("active");
  }
}

search.addEventListener("input", function() {
  const query = search.value.trim();
  if (query === "") {
    showTitles();
  } else {
    showCards(getFilteredProjects(query));
  }
});

showTitles();

console.log("Find project id 2:", getProjectById(2));
console.log("Projects using HTML tag:", countByTag("HTML"));