<div id="ajax"></div>
<div id="ajax-loader" class="loader"><div></div><div></div><div></div></div>

<div id="course" class="entry-content course">
	<?php
	if ( file_exists( plugin_dir_path( __FILE__ ) . '../includes/ajax/single-course.php' ) )
		require plugin_dir_path( __FILE__ ) . '../includes/ajax/single-course.php';
	?>
</div>
<div id="course-loader" class="loader"><div></div><div></div><div></div></div>