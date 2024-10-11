<?php

/*
  Plugin Name: Paratrooper-map
  Version: 1.0
  Author: Ilya
  Author URI: https://github.com/LearnWebCode
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

function bradsboilerplateblocktailwindreactregister() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'bradsboilerplateblocktailwindreactregister' );