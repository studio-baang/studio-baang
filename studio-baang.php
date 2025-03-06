<?php 
/*
Plugin Name: studio baang
Author: Angba
Description: css, js enqueue
Version: 0.0.0
Requires PHP: 7.4
*/

function wpdocs_theme_name_scripts() {
    $customcsspath = plugin_dir_path( __FILE__ ).'dist/css/custom.css';

    // wp_enqueue_style( 'studio-baang-script-style', plugin_dir_url( __FILE__ ).'dist/js/app.css' );
    wp_enqueue_style( 'studio-baang-montserrat', 'https://fonts.googleapis.com/css2?family=Fustat:wght@200..800&display=swap' );
	wp_enqueue_script( 'studio-baang-script', plugin_dir_url( __FILE__ ). 'dist/js/app.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts', 100 );
add_filter('big_image_size_threshold', '__return_false');

// 1000000 priority so it is executed after all Oxygen's styles
add_action( 'wp_head', 'wpdd_enqueue_css_after_oxygens', 1000000 );
/**
 * Load assets.
 */
function wpdd_enqueue_css_after_oxygens() {
	if ( ! class_exists( 'CT_Component' ) ) {
		return;
	}

	$styles = new WP_Styles;
	$styles->add( 'custom', plugin_dir_url( __FILE__ ).'dist/css/custom.css' );
	$styles->enqueue( array ( 'custom' ) );
	$styles->do_items();
}