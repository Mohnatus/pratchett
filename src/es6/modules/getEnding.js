export default function getEnding(number, endings) {
  let cases = [2, 0, 1, 1, 1, 2];  
  let ending = endings[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]; 
  console.log(111, number, ending)
  return ending;
}