(function () {
  var el = document.getElementById("if-root");
  var dataEl = document.getElementById("story-data");
  if (!el || !dataEl) return;

  var story;
  try {
    story = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }

  var base = typeof window.__SITE_BASE__ === "string" ? window.__SITE_BASE__ : "";

  function resolveHref(href) {
    if (!href) return "#";
    if (base && href.charAt(0) === "/") {
      return base.replace(/\/$/, "") + href;
    }
    return href;
  }

  function renderPassage(id) {
    var passage = story.passages && story.passages[id];
    if (!passage) return;

    el.innerHTML = "";

    var text = document.createElement("p");
    text.className = "if-passage-text";
    text.textContent = passage.text;
    el.appendChild(text);

    var choices = passage.choices;
    if (!choices || !choices.length) return;

    var list = document.createElement("div");
    list.className = "if-choices";
    list.setAttribute("role", "group");
    list.setAttribute("aria-label", "Choices");

    for (var i = 0; i < choices.length; i++) {
      var c = choices[i];
      if (c.href) {
        var a = document.createElement("a");
        a.className = "if-choice if-choice-link";
        a.href = resolveHref(c.href);
        a.textContent = c.label;
        list.appendChild(a);
      } else if (c.next) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "if-choice if-choice-btn";
        btn.textContent = c.label;
        btn.addEventListener("click", function (nextId) {
          return function () {
            renderPassage(nextId);
          };
        }(c.next));
        list.appendChild(btn);
      }
    }

    el.appendChild(list);
  }

  var startId = story.start || "arrival";
  renderPassage(startId);
})();
