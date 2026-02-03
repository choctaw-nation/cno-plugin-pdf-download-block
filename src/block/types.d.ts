export type selectedPDF = {
	id: number;
	url: string;
};

export type selectedPDFWithTitle = selectedPDF & {
	title: string;
};
