export function _debounce(fn,wait){
 let timer=null
 let timeFlag=null
 let start=null
 return function(){
 	let a=arguments
 	// 注意这里的start不能写在父函数里面，因为闭包会保持这个值在内存中，导致该值不会发生变化
 	start=new Date().getTime()
 	// 注意这里的顺序不要写反了
 if(timeFlag&&(start-timeFlag)>=wait){
 	fn.apply(null,a)
 	
 }
 else if(!timeFlag){
 	fn.apply(null,a)
 }
 else{
clearTimeout(timer)
 timer=setTimeout(function(){
 fn.call(null,a)
 },wait)
}
timeFlag=new Date().getTime()
}
}