import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function useAllowedCPTs() {
	const allowedPostTypes = useSelect( ( select ) => {
		const allPostTypes = select( coreStore ).getPostTypes( { per_page: -1 } );
		const publicPostTypes = allPostTypes
			?.filter( ( pt ) => pt.viewable )
			.filter( ( pt ) => ! [ 'attachment', 'post', 'page' ].includes( pt.slug ) )
			.filter( ( pt ) => {
				const posts = select( coreStore ).getEntityRecords(
					'postType',
					pt.slug,
					{ per_page: 1, _fields: [ 'acf', 'id', 'title' ] }
				);
				// If posts is undefined, data may still be resolving; treat as not allowed yet
				return Array.isArray( posts ) && posts.some( ( p: any ) => p?.acf?.pdf_file );
			} );
		return publicPostTypes;
	}, [] );

	const allowedPostTypesAsOptions = allowedPostTypes?.map( ( pt ) => ( {
		label: pt.labels?.singular_name ?? pt.slug,
		value: pt.slug,
	} ) ) || [];

	return { allowedPostTypes: allowedPostTypesAsOptions };
}
