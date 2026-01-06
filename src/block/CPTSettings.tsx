import {
	SelectControl,
	PanelBody,
	Flex,
	FlexBlock,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import useAllowedCPTs from './hooks/useAllowedCPTs';

export default function CPTSettings( { attributes, setAttributes } ) {
	const { allowedPostTypes } = useAllowedCPTs();

	useEffect( () => {
		if ( allowedPostTypes.length === 1 && ! attributes.selectedCPT ) {
			setAttributes( { selectedCPT: allowedPostTypes[ 0 ].value } );
		}
	}, [ allowedPostTypes, attributes.selectedCPT, setAttributes ] );
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
						disabled={ allowedPostTypes.length <= 1 }
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
