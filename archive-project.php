<?php

	$data = Timber::get_context();
	global $wp_query;
	$api = false;
	if (isset($_GET['api'])){
		$api = $_GET['api'];
	}
	$data['base'] = 'base.twig';
	if ($api){
		$data['base'] = 'base-blank.twig';
	}

	$page = 0;
	if ($wp_query->query_vars['paged']){
		$page = $wp_query->query_vars['paged'];
	}

	$data['title'] = "Project Homes";
	$data['posts'] = null;
	if (is_user_logged_in()) {
		$data['posts'] = Timber::get_posts(array('orderby' => 'title', 'post_type' => 'project', 'order' => 'ASC'));
		Timber::render('archive-project.twig', $data);
	} else {
		Timber::render('404.twig', $data);
	}