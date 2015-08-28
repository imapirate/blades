<?php
	
	class Test_PM_Home extends WP_UnitTestCase {

		function testSample() {
			$this->assertTrue(true);
		}

		function testHome() {
			$this->factory->post->create_many(8, array('post_type' => 'project') );
			$this->assertEquals( 0, count(PH_Projects::get_projects()) );
			wp_set_current_user(1);
			$this->assertEquals( 8, count(PH_Projects::get_projects()) );
		}

	}