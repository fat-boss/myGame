// 删除数组中某个元素
Array.prototype.remove = function(ele){
	// body... 
	var i=0,n=0;
	// var arrSize=this.length;
	for(i=0;i<this.length;i++){
		if(this[i]!=ele){
			this[n++]=this[i];
		}
	}
	if(n<i){
		this.length=n;
	}
};


// 数组根据下标删除元素
Array.prototype.removeByIndex = function(index){
	// body... 
	var i=0,n=0;
	// var arrSize=this.length;
	for(i=0;i<this.length;i++){
		if(this[i]!=this[index]){
			this[n++]=this[i];
		}
	}
	if(n<i){
		this.length=n;
	}
};


// 数组是否包含某个元素
Array.prototype.contain = function(ele){
	// body... 
	var i=0;
	for(i=0;i<this.length;i++){
		if(this[i]==ele){
			return true;
		}
	}
	return false;
};