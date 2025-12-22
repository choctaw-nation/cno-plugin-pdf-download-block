import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function useAllowedCPTs() {
	const allowedPostTypes = useSelect( ( select ) => {
		const core = select( coreStore );
		const postTypes =
			core.getPostTypes( { per_page: -1 } ) ?? [];

		const publicPostTypes = postTypes
			.filter( ( pt ) => pt.viewable )
			.filter( ( pt ) => ! [ 'attachment', 'post', 'page' ].includes( pt.slug ) );

		// Only include CPTs that have at least one post with acf.pdf_file
		return publicPostTypes
			.filter( ( pt ) => {
				const posts = core.getEntityRecords(
					'postType',
					pt.slug,
					{ per_page: 1, _fields: [ 'acf', 'id', 'title' ] }
				);

				// If posts is undefined, data may still be resolving; treat as not allowed yet
				return Array.isArray( posts ) && posts.some( ( p: any ) => p?.acf?.pdf_file );
			} )
			.map( ( pt ) => ( {
				label: pt.labels?.singular_name ?? pt.slug,
				value: pt.slug,
			} ) );
	}, [] );

	return { allowedPostTypes };
}
