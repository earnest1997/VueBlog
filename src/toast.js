import toastCom from './toast.vue'
// console.log(toastCom);//object
var Toast = {};

// 如果按照优先级去理解,当你需要继承一个组件时,可以使用Vue.extend().当你需要扩展组件功能
// 的时候,可以使用extends,mixins.
// Vue.js允许您将扩展Vue子类视为概念上与Web组件类似的可重用组件，而不需要任何polyfills。
 // 要创建一个组件，只需使用Vue.extend（）创建一个Vue的子类构造函数（构造器）
 // 然后使用vue.component注册这个构造器
 // 为了简单点，你也可以直接传一个option对象到vue.component而不是实际的构造器，vue.component会自动的调用
 // vue.extend与vue.component的区别是，前者是一个类继承方法，返回一个构造器（vue本身就是一个构造器
 // 而后者是一个注册方法，后者的功能就是给后者一个id（vue.component的第一个参数 so Vue.js can pick it up in templates
// Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器，
// 第二个参数是一个可选的选项对象：
Toast.install = function (Vue, options) {
	// 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
	// 关于$Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来
	 Vue.prototype.$toast = function(tips){
		// 创建继承了toastcom的子类ToastComponent
		  let ToastComponent = Vue.extend(toastCom);
		  var dataobj = {
			       data(){
				         return {
					           tips: tips,
				         }
			       }
		     };
		// 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。
		// 可以使用 vm.$mount() 手动地挂载一个未挂载的实例。el是vue实例使用的根dom元素
		// 创建对象的时候给构造函数传递参数dataobj
  let tpl = new ToastComponent(dataobj).$mount().$el; // 2、创建实例并将其挂载
  document.body.appendChild(tpl); // 3、把创建的实例添加到body中

 };
};
export default Toast;
