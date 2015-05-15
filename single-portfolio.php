<?php
/**
 * The Template for displaying all single portfolio posts.
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

	$data = Timber::get_context();

	$pi = new PortfolioEntry();
	$data['post'] = $pi;

	if ($pi->custom_title_tag){
		$data['wp_title'] = $pi->custom_title_tag. ' - Upstatement Portfolio';
	} else {
		$data['wp_title'] = 'Upstatement Portfolio - ' .$pi->title();
	}
	if ($pi->custom_description){
		$data['meta_desc'] = $pi->custom_description;
	} else {
		$data['meta_desc'] = strip_tags($pi->get_preview(30, true, '', true));
	}
	$plist = array('post_type' => 'portfolio', 'meta_key' => '_thumbnail_id', 'numberposts' => '6', 'post__not_in' => array($pi->ID));
	$data['plist'] = Timber::get_posts($plist);

	$fp = new TimberPost(3251);
	$fp->squares = get_field('squares', $fp->ID);
	$billboards = array();
	$billboard_ids = array();
	foreach($fp->squares as $square){
		$bb = new TimberPost($square);
		$billboard_ids[] = $bb->ID;
		$bb->billboard = new TimberImage($bb->billboard);
		if (isset($bb->hero_tease)){
			$bb->hero_tease = new TimberImage($bb->hero_tease);
		}
		$billboards[] = $bb;
	}
	$data['billboards'] = $billboards;

	if (post_password_required($post->ID)){
		Timber::render('single-password.twig', $data);
	} else {
		$templates = array('custom/single-portfolio-'.$pi->slug.'.twig', 'single-portfolio.twig');
		Timber::render($templates, $data);
	}
