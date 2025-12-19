<?php
/**
 * Render Callback
 *
 * @package ChoctawNation
 * @subpackage PDFDownloadSelector
 */

$block_props = get_block_wrapper_attributes(
	array(
		'class'               => 'd-flex align-items-stretch flex-wrap gap-3 pdf-download-selector',
		'data-wp-interactive' => 'cnoPdfDownloadSelector',
	)
);
$context     = wp_interactivity_data_wp_context( array() );
?>
<div <?php echo $block_props . $context; ?>>
    <select name="pdf-form-select" className="pdf-select">
        <option value=""><?php echo esc_textarea( $attributes['selectText'] ); ?></option>
    </select>
    <a class="pdf-download-btn" href="#"><?php echo esc_textarea( $attributes['buttonText'] ); ?></a>
</div>