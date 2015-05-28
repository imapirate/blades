<?php

class PH_Project extends TimberPost {

	function get_applications() {
		$apps = $this->get_field('applications');
		$fo = get_field_object('applications', $this->ID);
		$services = $fo['sub_fields'][0]['choices'];
		if (is_array($apps)) {
			foreach($apps as &$app) {
				$app['service_label'] = $services[$app['service']];
				if (isset($app['custom_label']) && $app['custom_label']) {
					$app['service_label'] = $app['custom_label'];
				}
			}
		}
		return $apps;
	}

}
