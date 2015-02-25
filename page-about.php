<?php
/**
* The template for displaying all pages.
*
* This is the template that displays all pages by default.
* Please note that this is the wordpress construct of pages
* and that other 'pages' on your wordpress site will use a
* different template.
*
* @package WordPress
* @subpackage Boilerplate
* @since Boilerplate 1.0
*/

	function initials( $name ) {
		// preg_match_all('~\b(\S){1}~', $this->name, $matches);
		// return $matches[1][0].end($matches[1]);
		$name = explode(' ', $name);
		$last = end($name);
		$first = reset($name);
		return strtoupper($first[0]).strtoupper($last[0]);
	}

	$data = Timber::get_context();
	$pi = new TimberPost();
	$data['post'] = $pi;
	$people = get_field('person', $pi->ID);
	foreach( $people as &$person ) {
		$person['initials'] = initials($person['name']);
	}
	$data['people'] = $people;
	$data['wp_title'] = 'About Upstatement';
	Timber::render('page-about.twig', $data);
