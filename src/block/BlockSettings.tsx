import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	ToggleControl,
	Tip,
	ExternalLink,
	Flex,
	FlexBlock,
} from '@wordpress/components';
import CPTSettings from './CPTSettings';

export default function BlockSettings( props ) {
	const { attributes, setAttributes } = props;
	const { pdfFiles, selectText, useExternalSource } = attributes;

	function addPdf( media: any ) {
		if ( useExternalSource ) {
			return;
		}
		if ( media && media.url && media.mime === 'application/pdf' ) {
			const entry = {
				id: media.id,
				url: media.url,
				title: media.title || media.filename,
			};
			setAttributes( { pdfFiles: [ ...pdfFiles, entry ] } );
		}
	}

	function removePdf( index: number ) {
		if ( useExternalSource ) {
			return;
		}
		const updated = pdfFiles.slice();
		updated.splice( index, 1 );
		setAttributes( { pdfFiles: updated } );
	}
	return (
		<InspectorControls>
			<PanelBody title="PDF Source Options" initialOpen={ true }>
				<Flex direction={ 'column' } gap={ 6 }>
					<FlexBlock>
						<ToggleControl
							__nextHasNoMarginBottom
							label="Use CPT"
							checked={ useExternalSource }
							onChange={ ( value: boolean ) =>
								setAttributes( { useExternalSource: value } )
							}
							help={
								useExternalSource
									? 'Loading PDFs from a CPT'
									: 'Manually upload PDFs'
							}
						/>
					</FlexBlock>
					<FlexBlock>
						{ ! useExternalSource ? (
							<Tip>
								Use a “Synced Pattern” to keep PDFs in sync
								across the site.
							</Tip>
						) : (
							<Tip>
								PDFs are loaded from Tribal Forms.
								<br />
								<ExternalLink href="/wp-admin/edit.php?post_type=tribal-form">
									Manage Tribal Forms
								</ExternalLink>
							</Tip>
						) }
					</FlexBlock>
				</Flex>
			</PanelBody>
			<PanelBody title="Form Settings">
				<Flex direction={ 'column' } gap={ 6 }>
					<FlexBlock>
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Select Dropdown Text"
							value={ selectText }
							onChange={ ( value: string ) => {
								setAttributes( { selectText: value } );
							} }
						/>
					</FlexBlock>
					{ ! useExternalSource && (
						<>
							<FlexBlock>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ addPdf }
										allowedTypes={ [ 'application/pdf' ] }
										render={ ( args: {
											open: () => void;
										} ) => (
											<Button
												variant="primary"
												onClick={ args.open }
											>
												Add PDF
											</Button>
										) }
									/>
								</MediaUploadCheck>
							</FlexBlock>
							<FlexBlock>
								{ pdfFiles.length > 0 &&
									pdfFiles.map(
										( file: any, index: number ) => (
											<div
												key={ index }
												style={ { marginTop: '1rem' } }
											>
												<strong>{ file.title }</strong>
												<Button
													isDestructive
													onClick={ () =>
														removePdf( index )
													}
													style={ {
														marginLeft: '.5rem',
													} }
												>
													Remove
												</Button>
											</div>
										)
									) }
							</FlexBlock>
						</>
					) }
				</Flex>
			</PanelBody>
			{ useExternalSource && <CPTSettings { ...props } /> }
		</InspectorControls>
	);
}
