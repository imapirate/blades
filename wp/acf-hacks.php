<?php

class ACFHacks {
	public static function map_page_rule_to_slug( $page_id, $slug ) {
		add_filter( 'acf/location/rule_match/page', function( $default_value, $rule, $current ) use ( $page_id, $slug ) {
				$pid = $rule['value'];
				if ( $pid == $page_id ) {
					$post = new TimberPost( $current['post_id'] );
					if ( $post->slug == $slug ) {
						return true;
					}
				}
				return $default_value;
			}, 10, 3 );
	}
}
