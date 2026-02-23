# Changelog

## 1.9.3 （2025-12-30）

- Performance Enhancement: Significantly accelerated generation speed for Tripo v3.0 base geometry models, reducing processing time for untextured mesh output.
- Texture Quality Improvement: Optimized the texturing pipeline for Tripo v3.0, delivering enhanced color accuracy, improved surface detail fidelity, and more refined material representation.
- Low-Poly Model Addition: Introduced Tripo v2.0 low-polygon model generation with enhanced quality, offering improved geometric topology and better preservation of key features at reduced polygon counts.

## 1.9.2 （2025-11-04）

- Multiview-to-model is now supported with Tripo v3.0 (Standard & Ultra)

## 1.9.1 (2025-09-26)

- Tripo v3.0 Official Launch: The Tripo v3.0 model introduces significant enhancements in geometric interpretation and output. Assets now generate with crisper edges, cleaner surfaces, and an unparalleled level of structural coherence. Ultra Mode unlocks the ability to generate assets with up to 2 million polygons, capturing maximum detail and fidelity for the most demanding creations. Set geometry_quality to detailed to try. The texturing and material generation pipeline has been substantially upgraded for more accurate and physically-based results. Clarity and precision for fine details, including embedded text and complex patterns on surfaces, have been greatly improved. Materials now exhibit more accurate light interaction, with well-balanced colors and natural surface finishes suitable for modern PBR pipelines.
- Improvements Since Beta The geometry generation model has been refined for improved structural soundness. This results in more coherent details and superior handling of complex forms. The geometry generation process has been optimized to resolve critical issues, including the elimination of double-layer surface artifacts. We have also improved surface continuity to significantly reduce the occurrence of gaps or holes Better texture–image alignment, ensuring higher color fidelity

## 1.9.0 (2025-08-12)

- Added: New version v3.0-20250812 (BETA). The detail restoration is greatly improved, the edges are sharper, the hard surface support is better Texture Gen Updated to v3.0-20250812 (BETA). Clarity and realism are both improved, and text rendering capabilities are enhanced. PBR Generator Enhanced. Present more realistic material textures and make the model more tangible

## 1.8.0 (2025-06-18)

This release focuses on migrating Studio’s core algorithm capabilities to the OpenAPI and introducing significant feature enhancements.

- Added:  Introduced new mesh editing task types: mesh_segmentation, smart_low_poly, and mesh_completion. Refer to Mesh Editing for more details. Added text_to_image task type for generating images from text prompts. Enhanced text_to_model, image_to_model, and multiview_to_model tasks with smart_low_poly and generate_parts parameters for finer control over model generation. The convert task now supports additional parameters for advanced customization. All generation task types now support the compress parameter for output optimization. The texture_model task now includes a prompt parameter, accepting text prompt, image prompt, and style_image as style reference for precise control over texture generation. Added the animations parameter to the retarget task, allowing multiple animations in a single request. The pre_rig_check task now returns a rig_type The animate_rig task now accepts parameter spec (options: mixamo or tripo) and rig_type to specify the rigging method
- Modified:  Refactored the API schema documentation (schema.md) for improved clarity and organization.

## 1.6.0 (2025-05-21)

- Added: New model Turbo-v1.0-20250506 for text-to-model and image-to-model generation featuring significantly faster processing speed, optimized for time-sensitive applications.
- Modified: Refactored schema.md for improved clarity and organization.

## 1.5.0 (2025-01-23)

- Added: New version v2.5-20250123 featuring enhanced geometry details and realistic textures.
- Added: Two new styles: gold and ancient_bronze.
- Added: quad parameter for generation interfaces.
- Modified: Default version changed from v1.4-20240625 to v2.5-20250123.
- Deprecated: Version v1.3-20240522 and multiview generation of version 1.4-20240522 are now deprecated.

## 1.4.9 (2024-12-06)

- Added: orientation parameter for image_to_model and multiview_to_model.
- Added: Additional preset animations for retargeting.
- Added: Two new styles and style improvements.

## 1.4.8 (2024-11-20)

- Added: style parameter for text_to_model generation.
- Added: auto_size parameter for text_to_model, image_to_model, and multiview_to_model.
- Modified: Conversion format can now be performed based on a previously converted model.
- Modified: face_limit for conversion can now be applied without requiring quad.

## 1.4.7 (2024-11-12)

- Added: url support for image_to_model and multiview_to_model generation.

## 1.4.6 (2024-11-11)

- Added: style parameter for image_to_model generation.
- Added: v2.0-20240919 support for multiview_to_model generation.
- Added: New texture_model endpoint.
- Added: texture_alignment for image_to_model, multiview_to_model, and texture_model.
- Added: texture_quality for text_to_model, image_to_model, multiview_to_model, and texture_model.

## 1.4.5 (2024-10-12)

- Added: Support for 3mf conversion format.

## 1.4.4 (2024-09-19)

- Added: Completely new algorithm version (v2.0-20240919).
- Added: Ability to watch all tasks since the last check.
- Added: scale_factor parameter for convert.

## 1.4.2 (2024-09-02)

- Added: Multiview to Model method.
- Added: Check Balance endpoint.
- Added: New parameters for post-processing.

## 1.1.2 (2024-07-30)

- Added: Streaming methods for retrieving models.
- Modified: Replaced model with model_version for specifying model versions.
- Modified: Simplified error codes.

## 1.1.1 (2024-07-09)

- Added: New parameters for various endpoints.
- Added: Model version support for draft generation.

## 1.1.0 (2024-05-06)

- Added: New parameters for various endpoints.
- Modified: Split the animation API into three separate endpoints.
- Modified: Removed callbacks for stylizing and conversion; now using polling instead.

## 1.0.0 (2024-04-08)

- Added: The first API billing plan, including pricing and FAQ.

## 0.2.0-beta (2024-02-27)

- Added: New API version and endpoint changes.
- Added: Improved documentation.

## 0.1.1-beta (2024-01-09)

- Added: Initial release of the Image to 3D API.
- Modified: Enhancements to expression parsing and API schema.

## 0.1.0-beta (2024-01-03)

- Initial Release: The first version of our API.