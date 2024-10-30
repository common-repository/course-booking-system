<?php
function cbs_elementor_widgets( $widgets_manager ) {
	require_once( __DIR__ . '/timetable.php' );
	require_once( __DIR__ . '/preview.php' );

	$widgets_manager->register( new \Elementor_Timetable() );
	$widgets_manager->register( new \Elementor_Preview() );
}
add_action( 'elementor/widgets/register', 'cbs_elementor_widgets' );