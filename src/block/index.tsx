import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

import Edit from './Edit';
import './style.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
