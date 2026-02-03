import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { selectedPDF, selectedPDFWithTitle } from '../types';

export default function usePdfFilesWithTitles( pdfFiles ) {
	const [ selectedPDFs, setSelectedPDFs ] = useState<selectedPDFWithTitle[]>( [] );
	const [ isLoading, setIsLoading ] = useState<boolean>( false );
	useEffect( () => {
		if ( ! Array.isArray( pdfFiles ) ) {
			return;
		}
		setIsLoading( true );
		const fetchTitles = async () => {
			try {
				const promises = pdfFiles.map( async ( file: selectedPDF ) => {
					const res = await apiFetch( { path: `/wp/v2/media/${ file.id }?_fields=title` } );
					return {
						...file,
						title: res && res.title && res.title.rendered ? res.title.rendered : '',
					};
				} );
				const results = await Promise.all( promises );
				setSelectedPDFs( results );
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( 'Error fetching PDF titles:', error );
			} finally {
				setIsLoading( false );
			}
		};
		fetchTitles();
	}, [ pdfFiles ] );
	return { selectedPDFs, isLoading };
}
