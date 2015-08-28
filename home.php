<?php
	$data = Timber::get_context();
	$data['meta_desc'] = 'Upstatement is a boutique, cross-disciplinary design firm that solves problems through design, code, and rapid prototyping.';
	$data['wp_title'] = 'Upstatement - '.get_bloginfo('description');

	/* organzie the hero images */
	$data['heros'] = get_field('billboards', 'options');
	foreach($data['heros'] as &$slide){
		$slide['post'] = new TimberPost($slide['portfolio'][0]);
	}
	/* organize the promos */
	$promos = get_field('homepage_promos', 'option');
	$data['promos'] = Timber::get_posts($promos);

	$data['blogs'] = Blades_Home::get_blog_posts();

	$highlights = get_field('highlights', 'options');
	$highlight_posts = Timber::get_posts(array(
		"post__in" => $highlights,
		"post_type" => "highlight",
		"ignore_sticky_posts" => 1
		));
	$data['highlights'] = array_chunk($highlight_posts, 2);
	$data['logo_pond'] = get_field('logo_pond', 'options');

	Timber::render('home.twig', $data, 600);



