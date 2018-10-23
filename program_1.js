function print_details() {
   console.log("Starting program");
}

function Item(id, name) {
   this.id = id;
   this.name = name;
}

// Add functions to the Item prototype
Item.prototype.get_info_string = function() {
   var ret_string = 'id=' + this.id + ', name=' + this.name;
   return ret_string;
};

function run_program() {
   print_details();
   
   let items_array = [];
   
   for (let i = 0; i < 5; i++) {
      let item = new Item(i, 'name_' + i);
      items_array.push(item);
   }
   console.log(items_array);
}

run_program();