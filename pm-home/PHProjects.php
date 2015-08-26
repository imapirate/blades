<?php

class PH_Projects {

	function __construct() {
		$this->autoload();
		$this->init();
		$this->add_services();
	}

	function add_services() {
		add_filter('acf/load_field/name=service', array($this, 'get_services'));
	}

	function get_services($services) {
		$choices = array('basecamp' => 'Basecamp', 'dropbox' => 'Dropbox', 'drive' => 'Google Drive', 'github' => 'GitHub', 'trello' => 'Trello', 'link' => 'Link', 'doc' => 'Document', 'pdf' => 'PDF', 'website' => 'Website', 'slack' => 'Slack');
		ksort($choices);
		$services['choices'] = $choices;

		return $services;
	}

	function init() {
		register_post_type('project', array(
			'label' => 'Projects',
			'public' => true,
			'has_archive' => true,
			'menu_icon' => 'dashicons-welcome-view-site',
			'rewrite' => array('slug' => 'projects', 'with_front' => false),
			'supports' => array('title','revisions','page-attributes', 'thumbnail')
		));
	}

	protected function autoload() {
		require_once('PHProject.php');
	}

	public static function is_client() {
		return !is_user_logged_in();
	}

}
