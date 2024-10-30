// Single: QuickEdit
jQuery( function( $ ) {
	if ( typeof inlineEditPost !== 'undefined' ) {
		const wp_inline_edit_function = inlineEditPost.edit;
		inlineEditPost.edit = function( post_id ) {
			wp_inline_edit_function.apply( this, arguments );

			if ( typeof( post_id ) == 'object' )
				post_id = parseInt( this.getId( post_id ) );

			const edit_row = $( '#edit-' + post_id );
			const post_row = $( '#post-' + post_id );

			const free = 1 == $( '.column-price_level > *', post_row ).data( 'free' ) ? true : false;
			const price_level = $( '.column-price_level > *', post_row ).data( 'price-level' );
			const attendance = $( '.column-attendance', post_row ).text();

			$( ':input[name="free"]', edit_row ).prop( 'checked', free );
			$( ':input[name="price_level"]', edit_row ).val( price_level );
			$( ':input[name="price_level"]', edit_row ).next().text( price_level );
			$( ':input[name="attendance"]', edit_row ).val( attendance );

			if ( free ) {
				$( ':input[name="price_level"]', edit_row ).parent().hide();
			} else {
				$( '.inline-edit-price_level', edit_row ).parent().show();
			}
		}

		$( '.inline-edit-group input[name="free"]' ).change( function() {
			if ( $( this ).is( ':checked' ) ) {
				$( this ).parent().next().hide();
			} else {
				$( this ).parent().next().show();
			}
		});
	}
});

// Single: Output of input[type="range"]
// if ( jQuery( 'input[name="price_level"]' ).length == 1 ) {
	jQuery( document ).on( 'input change', 'input[name="price_level"]', function() {
		jQuery( this ).next().text( jQuery( this ).val() );
	});
// }

// Single: Hide price level for free courses
jQuery( '#free' ).change( function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#price_level_container' ).hide();
	} else {
		jQuery( '#price_level_container' ).show();
	}
});

// Single: Add Timeslot
jQuery( document ).ready( function() {

	jQuery( document ).on( 'click', '.add-timeslot', function( e ) {
		e.preventDefault();
		jQuery( '#ajax-loader' ).show();

		let post_id = parseInt( jQuery( '#post_ID' ).val() );
		let id = jQuery( 'input[name^=id]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();
		let day = jQuery( 'select[name^=day]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();
		let date = jQuery( 'input[name^=date]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();
		let start = jQuery( 'input[name^=start]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();
		let end = jQuery( 'input[name^=end]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();
		let user_id = jQuery( 'select[name^=user_id]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();

		jQuery.ajax({
			type: 'POST',
			url: course_booking_system_ajax.ajaxurl,
			data: {
				action: 'cbs_add_timetable',
				post_id: post_id,
				id: id,
				day: day,
				date: date,
				start: start,
				end: end,
				user_id: user_id
			}, success: function( data, textStatus, XMLHttpRequest ) {
				jQuery( '#ajax-admin' ).html( data );
				jQuery( '#ajax-loader' ).hide();
			}, error: function( XMLHttpRequest, textStatus, errorThrown ) {
				alert( errorThrown );
				jQuery( '#ajax-loader' ).hide();
			}
		});
	});

	jQuery( document ).on( 'click', '.delete-timeslot', function( e ) {
		e.preventDefault();
		jQuery( '#ajax-loader' ).show();

		let delete_id = parseInt( jQuery( this ).parent().parent().find( 'input.id' ).val() );
		let post_id = parseInt( jQuery( '#post_ID' ).val() );
		let id = jQuery( 'input[name^=id]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();
		let day = jQuery( 'select[name^=day]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();
		let date = jQuery( 'input[name^=date]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();
		let start = jQuery( 'input[name^=start]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();
		let end = jQuery( 'input[name^=end]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();
		let user_id = jQuery( 'select[name^=user_id]' ).map( function( index, element ) { return jQuery( element ).val(); }).get();

		jQuery.ajax({
			type: 'POST',
			url: course_booking_system_ajax.ajaxurl,
			data: {
				action: 'cbs_delete_timetable',
				delete_id: delete_id,
				post_id: post_id,
				id: id,
				day: day,
				date: date,
				start: start,
				end: end,
				user_id: user_id
			}, success: function( data, textStatus, XMLHttpRequest ) {
				jQuery( '#ajax-admin' ).html( data );
				jQuery( '#ajax-loader' ).hide();
			}, error: function( XMLHttpRequest, textStatus, errorThrown ) {
				alert( errorThrown );
				jQuery( '#ajax-loader' ).hide();
			}
		});
	});
});

// Settings: Automatic course cancellation
jQuery( '#course_booking_system_auto_cancel' ).change(function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-auto_cancel_number' ).show();
		jQuery( '#tr-auto_cancel_advance' ).show();
	} else {
		jQuery( '#tr-auto_cancel_number' ).hide();
		jQuery( '#tr-auto_cancel_advance' ).hide();
	}
});

// Settings: Referral
jQuery( '#course_booking_system_woocommerce_referral' ).change(function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-referral_price_level' ).show();
	} else {
		jQuery( '#tr-referral_price_level' ).hide();
	}
});

// Settings: Email cancel address
jQuery( '#course_booking_system_email_cancel' ).change(function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-email_cancel_address' ).show();
	} else {
		jQuery( '#tr-email_cancel_address' ).hide();
	}
});

// Settings: Email waitlist address
jQuery( '#course_booking_system_email_waitlist' ).change(function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-email_waitlist_address' ).show();
	} else {
		jQuery( '#tr-email_waitlist_address' ).hide();
	}
});

// Settings: Email expiry
jQuery( '#course_booking_system_email_expire' ).change(function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#div-email_expire' ).show();
	} else {
		jQuery( '#div-email_expire' ).hide();
	}
});

// Settings: Disable autofocus on inputs and textareas
jQuery( 'body.settings_page_course_booking_system input.regular-text' ).trigger( 'blur' );
jQuery( 'body.settings_page_course_booking_system textarea.large-text' ).trigger( 'blur' );

// User: Card
Date.prototype.yyyymmdd = function() {
	var yyyy = this.getFullYear().toString();
	var mm = ( this.getMonth() + 1 ).toString();
	var dd = this.getDate().toString();
	return yyyy + '-' + ( mm[1] ? mm : '0' + mm[0] ) + '-' + ( dd[1] ? dd : '0' + dd[0] ); // padding
};

jQuery( '#card' ).change( function() {
	var date = new Date();
	var selectedDate = new Date( jQuery( '#expire' ).val() );
	if ( !jQuery( '#expire' ).val() || selectedDate < date ) {
		date.setMonth( date.getMonth() + 1 );
		jQuery( '#expire' ).val( date.yyyymmdd() );
	}
});

jQuery( '#card_2' ).change( function() {
	var date = new Date();
	var selectedDate = new Date( jQuery( '#expire_2' ).val() );
	if ( !jQuery( '#expire_2' ).val() || selectedDate < date ) {
		date.setMonth( date.getMonth() + 1 );
		jQuery( '#expire_2' ).val( date.yyyymmdd() );
	}
});

jQuery( '#card_3' ).change( function() {
	var date = new Date();
	var selectedDate = new Date( jQuery( '#expire_3' ).val() );
	if ( !jQuery( '#expire_3' ).val() || selectedDate < date ) {
		date.setMonth( date.getMonth() + 1 );
		jQuery( '#expire_3' ).val( date.yyyymmdd() );
	}
});

jQuery( '#card_4' ).change( function() {
	var date = new Date();
	var selectedDate = new Date( jQuery( '#expire_4' ).val() );
	if ( !jQuery( '#expire_4' ).val() || selectedDate < date ) {
		date.setMonth( date.getMonth() + 1 );
		jQuery( '#expire_4' ).val( date.yyyymmdd() );
	}
});

jQuery( '#card_5' ).change( function() {
	var date = new Date();
	var selectedDate = new Date( jQuery( '#expire_5' ).val() );
	if ( !jQuery( '#expire_5' ).val() || selectedDate < date ) {
		date.setMonth( date.getMonth() + 1 );
		jQuery( '#expire_5' ).val( date.yyyymmdd() );
	}
});

// User: Subscription
jQuery( '#abo' ).change( function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-abo_course' ).show();
	} else {
		jQuery( '#tr-abo_course' ).hide();
	}
});

