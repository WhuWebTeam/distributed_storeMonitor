window.onload = function(){
	$('h1 button:eq(0)').click(function(){
		console.log(1);
		$('#signUp').css('display','none');
		$('#signIn').css('display','block');
	})
	$('h1 button:eq(1)').click(function(){
		$('#signIn').css('display','none');
		$('#signUp').css('display','block');
	})


	// $('#SignInSubmit').click(function(){
	// 	$.ajax({
	// 		url:'/api/v1/wesineSystem/sign/companySignin',
	// 		type:'post',
	// 		data:{
	// 			'id':$('#signInUsername').val(),
	// 			'password':$('#SignInPassword').val()
	// 		},
	// 		success:function(){

	// 		}
	// 	})
	// })
	// $('#SignUpSubmit').click(function(){
	// 	$.ajax({
	// 		url:'/api/v1/wesineSystem/sign/companySignup',
	// 		type:'post',
	// 		data:{
	// 			'id':$('#signUpUsername').val(),
	// 		    'password':$('#signUpPassword').val(),
	// 		    'name':$('#name').val(),
	// 		    'icon':$('#url').val(),
	// 		    'logo':$('#note').val()
	// 		},
	// 		success:function(){
				
	// 		}
	// 	})
	// })
}