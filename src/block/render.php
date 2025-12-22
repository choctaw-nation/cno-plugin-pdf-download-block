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
$pdfs        = $attributes['pdfFiles'];
if ( $attributes['useExternalSource'] && ! empty( $attributes['selectedCPT'] ) ) {
	$pdfs      = array();
	$pdf_query = new WP_Query(
		array(
			'post_type'      => $attributes['selectedCPT'],
			'posts_per_page' => -1,
			'post_status'    => 'publish',
		)
	);
	if ( $pdf_query->have_posts() ) {
		while ( $pdf_query->have_posts() ) {
			$pdf_query->the_post();
			$pdf_file = get_field( 'pdf_file' ); // Assuming ACF field name is 'pdf_file'

			if ( $pdf_file ) {
				$pdfs[] = array(
					'id'    => get_the_ID(),
					'title' => get_field( 'use_post_title_as_form_name' ) ? get_the_title() : $pdf_file['title'],
					'url'   => $pdf_file['url'],
				);
			}
		}
		wp_reset_postdata();
	}
}
wp_interactivity_state(
	'cnoPdfDownloadSelector',
	array(
		'isDisabled' => true,
	)
);
$context = wp_interactivity_data_wp_context(
	array(
		'pdfs' => $pdfs,
		'href' => '#',
	)
);
?>
<div data-wp-interactive="cnoPdfDownloadSelector" <?php echo $block_props . $context; ?>>
	<select name="pdf-form-select" class="pdf-select" data-wp-on--change="actions.updateUrl">
		<option value=""><?php echo esc_textarea( $attributes['selectText'] ); ?></option>
		<template data-wp-each--pdf="context.pdfs" data-wp-each-key="context.pdf.id">
			<option data-wp-bind--value="context.pdf.url" data-wp-text="context.pdf.title">
			</option>
		</template>
		<?php foreach ( $pdfs as $pdf ) : ?>
		<option data-wp-each-child value="<?php echo $pdf['url']; ?>"><?php echo $pdf['title']; ?></option>
		<?php endforeach; ?>
	</select>
	<a class="pdf-download-btn" data-wp-bind--disabled="state.isDisabled" data-wp-bind--href="context.href" target="_blank"><?php echo esc_textarea( $attributes['buttonText'] ); ?></a>
</div>
