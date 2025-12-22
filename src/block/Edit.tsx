import { useBlockProps, RichText } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import BlockSettings from './BlockSettings';
import useFilesPreview from './hooks/useFilesPreview';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { buttonText } = attributes;
	const { options } = useFilesPreview( attributes );
	const blockProps = useBlockProps( {
		className: 'pdf-download-selector',
	} );

	return (
		<Fragment>
			<BlockSettings { ...props } />
			<div { ...blockProps }>
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label="Select a PDF"
					hideLabelFromVision={ true }
					value={ '' }
					onChange={ () => null }
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
