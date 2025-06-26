js = require "js";
local window = js.global;
window:fun_log("消息消息嘿嘿");
return "完毕" .. window.mess_list[0];