( function ( blocks, element, serverSideRender, blockEditor, components, i18n ) {
	var __ = i18n.__,
		el = element.createElement,
		registerBlockType = blocks.registerBlockType,
		ServerSideRender = serverSideRender,
		useBlockProps = blockEditor.useBlockProps,
		InspectorControls = blockEditor.InspectorControls,
		BlockControls = element.BlockControls,
		PanelBody = components.PanelBody,
		SelectControl = components.SelectControl;
		NumberControl = components.__experimentalNumberControl;

	registerBlockType( 'course-booking-system/preview', {
		apiVersion: 3,
		title: __( 'Preview', 'course-booking-system' ),
		description: __( 'Display a preview of upcoming courses with a specific date on the page.', 'course-booking-system' ),
		icon: 'editor-table',
		category: 'widgets',
		supports: {
			align: true,
			alignWide: true
		},
		attributes: {
			category: {
				type: 'array',
				default: []
			},
			months: {
				type: 'integer',
				default: 6
			}
		},

		edit: function ( props ) {
			var blockProps = useBlockProps();

			// Get course categotory taxonomy for select options
			const taxonomies = wp.data.select( 'core' ).getEntityRecords( 'taxonomy', 'course_category', {per_page: -1} );
			const options = [];
			jQuery.each( taxonomies, function( key, val ) {
				options.push( { value: val.id, label: val.name } );
			});

			return [
				el( 'div', blockProps,
					el( ServerSideRender, {
						block: 'course-booking-system/preview',
						attributes: props.attributes,
					} )
				),
				el( InspectorControls, { key: 'setting' },
					el( PanelBody, {
						title: __( 'Preview Attributes', 'course-booking-system' ),
						className: 'block-preview-attributes',
						initialOpen: true
					},
					el( 'p', {}, __( 'Configure the preview according to your needs.', 'course-booking-system' ) ),
					el( SelectControl, {
						label: __( 'Course Category', 'course-booking-system' ),
						value: props.attributes.category,
						multiple: true,
						options: options,
						onChange: function ( newCategory ) {
							props.setAttributes( { category: newCategory } )
						}
					}),
					el( NumberControl, {
						label: __( 'Months', 'course-booking-system' ),
						value: props.attributes.months,
						onChange: function ( newMonths ) {
							props.setAttributes( { months: newMonths } )
						}
					}))
				)
			]
		},
	} );
} )(
	window.wp.blocks,
	window.wp.element,
	window.wp.serverSideRender,
	window.wp.blockEditor,
	window.wp.components,
	window.wp.i18n
);
