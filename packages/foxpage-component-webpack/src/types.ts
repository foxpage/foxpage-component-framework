export type BuildFoxpageMode = 'production' | 'debug' | 'node' | 'editor';
export type BuildStyleMode = 'style';
export type BuildUmdMode = 'umd_prod' | 'umd_dev';
export type BuildCjsMode = 'cjs_prod' | 'cjs_dev';
export type BuildMode = BuildFoxpageMode | BuildStyleMode | BuildUmdMode | BuildCjsMode;
