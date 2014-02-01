Package.describe({
  summary: "A custom select/multiselect for @twitter bootstrap using button dropdown."
});

Package.on_use(function (api) {
  api.add_files('bootstrap-select.min.css', 'client');
  api.add_files('bootstrap-select.min.js', 'client');
});

