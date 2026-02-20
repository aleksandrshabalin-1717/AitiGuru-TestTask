import { Configuration } from 'webpack';
import { IWebpackBuildOptions } from './types/types';

const webpackResolve = (options: IWebpackBuildOptions): Configuration['resolve'] => {
    return {
        extensions: ['.tsx', '.ts', '.js', '.json'],

        alias: {
            '@': options.paths.src,
        }
    };
}

export default webpackResolve;