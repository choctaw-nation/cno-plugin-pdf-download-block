// was a js IIFE by Telex
// now is TS for reference
// will be converted to Interactivity Store code later
const blocks = document.querySelectorAll( '.pdf-download-selector' );

blocks.forEach( ( block ) => {
	const select = block.querySelector( '.pdf-select' );
	const downloadBtn = block.querySelector( '.pdf-download-btn' );

	if ( ! select || ! downloadBtn ) {
		return;
	}

	function update( url: string | null ) {
		if ( url ) {
			downloadBtn.href = url;
			downloadBtn.classList.remove( 'disabled' );
			downloadBtn.removeAttribute( 'disabled' );
		} else {
			downloadBtn.href = '#';
			downloadBtn.classList.add( 'disabled' );
			downloadBtn.setAttribute( 'disabled', 'true' );
		}
	}

	update( select.value );

	select.addEventListener( 'change', function ( e ) {
		update( ( e.target as HTMLSelectElement ).value );
	} );
} );
