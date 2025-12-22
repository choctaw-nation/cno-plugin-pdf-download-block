# PDF Download Selector Block

A block that allows a user to select a pdf to download.

## How it Works (Generally)

1. The block makes use of both a render callback and the Interactivity API for performant and flexible form downloads and rendering
2. The block stores PDF files as an array in its attributes _unless_ an external data store is selected (see below)
3.

## With An External Data Store (CPT)

If using a CPT as an external data source, the CPT **must** include the following ACF fields;

1.  `pdf_file` a File Field that returns an array
2.  A `True/False` field with the name `use_post_title_as_form_name`

ACF Fields **must** be exposed to the REST API for access in the block editor! See [useAllowedCPTs hook](/src/block/hooks/useAllowedCPTs.tsx) and the [render callback file](/src/block/render.php) for specific implementation.

---

## Changelog

### v1.0.0 - [December 22, 2025]

-   Init block!
