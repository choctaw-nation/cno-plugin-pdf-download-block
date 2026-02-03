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
$pdfs        = isset( $attributes['pdfFiles'] ) ? $attributes['pdfFiles'] : array();
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
				// Prefer the attachment ID when available in the ACF file array
				$attachment_id = isset( $pdf_file['ID'] ) ? intval( $pdf_file['ID'] ) : 0;
				$arr           = array(
					'id'  => $attachment_id ? $attachment_id : get_the_ID(),
					'url' => $pdf_file['url'],
				);

				// If configured, use the CPT post title; otherwise prefer the attachment title when we have an attachment ID
				if ( get_field( 'use_post_title_as_form_name' ) ) {
					$pdf_title = get_the_title();
				} elseif ( $attachment_id ) {
					$pdf_title = get_the_title( $attachment_id );
				} else {
					$pdf_title = isset( $pdf_file['title'] ) ? $pdf_file['title'] : '';
				}

				$arr['title'] = html_entity_decode( $pdf_title, ENT_QUOTES, get_bloginfo( 'charset' ) );
				$pdfs[]       = $arr;
			}
		}
		wp_reset_postdata();
	}
}

// Normalize titles: if an entry has an ID for an attachment, fetch the attachment/post title server-side
if ( is_array( $pdfs ) && count( $pdfs ) > 0 ) {
	$normalized = array();
	foreach ( $pdfs as $pdf ) {
		$pdf_id    = isset( $pdf['id'] ) ? intval( $pdf['id'] ) : 0;
		$pdf_title = '';
		if ( $pdf_id ) {
			$maybe_title = get_the_title( $pdf_id );
			if ( $maybe_title ) {
				$pdf_title = $maybe_title;
			}
		}
		if ( empty( $pdf_title ) && isset( $pdf['title'] ) ) {
			$pdf_title = $pdf['title'];
		}
		$pdf_title    = html_entity_decode( $pdf_title, ENT_QUOTES, get_bloginfo( 'charset' ) );
		$pdf['title'] = $pdf_title;
		$normalized[] = $pdf;
	}
	$pdfs = $normalized;
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
		<option value=""><?php echo esc_html( $attributes['selectText'] ); ?></option>
		<template data-wp-each--pdf="context.pdfs" data-wp-each-key="context.pdf.id">
			<option data-wp-bind--value="context.pdf.url" data-wp-text="context.pdf.title">
			</option>
		</template>
		<?php foreach ( $pdfs as $pdf ) : ?>
		<option data-wp-each-child value="<?php echo $pdf['url']; ?>"><?php echo $pdf['title']; ?></option>
		<?php endforeach; ?>
	</select>
	<a class="pdf-download-btn" data-wp-bind--disabled="state.isDisabled" data-wp-bind--href="context.href" target="_blank"><?php echo esc_html( $attributes['buttonText'] ); ?></a>
</div>