jQuery( '#abo_2' ).change( function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-abo_course_2' ).show();
	} else {
		jQuery( '#tr-abo_course_2' ).hide();
		jQuery( '#abo_course_2 option:selected' ).removeAttr( 'selected' );
	}
});

jQuery( '#abo_3' ).change( function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-abo_course_3' ).show();
	} else {
		jQuery( '#tr-abo_course_3' ).hide();
		jQuery( '#abo_course_3 option:selected' ).removeAttr( 'selected' );
	}
});

jQuery( '#abo_10' ).change( function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '.tr-abo_course_10' ).show();
	} else {
		jQuery( '.tr-abo_course_10' ).hide();
		jQuery( '#abo_course_4 option:selected' ).removeAttr( 'selected' );
		jQuery( '#abo_course_5 option:selected' ).removeAttr( 'selected' );
		jQuery( '#abo_course_6 option:selected' ).removeAttr( 'selected' );
		jQuery( '#abo_course_7 option:selected' ).removeAttr( 'selected' );
		jQuery( '#abo_course_8 option:selected' ).removeAttr( 'selected' );
		jQuery( '#abo_course_9 option:selected' ).removeAttr( 'selected' );
		jQuery( '#abo_course_10 option:selected' ).removeAttr( 'selected' );
	}
});

jQuery( document ).on( 'click', '#date-multiselect-container > .date-multiselect > .notice-dismiss', function( e ) {
	let date = jQuery( this ).parent().data( 'date' );

	let abo_alternate = jQuery( '#abo_alternate' ).val();
	abo_alternate = abo_alternate.replace( date+',', '' );
	abo_alternate = abo_alternate.replace( ','+date, '' );
	jQuery( '#abo_alternate' ).val( abo_alternate );

	jQuery( this ).parent().hide();
});

// User: Flatrate
jQuery( '#flat' ).change( function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-flat_expire' ).show();
	} else {
		jQuery( '#tr-flat_expire' ).hide();
	}
});

jQuery( '#flat_2' ).change( function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-flat_expire_2' ).show();
	} else {
		jQuery( '#tr-flat_expire_2' ).hide();
	}
});

jQuery( '#flat_3' ).change( function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-flat_expire_3' ).show();
	} else {
		jQuery( '#tr-flat_expire_3' ).hide();
	}
});

jQuery( '#flat_4' ).change( function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-flat_expire_4' ).show();
	} else {
		jQuery( '#tr-flat_expire_4' ).hide();
	}
});

jQuery( '#flat_5' ).change( function() {
	if ( jQuery( this ).is( ':checked' ) ) {
		jQuery( '#tr-flat_expire_5' ).show();
	} else {
		jQuery( '#tr-flat_expire_5' ).hide();
	}
});

// User: Logs
jQuery( '#cbs-logs' ).click( function( e ) {
	e.preventDefault();

	jQuery( this ).hide();
	jQuery( 'h2.logs-headline' ).show();
	jQuery( 'table.logs-table' ).show();
});