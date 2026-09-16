//=================================================================================================
// Fun_Date.js
//=================================================================================================
/*:
 * @target MZ
 * @plugindesc 判断是否为新的一天
 * @author 希夷先生
 *
 * @help
 * 插件功能：判断是否为新的一天 日期判断(); false 为新的时间 开启副本 true 为时间相等 继续关闭副本 获取当前日期() 保存到变量内
 * 
*/

    function 获取当前日期(){
		const now = new Date();
		return now.toISOString();
	};
	
	// dateStr2 保存的时间
	function 日期判断(dateStr2) {
        const d1 = new Date(获取当前日期());
        const d2 = new Date(dateStr2);
        const year1 = d1.getFullYear();
        const month1 = d1.getMonth() + 1;
        const date1 = d1.getDate();
		const House1 = d1.getHours();
    
        const year2 = d2.getFullYear();
        const month2 = d2.getMonth() + 1;
        const date2 = d2.getDate();
        const House2 = d2.getHours();
        // 输出格式化后的日期（符合日常习惯）
        //console.log(`日期1: ${year1}-${month1}-${date1}-${House1}`);
        //console.log(`日期2: ${year2}-${month2}-${date2}-${House2}`);
    
        if(year1 === year2 && month1 === month2 && date1 === date2 && House1 === House2){	
			return true;
		}
		return false;
    };