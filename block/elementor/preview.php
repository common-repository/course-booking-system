<?php
class Elementor_Preview extends \Elementor\Widget_Base {

	public function get_name() {
		return 'cbs_preview';
	}

	public function get_title() {
		return esc_html__( 'Preview', 'course-booking-system' );
	}

	public function get_icon() {
		return 'eicon-table';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	public function get_keywords() {
		return [ 'course', 'booking', 'system', 'preview', 'schedule' ];
	}

	protected function register_controls() {
		$this->start_controls_section(
			'section_title',
			[
				'label' => esc_html__( 'Preview Attributes', 'course-booking-system' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT
			]
		);

		$options = [];
		$terms = get_terms([
			'taxonomy' => 'course_category',
			'hide_empty' => false
		]);
		foreach ( $terms as $term ) :
			$options[$term->term_id] = $term->name;
		endforeach;

		$this->add_control(
			'category',
			[
				'label' => esc_html__( 'Course Category', 'course-booking-system' ),
				'type' => \Elementor\Controls_Manager::SELECT2,
				'label_block' => true,
				'multiple' => true,
				'default' => '',
				'options' => $options
			]
		);

		$this->add_control(
			'months',
			[
				'label' => esc_html__( 'Months', 'course-booking-system' ),
				'type' => \Elementor\Controls_Manager::NUMBER,
				'default' => 6
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$atts = $this->get_settings_for_display();

		echo cbs_shortcode_preview( $atts );
	}
}