import { useBlockProps, RichText } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { useState, useEffect, Fragment } from '@wordpress/element';
import BlockSettings from './BlockSettings';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { pdfFiles, buttonText, selectText } = attributes;
	const [ selectedPdf, setSelectedPdf ] = useState( '' );
	const blockProps = useBlockProps( {
		className: 'pdf-download-selector',
	} );

	const options = [ { label: selectText, value: '' } ].concat(
		pdfFiles.map( function ( file ) {
			return { label: file.title, value: file.url };
		} )
	);
	return (
		<Fragment>
			<BlockSettings { ...props } />
			<div { ...blockProps }>
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label="Select a PDF"
					hideLabelFromVision={ true }
					value={ selectedPdf }
					onChange={ ( value: string ) => {
						setSelectedPdf( value );
					} }
					options={ options }
					className="pdf-select"
				/>
				<RichText
					tagName="button"
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
