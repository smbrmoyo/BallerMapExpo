// Requiring the lodash library
const _ = require("lodash");




// Original array
var users = [
  { 'user': 'luv',
    'salary': 36000,
    'active': true },
  { 'user': 'kush',
    'salary': 40000,
    'active': false }
];

// Using the _.filter() method
let filtered_array = _.filter(
    users, function(o) {
       return (o.user.search(/Ush/i) !== -1);
    }
);

console.log(filtered_array);