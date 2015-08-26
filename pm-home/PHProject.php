<?php

class PH_Project extends TimberPost {

	function get_applications() {
		$apps = $this->get_field('applications');
		$fo = get_field_object('applications', $this->ID);
		$services = $fo['sub_fields'][0]['choices'];
		if (is_array($apps)) {
			foreach($apps as $key => &$app) {
				$app['service_label'] = $services[$app['service']];
				if (isset($app['custom_label']) && $app['custom_label']) {
					$app['service_label'] = $app['custom_label'];
				}
				if ( PH_Projects::is_client() ) {
					if ( $app['private'] ) {
						unset($apps[$key]);
					}
				}
			}
		}
		return $apps;
	}

	function get_important_links() {
		$links = $this->get_field('important_links');
		if (is_array($links)) {
			foreach($links as $key => &$link) {
				if ($link['file']) {
					if (!$link['date']) {
						$link['date'] = $link['file']['date'];
					}
				}
				if ( PH_Projects::is_client() ) {
					if ( $link['private'] ) {
						unset($links[$key]);
					}
				}
			}
		}
		return $links;
	}

}
