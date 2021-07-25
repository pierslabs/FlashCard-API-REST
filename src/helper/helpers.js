// array_data -> campos que queremos comparar
// raw -> los datos que recibimos del req.body o req.query (headers)


const require_data = (array_data, raw)=>{

	for (let index = 0; index < array_data.length; index++) {

		// importante en los ternarios después de '?' es en este caso {true}else{false} 
		var	 element = raw.hasOwnProperty(array_data[index])?true:false;
		if(element == false){
			return false;
		}
	}

	return true;

}

module.exports = {
	require_data : require_data
}