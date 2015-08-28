<?php
	
	class Test_Blades_Home extends WP_UnitTestCase {

		function testSample() {
			$this->assertTrue(true);
		}

		function testBlogPosts() {
			$pids = $this->factory->post->create_many(7);
			$pid = $this->factory->post->create();
			stick_post($pid);
			$pid = $this->factory->post->create();
			stick_post($pid);
			$pid = $this->factory->post->create();
			stick_post($pid);
			$posts = Blades_Home::get_blog_posts();
			$this->assertEquals(6, count($posts));	
		}

	}