export function shuffle(arr){
	let arr1 = arr.slice()
	for(let i=0;i<arr1.length;i++) {
		let j = getRandomInt(0,i)
		let t = arr1[i]
		arr1[i] = arr1[j]
		arr1[j] = t
		
	}
	return arr1
}

function getRandomInt(min,max){
	return Math.floor( Math.random() * (max-min+1) + min )
}
