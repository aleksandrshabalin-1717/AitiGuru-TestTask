import { EntryObject } from 'webpack';

export type TWebpackBuildMode = 'development' | 'production';

export interface IWebpackBuildPaths {
    entry: EntryObject;
    html: string;
    output: string;
    src: string;
};

export interface IWebpackBuildOptions {
    port: number;
    paths: IWebpackBuildPaths;
    mode: TWebpackBuildMode;
};
