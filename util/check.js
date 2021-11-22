

/*
	校验文件  例如 手机号   身份证号等等
*/
export function createCurry(func, args) {
	var arity = func.length;
    var args = args || [];

    return function() {
        var _args = [].slice.call(arguments);
        [].push.apply(_args, args);

        // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
        if (_args.length < arity) {
            return createCurry.call(this, func, _args);
        }

        // 参数收集完毕，则执行func
        return func.apply(this, _args);
    }
}
export function check(targetString, reg) {
    return reg.test(targetString);
}
export function checkPhone(phone){
	let _check = createCurry(check);
	let result_checkPhone = _check(/^1[3456789]\d{9}$/);
	return result_checkPhone(phone);
}
export function checkMail(mail){
	let _check = createCurry(check);
	let result_checkMail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
	return result_checkMail(mail);
}
export function checkCard(card){
	let _check = createCurry(check);
	let result_checkCard = _check( /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
	return result_checkCard(card);
}

export function addLink(str,link){

	var content = str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi,function(match,capture){


        var newStr ='<img src="' + capture+'" alt="" style="max-width: 100%;" />';

         return newStr;
  	});

		
	//let content = Regex.Replace(str,@"(?i)(?<=<img\b[^>]*?src=(['""]?))[^'""]+(?=\1)",link);
	return content;
}

export default {
	createCurry,
	check,
	checkPhone,
	checkMail,
	checkCard,
	addLink,
}























