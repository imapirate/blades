<?php
/**
* The Template for displaying all single posts.
*
* @package WordPress
* @subpackage Boilerplate
* @since Boilerplate 1.0
*/


	$data = Timber::get_context();
	$data['post'] = new TimberPost();
	Timber::render('single-job.twig', $data);
