let LocalStorage = ($window, $timeout) => {
	var storage = $window.localStorage;

	return {
		exists: (key) => {
			if(this.getLength() > 0 && storage.getItem(key))
				return true;

			return false;
		},
		get: (key) => {
			if(!key)
				return storage;

			if(this.exists(key)){
				var item = storage.getItem(key);
				//isJson function from consts.js lib
				return (isJson(item) ? angular.fromJson(item) : item);
			}

			return null;
		},
		set: (key, value) => {
			if(this.exists(key)){
				this.remove(key);
			}

			var item = (typeof value === 'object') ? angular.toJson(value) : value;
			storage.setItem(key, item);
		},
		remove: (key) => {
			if(this.exists(key)){
				storage.removeItem(key);					
				return true;
			}

			return false;
		},
		getLength: () => {
			return storage.length;
		},
		clear: () => {
			storage.clear();
		}
	};
};

export default LocalStorage;