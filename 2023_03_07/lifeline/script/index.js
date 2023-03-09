import("./rust/sidebar/pkg/sidebar.js").then(module => {
  const selectedValue = module.retrieve_selected_value();

  console.log(selectedValue);
});
