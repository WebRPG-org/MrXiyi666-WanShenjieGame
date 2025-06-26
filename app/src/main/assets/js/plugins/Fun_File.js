
	
	function ReadTxt(file_name){
		let data = file_name;
		if(StorageManager.isLocalMode()){
			data = StorageManager.fsReadFile(file_name);
		}else{
			const xhr = new XMLHttpRequest();
            xhr.open('GET', file_name, false);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        data = xhr.responseText;
                    }
                }
		    };
            xhr.send();
		}
		return data;
	};
	
	function 获取随机对话(file_name){
		let data;
		data = ReadTxt("Speak/" + file_name);
		// 检查文件读取是否成功
        if (!data) {
            return "null";
        }
		let list = data.split("。").map(item => item.trim());
		list = list.filter(item => Boolean(item));
		const txt = list[生成随机数(list.length)];
		if(Boolean(txt)){
			return txt;
		}
		获取随机对话(file_name);
	};