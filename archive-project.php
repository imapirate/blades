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

	$term = new TimberTerm();
	$data['title'] = "Project Homes";

	if (is_user_logged_in()) {
		$data['blog_cron'] = Timber::get_posts(array('orderby' => 'title', 'post_type' => 'project', 'order' => 'ASC'));
	}

	$data['tags'] = Timber::get_terms(array(
		'tax' => 'tags',
		'orderby' => 'count'
	));
	shuffle($data['tags']);
	$data['tags'] = TimberHelper::array_truncate($data['tags'], 10);

	$next_page = $page + 1;
	if ($page == 0){
		$next_page = 2;
	}

	if ($api){
		Timber::render('archive-blog-loop.twig', $data);
	} else {
		$data['sidebar'] = Timber::get_sidebar('sidebar.php');
		Timber::render('archive-blog.twig', $data);
	}