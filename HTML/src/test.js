(function () {
    function Test(name) {
	  this.task = [];
	  let fn1 = () => {
	    console.log(name);
	    this.next();
	  }
	  this.task.push(fn1);
	  setTimeout(() => {
	    this.next();
	  }, 0)
	  return this;
	}
	
	Test.prototype.firstSleep = function (timer) {
	  console.time("firstSleep")
	  let that = this;
	  let fn2 = () => {
	    setTimeout(() => {
	      console.timeEnd("firstSleep");
	      that.next();
	    }, timer * 1000)
	  }
	  this.task.unshift(fn2);
	  return this;
	}
	
	Test.prototype.sleep = function (timer) {
	  console.time("sleep")
	  let that = this;
	  let fn3 = () => {
	    setTimeout(() => {
	      console.timeEnd("sleep");
	      that.next();
	    }, timer * 1000)
	  }
	  this.task.push(fn3);
	  return this;
	}
	
	Test.prototype.eat = function (dinner) {
	  let that = this;
	  let fn4 = () => {
	    console.log(dinner);
	    that.next();
	  }
	  this.task.push(fn4);
	  return this;
	}
	
	Test.prototype.next = function (dinner) {
	  let fn = this.task.shift();
	  fn && fn()
	}
	
	new Test("test").firstSleep(3).sleep(5).eat("dinner");

})();