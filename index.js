const filterValueBykey = (keyStr) => (datas) => {
	let [key,value] = keyStr.split(':')
	return  datas.filter( e => e[key] == value)
}

const handler = {
	get(target, key) {
		if (key.startsWith('{') && key.endsWith('}')) {
			let keyArr = key.slice(1,-1).split(',')
			return keyArr.reduce((output,curRule) => filterValueBykey(curRule)(output) ,target)
		}
		return Reflect.get(target, key)
	}
}

const invokeFilterPattern = (TargetArray = [{}]) => new Proxy(TargetArray,handler)

export default invokeFilterPattern