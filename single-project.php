<?php

	$post = new PH_Project();
	$data['post'] = $post;
	$data['user'] = new TimberUser();
	$data['theme'] = new TimberTheme();
	Timber::render('/pm-home/single-project.twig', $data);

