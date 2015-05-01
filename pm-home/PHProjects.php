<?php

class PH_Projects {

	function __construct() {
		$this->autoload();
		$this->init();
	}

	function init() {
		register_post_type('project', array(
			'label' => 'Projects',
			'public' => true,
			'menu_icon' => 'dashicons-welcome-view-site',
			'rewrite' => array('slug' => 'projects', 'with_front' => false),
			'supports' => array('title','revisions','page-attributes')
		));
	}

	function autoload() {
		require_once('PHProject.php');
	}

}
