$(document).ready(function(){ 
	$("#loginForm").hide();

	$("#loginButton").on('click', function(){
		event.preventDefault();
		var userInfo = $.ajax({
			type: "POST",
			url: "http://art-share.herokuapp.com/api/v1/sessions/new",
			data: {
				email: $("#login").val(),
				password: $("#passwordLogin").val()
			},
			success: function(response){
				var loggedInUser=response.result;
				console.log(response);
				$(".info").text(loggedInUser.fname+" "+loggedInUser.lname+", you have successfully logged in with user id "+loggedInUser.id+" and email "+loggedInUser.email);
				$("#loginForm").hide()
			},
			error: function(response){
				$(".info").text("something went wrong: "+response.responseText);
			}
		});
	});

	$("#createUserButton").on('click', function(){
		event.preventDefault();
		$.ajax({
			type: "POST",
		    url: "http://art-share.herokuapp.com/api/v1/users/",
		    data:{
		        user: {
					fname: $("#fname").val(),
					lname: $("#lname").val(),
					password: $("#password").val(),
					email: $("#email").val()
				}
			},
			success: function(response) {
				console.log(response.result);
				var newUser = response.result;
				$(".info").text("Congratulations "+newUser.fname+" "+newUser.lname+"! You have successfully created a user with user id "+newUser.id+". Please login below, using your email: "+newUser.email);
			},
			error: function(response) {
				$(".info").text("Not....working..."+response.responseText);
			}
		});



		$("#createUserForm").hide();
		$("#loginForm").show();

	});
});