import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import BlockSettings from './BlockSettings';
import useFilesPreview from './hooks/useFilesPreview';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { buttonText, selectText } = attributes;
	const { options, isResolving } = useFilesPreview( attributes );
	const blockProps = useBlockProps( {
		className: 'pdf-download-selector',
	} );

	return (
		<Fragment>
			<BlockSettings { ...props } />
			<div { ...blockProps }>
				<label htmlFor="pdf-select" className="pdf-select-label" style={ { opacity: 0, position: 'absolute', pointerEvents: 'none' } }>
					{ selectText }
				</label>
				<select name="pdf-form-select" className="pdf-select" id="pdf-select" disabled={ isResolving } style={ { maxWidth: 'unset', fontFamily: 'var(--wp--preset--font-family--body)' } }>
					{ options.map( ( option, index ) => (
						<option key={ index } value={ option.value } dangerouslySetInnerHTML={ { __html: option.label } } />
					) ) }
				</select>
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
