import { store, getContext } from '@wordpress/interactivity';

type Context = {
	href: string;
};

const { actions } = store( 'cnoPdfDownloadSelector', {
	state: {
		get isDisabled() {
			const context = getContext() as Context;
			return context.href === '#' || context.href === '';
		},
	},
	actions: {
		updateUrl( event: Event ) {
			const context = getContext();
			const select = event.target as HTMLSelectElement;
			context.href = select.value;
		},
		downloadFile() {
			const context = getContext() as Context;
			return context.href;
		},
	},
} );
