
Accounts.emailTemplates.verifyEmail = {
	subject() {
		return "[ KoalaCare ] Verify your email account";
	},
	html(user, url){
		urlWithOutHash = url.replace( '#/', '')
		emailVerify.buttons[0]['href'] = urlWithOutHash
		emailVerify['body'] += '<br>  or paste this link to your browser <p style="text-align: center;">'+ urlWithOutHash +'</p>'
		let emailAddress = user.emails[0].address
		emailBody = email_template(emailVerify, urlWithOutHash)
		return emailBody
	}
}

Accounts.config({
	sendVerificationEmail:true
})
function email_template(d, link){
	email_template_data = {
		companyName:"Carelocation",
		HeaderText:'One Step Ahead!',
		recipient:'to a Person',
		body:" body",
		buttons:[{
			type:'button1',
			text:'sucess',
			href: link
		},{
			type:'button2',
			text:'info',
		},{
			type:'button3',
			text:'danger',
		},{
			type:'button4',
			text:'gray',
		},{
			type:'button5',
			text:'black',
		}]
	}

	email_template_data = {
		companyName:d.companyName,
		HeaderText:d.HeaderText,
		recipient:d.recipient,
		body:d.body,
		buttons:d.buttons
	}

	arr_button = []
		for (var i = 0; i < email_template_data.buttons.length; i++) {
			data = '<a href="'+email_template_data.buttons[i].href+'" class="button '+email_template_data.buttons[i].type+'">'+email_template_data.buttons[i].text+'</a>'
			arr_button.push(data)
		}

	head = `
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<title>A Simple Responsive HTML Email</title>
			<style type="text/css">
				body {margin: 0; padding: 0; min-width: 100%!important;}
				.content {width: 100%; max-width: 600px;}
				.subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}
				.h1 {font-size: 33px; line-height: 38px; font-weight: bold;}
				.h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}
				@media only screen and (min-device-width: 601px) {
					.content {width: 600px !important;}
					.col425 {width: 425px!important;}
					.col380 {width: 380px!important;}
				}.innerpadding {padding: 30px 30px 30px 30px;}
				.borderbottom {border-bottom: 1px solid #f2eeed;}
				.h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}
				.bodycopy {font-size: 16px; line-height: 22px;}
				.button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}
				/*.button a {color: #ffffff; text-decoration: none;}*/
				/*.innerpadding {padding: 30px 30px 30px 30px;}*/
				.button {
						background-color: #4CAF50; /* Green */
						border: none;
						color: white;
						padding: 16px 32px;
						text-align: center;
						text-decoration: none;
						display: inline-block;
						font-size: 16px;
						margin: 4px 2px;
						-webkit-transition-duration: 0.4s; /* Safari */
						transition-duration: 0.4s;
						cursor: pointer;
				}
				.button1 {
						background-color: white; 
						color: black; 
						border: 2px solid #4CAF50;
				}
				.button1:hover {
						background-color: #4CAF50;
						color: white;
				}
				.button2 {
						background-color: white; 
						color: black; 
						border: 2px solid #008CBA;
				}
				.button2:hover {
						background-color: #008CBA;
						color: white;
				}
				.button3 {
						background-color: white; 
						color: black; 
						border: 2px solid #f44336;
				}
				.button3:hover {
						background-color: #f44336;
						color: white;
				}
				.button4 {
						background-color: white;
						color: black;
						border: 2px solid #e7e7e7;
				}
				.button4:hover {background-color: #e7e7e7;}
				.button5 {
						background-color: white;
						color: black;
						border: 2px solid #555555;
				}
				.button5:hover {
						background-color: #555555;
						color: white;
				}
				.footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}
				.footercopy a {color: #ffffff; text-decoration: underline;}
				body[yahoo] .unsubscribe {display: block; margin-top: 20px; padding: 10px 50px; background: #2f3942; border-radius: 5px; text-decoration: none!important; font-weight: bold;}
				@media only screen and (max-width: 550px), screen and (max-device-width: 550px) {
					body[yahoo] .buttonwrapper {background-color: transparent!important;}
					body[yahoo] .button a {background-color: #e05443; padding: 15px 15px 13px!important; display: block!important;}
				}
			</style>
		</head>`
	emailHeader = `
		<table class="content" align="center" cellpadding="0" cellspacing="0" border="0"  style="background-color: #BBD9AA">
			<tr height="200px">
				<td width="30px"></td>
				<td height="100px">
					<img src="https://static.tutsplus.com/assets/redesign/webdesign-8aa1b0ce3ac711a68baaf9220b12107e.svg" height="100px" style="margin-left: auto">
				</td>
				<td class="h1">
				`+email_template_data.companyName+`
				</td>
			</tr>
		</table>`
	emailHeaderText = `
		<table class="content" align="center" cellpadding="0" cellspacing="0" border="0" style="background-color: white">
			<tr>
				<td width="150px"></td>
				<td class="h1" height="100px">
					`+email_template_data.HeaderText+`
				</td>
			</tr>
		</table>`
	emailBody = `
			<table class="content" align="center" cellpadding="0" cellspacing="0" border="0" style="background-color: white; height: 50vh;">
				<tr>
					<td width="30px"></td>
					<td class="bodycopy">
						`+email_template_data.recipient+`<br><br><br><br>
						<p style="text-indent: 50px;">`+email_template_data.body+`</p><br><br><br>
					</td>
				</tr>
				<tr>
					<td width="30px">
					</td>
					<td style="text-align: center;">
					`+arr_button+`
					</td>
				</tr>
			</table>`
	emailFooter = `
		<table class="content" align="center" cellpadding="0" cellspacing="0" border="0" style="background-color: #44525f; padding:20px 0px">
			<tr>
				<td align="center" class="footercopy">
					&amp;reg; Someone, somewhere 2013<br/>
					<a href="#"><font color="#ffffff">Unsubscribe</font></a> from this newsletter instantly
				</td>
			</tr>
			<tr>
				<td align="center" style="padding: 20px 0 0 0;">
					<table border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td width="37" style="text-align: center; padding: 0 10px 0 10px;">
								<a href="http://www.facebook.com/">
									<img src="images/facebook.png" width="37" height="37" alt="Facebook" border="0" />
								</a>
							</td>
							<td width="37" style="text-align: center; padding: 0 10px 0 10px;">
								<a href="http://www.twitter.com/">
									<img src="images/twitter.png" width="37" height="37" alt="Twitter" border="0" />
								</a>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>`
	return wholeEmail = 
		`<html>
			`+head+`
			<body yahoo bgcolor="#f6f8f1">
				<table width="100%" bgcolor="#f6f8f1" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td>
							`+emailHeader+`
							`+emailHeaderText+`
						</td>
					</tr>
					<tr>
						<td>
							`+emailBody+`
						</td>
					</tr>
					<tr>
						<td>
							`+emailFooter+`
						</td>
					</tr>
				</table>
			</body>
		</html>`
}