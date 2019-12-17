<?php
// function side_bar_contact_form()
// {
// 	if(isset($_POST['contact-submit']))
// 	{
// 		$headers = 'From: '.$_POST['sname'].' '.$_POST['semail']. "\r\n";
// 		$message = <<<DOC
// 		<!DOCTYPE>
// 		<html>
// 		<head></head>
// 		<body>
// 				<pre>
//
// 					Name : {$_POST['sname']}
// 					Email : {$_POST['semail']}
// 					Contact # : {$_POST['scontact']}
// 					Message :
//
// 					{$_POST['smessage']}
//
// 				<pre/>
// 		</body>
// 		</html>
//
// 		DOC;
//
// 		wp_mail($_POST['semail'],'Social Bullfrog | Inquiry',$message);
// 		$referer = $_SERVER['HTTP_REFERER'];
// 		echo '<script type="text/javascript">alert("Successfully sent !");window.location.href="'.$referer.'"</script>';
//
// 	}
// }
// side_bar_contact_form();

function create_post_types()
{
	register_post_type( 'portfolio', array(
		'labels' => array(
			'name' => __( 'Portfolio List' ),
			'singular_name' => __( 'Portfolio List' ),
		),
		'public' => true,
		'supports' => array( 'title', 'editor', 'thumbnail', 'page-attributes', 'custom-fields',  ),
	) );

	// register_post_type( 'home_slider', array(
	// 	'labels' => array(
	// 		'name' => __( 'Home Slider' ),
	// 		'singular_name' => __( 'Home Slider' ),
	// 	),
	// 	'public' => true,
	// 	'supports' => array( 'title', 'editor', 'thumbnail', 'page-attributes',  ),
	// ) );
}

add_action( 'init', 'create_post_types');
add_theme_support( 'post-thumbnails' );
