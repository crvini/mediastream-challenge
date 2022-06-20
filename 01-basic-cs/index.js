'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

//const total = 0 // TODO


const hats = database.map(item=>{
  return  item.hats.map(hat=>{
        
        return {id:hat.id, } ;
    })
});

const totalHats = [];
hats.map(item=>{
    item.map((hat)=>{
               
        totalHats.push(hat.id);
    });
})


const busquet = totalHats.reduce((acc, hat) => {
    acc[hat] = ++acc[hat] || 0 ;
    
    return acc;
  }, {});
  
  const duplicados = totalHats.map( (hat) => {
	return busquet[`${hat}`];
}).sort(function(a,b){ return b - a });
  
const totalSales = duplicados.map((item, index)=>{
    let total = 0
    if(index<3){
        total = total + item;
    }
    return total;
}).filter(function(item) {
    return item !== 0
}).reduce((accumulator, curr) => accumulator + curr);

const total = totalSales;

// Throws error on failure
assert.equal(total, 24, `Invalid result: ${total} != 24` );

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: La forma más rápida e eficaz de hacer un código
 *   
 */
