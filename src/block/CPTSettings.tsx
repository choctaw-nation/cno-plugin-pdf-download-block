import {
	SelectControl,
	PanelBody,
	Flex,
	FlexBlock,
} from '@wordpress/components';
import useAllowedCPTs from './hooks/useAllowedCPTs';

export default function CPTSettings( { attributes, setAttributes } ) {
	const { allowedPostTypes } = useAllowedCPTs();
	return (
		<PanelBody
			title="CPT Settings"
			initialOpen={ allowedPostTypes?.length > 0 }
		>
			<Flex direction={ 'column' } gap={ 6 }>
				<FlexBlock>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						options={ allowedPostTypes }
						label="Select a post type"
						help="Select the custom post type from which to load PDFs."
						value={ attributes.selectedCPT }
						onChange={ ( value: string ) => {
							setAttributes( { selectedCPT: value } );
						} }
					/>
				</FlexBlock>
			</Flex>
		</PanelBody>
	);
}
