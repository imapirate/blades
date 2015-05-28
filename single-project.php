<?php

$post = new PH_Project();
$data['post'] = $post;
$data['user'] = new TimberUser();
$data['theme'] = new TimberTheme();
if ( post_password_required( $post->ID ) ) {
	Timber::render( '/pm-home/single-project-password.twig', $data );
} else {
	Timber::render( '/pm-home/single-project.twig', $data );
}
