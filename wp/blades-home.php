<?php
	class Blades_Home {
		
		public static function get_blog_posts() {
			$data = Timber::get_posts('post_type=post&posts_per_page=6');
			$data = TimberHelper::array_truncate($data, 6);
			return $data;
		}
	}