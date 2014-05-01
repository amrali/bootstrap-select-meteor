Bootstrap-Select
================

Meteor packaging for [Bootstrap-Select](http://silviomoreto.github.io/bootstrap-select/), an enhancement for `<select>` inputs, with custom styling and icons, multiple selections, local autocomplete/filtering/live-search and size/width control. Doesn't support [tags mode input](https://github.com/silviomoreto/bootstrap-select/issues/565) - [use Select2](https://github.com/TimSchlechter/bootstrap-tagsinput/issues/123) for that.

##Usage

**Defining the templates:**
```HTML
<template name="students">
  <select id="students">
    {{#each students}}
      {{> student}}
    {{/each}}
  </select>
</template>
          
<template name="student">
  <option>{{name}}</option>
</template>
```
The two separate templates are required to catch updates on the underlying collection. See `rendered` events below.


**Creating collection and assigning it to the template students:**
```JS
var students = new Meteor.Collection(null);

students.insert({name: "Albert Einstein"});
students.insert({name: "Tim Berners-Lee"});
students.insert({name: "Bill S. Preston, Esquire"});

Template.students.students = function() {
  return students.find({});
}
```

**When the select is rendered, fire the selectpicker on it:**

```JS
Template.students.rendered = function(){
  $('#students').selectpicker();
};
```
In [Blaze](https://github.com/meteor/meteor/wiki/Using-Blaze) the rendered event would only be thrown once when the template is rendered first. To refresh the selectpicker whenever the underlying collection has changed, we have to add another hook to the `student` template:

```JS
var renderTimeout = false;
Template.student.rendered = function(){
  if (renderTimeout !== false) {
    Meteor.clearTimeout(renderTimeout);
  }
  renderTimeout = Meteor.setTimeout(function() {
    $('#students').selectpicker("refresh");
    renderTimeout = false;
  }, 10);
};
```
This event will be fired for every option which is rendered. This means if the collection has 100 documents, the selectpicker would be refreshed 100 times. On big collections this leads to a few seconds freeze in the browser. Therefore the small `renderTimeout` to only fire once on a bulk of updates.

**Catching the user selection:**

```JS
Template.students.events({
  'change #students': function(e) {
    var student = $("#students").val();
    console.log(student);
  }
});
```
---

If I forgot to upgrade to the latest version, please start a new issue
or notify me and I'll happily upgrade it for you. Or if you want
to be nice and save me a few seconds; fork it, make a PR and I'll merge it.

Author: Amr Ali (amralicc AT gmail.com)

