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


$data = Timber::get_context();
$pi = new TimberPost();
$data['post'] = $pi;
$data['body_class'] .= ' page-'.$pi->post_name;
$template_file = 'page.twig';
if ( file_exists( $_SERVER['DOCUMENT_ROOT'].$data['theme_dir'].'/css/'.$pi->post_type.'-'.$post->post_name.'.css' ) ) {
	$data['post']->css_file = $data['theme_dir'].'/css/'.$pi->post_type.'-'.$post->post_name.'.css';
}
$contribs = TimberHelper::transient( 'timber-contribs', function() {
		require_once __DIR__ . '/vendor/tan-tan-kanarek/github-php-client/tan-tan-kanarek/github-php-client/client/GitHubClient.php';
		$client = new GitHubClient();
		$auth = file_get_contents( __DIR__.'/auth.json' );
		$auth = json_decode( $auth );
		$client->setCredentials( $auth->github->user, $auth->github->pass );
		$contribs = $client->repos->listContributors( 'jarednova', 'timber', array('per_page'=> 100) );
		$extra = count($contribs) % 6;
		$total = count($contribs) - $extra;
		$contribs = TimberHelper::array_truncate($contribs, $total);
		$ret = array();
		foreach ( $contribs as $contrib ) {
			$obj = new stdClass();
			$obj->login = $contrib->getLogin();
			$obj->avatar_url = $contrib->getAvatarUrl();
			$ret[] = $obj;
		}
		return $ret;
	}, 1200 );
$data['contribs'] = $contribs;
Timber::render( array( 'custom/page-'.$pi->post_name.'.twig', 'page-'.$pi->post_name.'.twig', 'page.twig' ), $data );
