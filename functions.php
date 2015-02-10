<?php
require_once __DIR__.'/wp/acf-blog-options.php';

if ( class_exists( 'Timber' ) ) {
	require_once 'wp/portfolio-entry.php';
	require_once 'wp/blades-site.php';
}

add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );

add_filter( 'timber_context', function( $data ) {
		$data['menu'] = new TimberMenu();
		return $data;
	} );


if ( function_exists( 'acf_add_options_page' ) ) {
	acf_add_options_page( 'Homepage' );
	acf_add_options_page( 'Site Info' );
}

function load_script( $name, $src, $footer = true ) {
	wp_register_script( $name, $src, array(), false, $footer );
	wp_enqueue_script( $name );
	error_log( $src );
}

function load_style( $name, $src, $media = 'all' ) {
	wp_register_style( $name, $src, false, false, $media );
	wp_enqueue_style( $name );
}

function load_scripts() {
	wp_register_script( 'jquery', false, array( 'jquery-core', 'jquery-migrate' ), '1.11.0', true );
	wp_register_script( 'jquery-core', '/wp-includes/js/jquery/jquery.js', array(), '1.11.0', 0 );
	wp_register_script( 'jquery-migrate', "/wp-includes/js/jquery/jquery-migrate.js", array(), '1.2.1', 0 );

	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'jquery-core' );
	wp_enqueue_script( 'jquery-migrate' );

	load_script( 'modernizr', get_stylesheet_directory_uri() . '/components/modernizr/modernizr.js', false );
	error_log( 'loaded scripts' );
}

function load_footer_scripts() {
	load_script( 'inview', get_stylesheet_directory_uri() . '/components/jquery.inview/jquery.inview.js',  1 );
	load_script( 'localScroll', get_stylesheet_directory_uri() .'/components/jquery.localScroll/jquery.localScroll.js', 1 );
	load_script( 'unveil', get_stylesheet_directory_uri() . '/components/unveil/jquery.unveil.js', 1 );
	load_script( 'quickShare', get_stylesheet_directory_uri() . '/components/QuickShare/dist/quickshare.min.js', 1 );
	load_script( 'plugins', get_stylesheet_directory_uri() . '/js/plugins.js', 1 );
	load_script( 'blades', get_stylesheet_directory_uri() . '/js/blades.app.js', 1 );

	load_script( 'scrollTo', get_stylesheet_directory_uri() . '/components/jquery.scrollTo/jquery.scrollTo.js', 1 );
}

add_action( 'wp_enqueue_scripts', 'load_scripts' );


update_option( 'siteurl', 'http://'.$_SERVER['HTTP_HOST'] );
update_option( 'home', 'http://'.$_SERVER['HTTP_HOST'] );

if ( class_exists( 'Timber' ) ) {
	Timber::add_route( 'blog', function( $params ) {
			$sticky = get_option( 'sticky_posts' );
			$sticky = TimberHelper::array_truncate( $sticky, 4 );
			$page = 0;
			$query = array( 'post_type' => 'post', 'posts_per_page' => 6, 'post__not_in' => $sticky, 'offset' => $page * 6 );
			Timber::load_template( 'archive-blog.php', $query );
		} );

	Timber::add_route( 'blog/page/:pg', function( $params ) {
			$sticky = get_option( 'sticky_posts' );
			$sticky = TimberHelper::array_truncate( $sticky, 4 );
			$page = $params['pg'];
			$page -= 1;
			$page = max( 0, $page );
			$query = array( 'post_type' => 'post', 'posts_per_page' => 6, 'post__not_in' => $sticky, 'offset' => $page * 6 );
			Timber::load_template( 'archive-blog.php', $query );
		} );
}

if ( class_exists( 'BladesSite' ) ) {
	BladesSite::register_post_types();
	BladesSite::apply_admin_customizations();

	add_action( 'init', function() {
			BladesSite::register_post_types();
		} );
}


if ( class_exists( 'ChainsawDashboard' ) ) {
	$dashboard = new ChainsawDashboard( 'wp-content/themes/blades/blades-dashboard.json' );
}

add_action( "gform_after_submission_1", function( $entry, $form ) {
		$to = $entry[2];
		$response = Timber::get_post( 'thanks-for-applying' );
		wp_mail( $to, $response->post_title, $response->post_content );
	}, 10, 2 );
