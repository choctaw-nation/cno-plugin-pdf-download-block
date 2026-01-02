<?php
/**
 * Plugin Name: CNO PDF Download Selector Block
 * Plugin URI: https://github.com/choctaw-nation/cno-plugin-pdf-download-block
 * Description: A block that allows a user to select a pdf to download
 * Version: 1.0.1
 * Author: Choctaw Nation of Oklahoma
 * Author URI: https://www.choctawnation.com
 * Text Domain: cno
 * License: GPLv3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Requires PHP: 8.2
 * Requires at least: 6.7.0
 * Tested up to: 6.9.0
 *
 * @package ChoctawNation
 * @subpackage PDFDownloadSelector
 */

use ChoctawNation\PDFDownloadSelector\Plugin_Loader;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

require_once __DIR__ . '/inc/class-plugin-loader.php';
$plugin_loader = new Plugin_Loader( plugin_dir_path( __FILE__ ) );

register_activation_hook( __FILE__, array( $plugin_loader, 'activate' ) );
register_deactivation_hook( __FILE__, array( $plugin_loader, 'deactivate' ) );
