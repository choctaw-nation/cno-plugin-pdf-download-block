import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import BlockSettings from './BlockSettings';
import useFilesPreview from './hooks/useFilesPreview';
import usePdfFilesWithTitles from './hooks/usePdfFilesWithTitles';
import { Spinner } from '@wordpress/components';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { buttonText, selectText } = attributes;
	const { options, isResolving } = useFilesPreview( attributes );
	const { selectedPDFs, isLoading } = usePdfFilesWithTitles( attributes.pdfFiles );
	const blockProps = useBlockProps( {
		className: 'pdf-download-selector',
	} );

	const isLoadingActual = isLoading || isResolving;

	return (
		<Fragment>
			<BlockSettings { ...props } />
			<div { ...blockProps }>
				<label htmlFor="pdf-select" className="pdf-select-label" style={ { opacity: 0, position: 'absolute', pointerEvents: 'none' } }>
					{ selectText }
				</label>
				{ isLoadingActual && <Spinner /> }
				{ ! isLoadingActual && ( <select name="pdf-form-select" className="pdf-select" id="pdf-select" disabled={ isResolving } style={ { maxWidth: 'unset', fontFamily: 'var(--wp--preset--font-family--body)' } }>
					{ attributes.useExternalSource ? options.map( ( option, index ) => (
						<option key={ index } value={ option.value } dangerouslySetInnerHTML={ { __html: option.label } } />
					) ) : selectedPDFs.map( ( file ) => (
						<option key={ file.id } value={ file.url }>
							{ file.title }
						</option>
					) ) }
				</select> ) }
				<RichText
					tagName="button"
					disabled={ isResolving }
					className="pdf-download-btn"
					value={ buttonText }
					onChange={ ( val: string ) => {
						setAttributes( { buttonText: val } );
					} }
				/>
			</div>
		</Fragment>
	);
}
