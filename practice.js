// var inventory = [{
//         name: "apples",
//         quantity: 2
//     },
//     {
//         name: "bananas",
//         quantity: 0
//     },
//     {
//         name: "cherries",
//         quantity: 5
//     }
// ];

// function isCherries(fruit) {
//     return fruit.name === "cherries";
// }

// console.log(inventory.find(isCherries));

// const inventory = [{
//         name: 'apples',
//         quantity: 2
//     },
//     {
//         name: 'bananas',
//         quantity: 0
//     },
//     {
//         name: 'cherries',
//         quantity: 5
//     }
// ];

// const result = inventory.find(fruit => fruit.name === 'cherries');

// console.log(result) // { name: 'cherries', quantity: 5 }

var array = [{
        id: 1,
        name: 'apples',
        quantity: 2
    },
    {
        id: 2,
        name: 'bananas',
        quantity: 0
    },
    {
        id: 3,
        name: 'cherries',
        quantity: 5
    }
];

// Shows all indexes, not just those that have been assigned values
array.find(function (item) {
    if (item.id === 3) {
        console.log(`id: ${item.id} name: ${item.name} quanity: ${item.quanity}`);
    }
});

// Shows all indexes, including deleted
// array.find(function (value, index) {

//     // Delete element 5 on first iteration
//     if (index == 0) {
//         console.log('Deleting array[5] with value ' + array[5]);
//         delete array[5];
//     }
//     // Element 5 is still visited even though deleted
//     console.log('Visited index ' + index + ' with value ' + value);
// });