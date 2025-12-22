import { useSelect, select } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';

export default function useFilesPreview( {
	selectText,
	pdfFiles,
	useExternalSource,
	selectedCPT,
} ) {
	const posts = useSelect(
		( select ) => select( coreStore ).getEntityRecords(
			'postType',
			selectedCPT,
			{
				per_page: -1,
				_fields: [ 'acf', 'id', 'title' ],
			}
		),
		[ selectedCPT ]
	);

	const postsAsOptions = posts?.map( ( post ) => {
		const file = select( coreStore ).getEntityRecord( 'postType', 'attachment', post.acf.pdf_file );
		return {
			label: post.acf.use_post_title_as_form_name ? post.title.rendered : ( file?.title?.rendered || 'Loading...' ),
			value: file?.source_url || '',
		};
	} ) || [];

	const [ options, setOptions ] = useState<
		{ label: string; value: string }[]
	>( [ { label: selectText, value: '' } ] );

	useEffect( () => {
		const newOptions = [ { label: selectText, value: '' } ];
		if ( ! useExternalSource ) {
			pdfFiles.forEach( ( file ) => {
				newOptions.push( { label: file.title, value: file.url } );
			} );
			setOptions( newOptions );
		} else if ( posts && posts.length > 0 ) {
			const newOptions = [ { label: selectText, value: '' }, ...postsAsOptions ];
			setOptions( newOptions );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ selectText, pdfFiles, useExternalSource, posts ] );

	return { options };
}
