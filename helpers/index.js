export const suffleArray = (arr) => {
  for(var i =arr.length-1 ; i>0 ;i--){
      var j = Math.floor( Math.random() * (i + 1) ); //random index
      [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
  }

  return arr;
}


export const getIndexOfElementInArray = (arr, type, key, element) => {
  let o = 0;

  for (let i = 0; i < arr.length; i++) {
    if ( type === 'object' ) {
      if ( arr[i][key] === element) {
        o = i;
        break;
      }
    } else if (type === 'plane') {
      if ( arr[i] === element) {
        o = i;
        break;
      }
    }
  }

  return o;
}


