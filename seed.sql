INSERT INTO ai_model (`id`, `is_available`, `name`) VALUES
('3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff', true, 'Stable Diffusion'),
('58359702-f2f7-49fc-a3fe-c10911fc4a29', false, 'Midjourney');

INSERT INTO category (`id`, `title`, `meta_chunks`, `negative_meta_chunks`, `sort_order`, `ai_id`) VALUES
('05307130-62a2-498d-8dd1-dc56a79dab36', 'Style', '{}', '{}', 1, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('7ff59fd0-320c-405d-afda-26684f4873f3', 'Medium', '{}', '{}', 2, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('e58b44fd-552e-43f5-a21a-a1e5d84c631f', 'Artist', '{}', '{}', 3, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('a6b73301-00f5-41f7-a3bd-f002e6f1b65d', 'Genre', '{}', '{}', 4, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('3d3ceae4-b161-4c10-9420-86be360cf063', 'Adjectives', '{}', '{}', 5, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('98822da8-4b17-4c6f-b690-5bc1f17edf33', 'Camera Angle', '{}', '{}', 6, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('d36c3714-00a1-4d56-97dc-e86afd9c4da9', 'Colour', '{}', '{}', 7, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('ecc42c7b-de10-4c9d-809c-a9a3878d59d2', 'Lighting', '{}', '{}', 8, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('3128fb52-66d6-4491-b1f3-ca34f43bcaba', 'Website', '{}', '{}', 9, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('f642d1cb-17fa-476c-8c83-d2da023b3e9d', 'Resolution', '{}', '{}', 10, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('cacd018c-ceee-4cdf-8c6e-bc42a202de29', 'Renderer', '{}', '{}', 11, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('1fbb2799-1139-44b5-afe4-2f8a3503bbc5', 'Level of Detail', '{}', '{}', 12, '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff');

INSERT INTO category_value (`id`, `chunk`, `category_id`, `image_url`, `meta_chunks`, `negative_meta_chunks`, `ai_id`) VALUES
('7e026e95-013c-4d61-b6ff-f5089c03122f', 'Anime', '05307130-62a2-498d-8dd1-dc56a79dab36', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('02044eca-df08-4de2-b003-8e86c0ef4099', 'Video Game', '05307130-62a2-498d-8dd1-dc56a79dab36', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('fb2510ea-2659-4ca1-8834-02e0a76d8dec', 'Portrait', '7ff59fd0-320c-405d-afda-26684f4873f3', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('da7995f0-7f93-465d-8d38-ddda6578bdb7', 'Oil Painting', '7ff59fd0-320c-405d-afda-26684f4873f3', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('9b930c58-3e0c-4c1a-88d9-4c740a997854', 'Rossdraws', 'e58b44fd-552e-43f5-a21a-a1e5d84c631f', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('c8af52fc-b32e-4e32-868b-fbb20c3e7416', 'Zabrocki', 'e58b44fd-552e-43f5-a21a-a1e5d84c631f', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('258053b0-7a72-4cf4-9c21-369311abc1a4', 'Fantasy', 'a6b73301-00f5-41f7-a3bd-f002e6f1b65d', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('4bb427fb-4d4c-42af-a44c-a10c10efe4a3', 'Sci fi', 'a6b73301-00f5-41f7-a3bd-f002e6f1b65d', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('804bc3fa-4e3e-498b-a6ea-79df61a4c730', 'Cinematic', '3d3ceae4-b161-4c10-9420-86be360cf063', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('a3b85600-b55f-4806-9867-27d04730a6cb', 'Symmetry', '3d3ceae4-b161-4c10-9420-86be360cf063', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('e559e732-b5d5-4135-8725-bf0358127905', 'Wide Angle', '98822da8-4b17-4c6f-b690-5bc1f17edf33', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('c64d0f80-0627-4b00-a8f5-fb9fc2f1d1db', 'Close Up', '98822da8-4b17-4c6f-b690-5bc1f17edf33', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('b9087f6a-ed1b-4e1c-b260-01adf2833a94', 'Monochrome', 'd36c3714-00a1-4d56-97dc-e86afd9c4da9', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('ce2cf05a-2ec3-4286-ac23-a4d8198b497a', 'iridescent Red', 'd36c3714-00a1-4d56-97dc-e86afd9c4da9', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('30f10d4e-e2c0-4df1-b920-ca7d86894bae', 'Volumetric', 'ecc42c7b-de10-4c9d-809c-a9a3878d59d2', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('9387e246-7fb0-4005-8691-ab53297a0bc2', 'Lens Flare', 'ecc42c7b-de10-4c9d-809c-a9a3878d59d2', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('a93a3df4-05ca-4617-a266-c9339dc2d133', 'Artstation', '3128fb52-66d6-4491-b1f3-ca34f43bcaba', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('d4811b3d-595e-40ec-9357-e22e19e922f4', 'Deviant Art', '3128fb52-66d6-4491-b1f3-ca34f43bcaba', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('283e3104-54e0-4621-9f14-cae08a853862', '8K', 'f642d1cb-17fa-476c-8c83-d2da023b3e9d', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('ddb604e6-b45e-4b38-8003-4584661188e6', 'UHD', 'f642d1cb-17fa-476c-8c83-d2da023b3e9d', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('5f13aee4-a4f5-47c4-88f6-737fbcbc3fc3', 'Octane', 'cacd018c-ceee-4cdf-8c6e-bc42a202de29', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('20c8280a-246c-4d14-8c62-78e9c50047d9', 'Unreal 5', 'cacd018c-ceee-4cdf-8c6e-bc42a202de29', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('e96b5f0f-d5cb-4519-a991-2c262df5f7e5', 'Photorealistic', '1fbb2799-1139-44b5-afe4-2f8a3503bbc5', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff'),
('f5f8c744-a0f1-48da-9e56-36b1c12d4a83', 'Hyperrealistic', '1fbb2799-1139-44b5-afe4-2f8a3503bbc5', 'https://picsum.photos/200', '{}', '{}', '3a5a0b0d-0cdc-4000-bbf4-d7eb91d0b6ff');



















