---
title: "Java"
layout: category
permalink: categories/java
---


{% assign posts = site.categories['Java']%}
{% for post in posts %}
{% include archive-single.html type=page.entries_layout %}
{% endfor %}