<?php

	$post = new PH_Project();
	$data['post'] = $post;
	$data['theme'] = new TimberTheme();
	Timber::render('/pm-home/single-project.twig', $data);

